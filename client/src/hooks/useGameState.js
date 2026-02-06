
import { useState, useCallback, useEffect } from 'react';
import { applyEffects, getViewModel } from '../engine/gameEngine';

const TOKEN_KEY = 'storyteller_token';
const API_URL = import.meta.env.VITE_API_URL || '';
const LOCAL_SAVE_KEY = 'storyteller_save';
const STORY_CACHE_KEY = 'storyteller_data_cache';

export const useGameState = (storyId, onChapterEnd, currentUser) => {
  const [gameContext, setGameContext] = useState(null);
  const [lastChanges, setLastChanges] = useState(null);
  const [storyData, setStoryData] = useState(null);
  const [isLoadingStory, setIsLoadingStory] = useState(false);

  // 1. Fetch Story Data (Full JSON) and Cache it
  useEffect(() => {
    if (!storyId) {
      setStoryData(null);
      return;
    }

    const loadStoryData = async () => {
      setIsLoadingStory(true);
      // Try Local Storage First
      const cached = localStorage.getItem(`${STORY_CACHE_KEY}_${storyId}`);
      if (cached) {
        try {
          setStoryData(JSON.parse(cached));
          setIsLoadingStory(false);
          // Background update check can happen here if needed
        } catch (e) {
          console.warn("Corrupt story cache", e);
        }
      }

      // Always fetch latest to ensure updates, unless offline
      try {
        const res = await fetch(`${API_URL}/api/stories/${storyId}`);
        if (!res.ok) throw new Error("Failed to fetch story");
        const data = await res.json();

        // Save to LocalStorage for offline use
        try {
          localStorage.setItem(`${STORY_CACHE_KEY}_${storyId}`, JSON.stringify(data));
        } catch (e) {
          console.warn("Storage quota exceeded, story not cached offline.");
        }

        setStoryData(data);
      } catch (e) {
        console.error("Story load error (using cache if avail):", e);
      } finally {
        setIsLoadingStory(false);
      }
    };

    loadStoryData();
  }, [storyId]);

  // 2. Core Game Logic (Client Side)
  const handleChoice = useCallback((choice) => {
    if (!storyData || !gameContext?.gameState) return;

    const currentState = gameContext.gameState;

    // Apply choice effects
    const { newState: stateAfterChoice, changes: choiceChanges } = applyEffects(currentState, storyData, choice.effects);

    // Determine Next Node
    const nextChapterKey = choice.next?.chapter || stateAfterChoice.currentPosition.chapter;
    const nextNodeKey = (typeof choice.next === 'object' && choice.next !== null) ? choice.next.key : choice.next;

    // Handle End of Chapter/Story
    // FIX: Check for both null and empty string to trigger To Be Continued
    if (nextNodeKey === null || nextNodeKey === '') {
      onChapterEnd();
      return; // Transition handled by UI
    }
    if (nextNodeKey === 'END_STORY') {
      return; // Transition handled by UI
    }

    // Get Next Node Data
    const nextNode = storyData.storyData[nextChapterKey]?.[nextNodeKey];
    if (!nextNode) {
      console.error(`Node missing: ${nextChapterKey}.${nextNodeKey}`);
      return;
    }

    // Handle Death
    if (nextNode.isDeath) {
      return { status: 'DEATH', text: nextNode.text, nextOnDeath: nextNode.nextOnDeath || null };
    }

    // Apply Node Entry Effects
    const { newState: stateAfterNode, changes: nodeChanges } = applyEffects(stateAfterChoice, storyData, nextNode.effects);

    // Merge Changes for UI
    const finalChanges = {
      stats: [...choiceChanges.stats, ...nodeChanges.stats],
      inventory: {
        add: [...choiceChanges.inventory.add, ...nodeChanges.inventory.add],
        remove: [...choiceChanges.inventory.remove, ...nodeChanges.inventory.remove],
        loreAdded: [...choiceChanges.inventory.loreAdded, ...nodeChanges.inventory.loreAdded]
      },
      flags: [...choiceChanges.flags, ...nodeChanges.flags],
      relationships: [...choiceChanges.relationships, ...nodeChanges.relationships],
      charactersDiscovered: [...choiceChanges.charactersDiscovered, ...nodeChanges.charactersDiscovered]
    };

    // Update Visited & Position
    const newPosString = `${nextChapterKey}/${nextNodeKey}`;
    if (!stateAfterNode.visitedNodes.includes(newPosString)) {
      stateAfterNode.visitedNodes.push(newPosString);
    }
    stateAfterNode.currentPosition = { chapter: nextChapterKey, key: nextNodeKey };

    // Update Highest Chapter & SAVE ONLY ON CHAPTER CHANGE
    if (nextChapterKey !== currentState.currentPosition.chapter) {
      const nextChapterDetails = storyData.storyDetails.chapters[nextChapterKey];
      if (nextChapterDetails?.number) {
        stateAfterNode.highestChapterUnlocked = Math.max(stateAfterNode.highestChapterUnlocked, nextChapterDetails.number);
      }
      // CRITICAL: We only persistent-save when moving to a new chapter to enforce "Restart Chapter" rule
      savePersistent(storyId, stateAfterNode);
    }

    // Update View
    const newContext = getViewModel(storyData, stateAfterNode);
    setGameContext(newContext);
    setLastChanges({ ...finalChanges, id: Date.now() });

  }, [storyData, gameContext, storyId, onChapterEnd]);

  // 3. Save/Load Helpers
  const savePersistent = (sId, state) => {
    // Saves to local storage. This is the "Safety Save" at start of chapter.
    try {
      localStorage.setItem(`${LOCAL_SAVE_KEY}_${sId}`, JSON.stringify(state));
    } catch (e) {
      console.error("Save to local storage failed", e);
    }

    // Also sync to cloud if logged in
    if (currentUser && !currentUser.isGuest) {
      const token = localStorage.getItem(TOKEN_KEY);
      fetch(`${API_URL}/api/users/save/${sId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(state)
      }).catch(e => console.warn("Cloud save failed", e));
    }
  };

  const loadPersistent = (sId) => {
    const local = localStorage.getItem(`${LOCAL_SAVE_KEY}_${sId}`);
    return local ? JSON.parse(local) : null;
  };

  // 4. Controls
  const startGameAt = useCallback((chapterKey, nodeKey = 'start') => {
    if (!storyData) return;

    // Fresh start for a chapter
    const initialRelationships = {};
    if (storyData.characters) {
      Object.keys(storyData.characters).forEach(k => initialRelationships[k] = 0);
    }

    const initialState = {
      playerStats: { sanity: 100, health: 100, stamina: 100, morality: 50 },
      inventory: [],
      flags: [],
      discoveredLore: [],
      visitedNodes: [`${chapterKey}/${nodeKey}`],
      characters: [],
      highestChapterUnlocked: 1,
      currentPosition: { chapter: chapterKey, key: nodeKey },
      checkpoint: { chapter: chapterKey, key: nodeKey }, // In-memory checkpoint
      relationships: initialRelationships,
    };

    const context = getViewModel(storyData, initialState);
    setGameContext(context);
    setLastChanges(null);

    // Initial Save for this run
    savePersistent(storyId, initialState);

  }, [storyId, storyData]);

  const loadGame = useCallback(async () => {
    if (!storyData) return false;

    // Try Local First
    let savedState = loadPersistent(storyId);

    // Try Cloud if no local
    if (!savedState && currentUser && !currentUser.isGuest) {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const res = await fetch(`${API_URL}/api/users/load/${storyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          savedState = await res.json();
          // Sync to local
          localStorage.setItem(`${LOCAL_SAVE_KEY}_${storyId}`, JSON.stringify(savedState));
        }
      } catch (e) { console.error(e); }
    }

    if (savedState) {
      // Logic: If loading, we assume the saved state IS the chapter start because we don't save mid-chapter.
      const context = getViewModel(storyData, savedState);
      setGameContext(context);
      setLastChanges(null);
      return true;
    }
    return false;
  }, [storyId, storyData, currentUser]);

  const saveGame = useCallback(async (isSilent = false) => {
    // Manual Save is disabled for mid-chapter state to enforce "Restart Chapter" difficulty
    if (!isSilent) {
      alert("Progress is only saved at the start of each chapter. Complete the chapter to secure your progress.");
    }
  }, []);

  const loadCheckpoint = useCallback(() => {
    if (!gameContext?.gameState) return;
    // This loads the in-memory checkpoint (e.g., right before a boss fight or death node)
    const checkpointState = {
      ...gameContext.gameState,
      currentPosition: gameContext.gameState.checkpoint || gameContext.gameState.currentPosition,
      playerStats: { ...gameContext.gameState.playerStats, health: 100, stamina: 100 } // Mercy heal
    };
    const context = getViewModel(storyData, checkpointState);
    setGameContext(context);
  }, [gameContext, storyData]);

  const restartGame = useCallback(() => {
    if (gameContext?.gameState) {
      startGameAt(gameContext.gameState.currentPosition.chapter);
    }
  }, [gameContext, startGameAt]);

  return {
    gameContext,
    handleChoice,
    restartGame,
    startGameAt,
    saveGame,
    loadGame,
    loadCheckpoint,
    lastChanges,
    isLoadingStory
  };
};
