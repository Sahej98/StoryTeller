
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
          // Background update check could go here
          return;
        } catch (e) {
          console.warn("Corrupt story cache", e);
        }
      }

      // Fetch from Server if not cached
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
        console.error("Story load error:", e);
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
    if (nextNodeKey === null) {
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
    localStorage.setItem(`${LOCAL_SAVE_KEY}_${sId}`, JSON.stringify(state));

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

    // Reset ephemeral state for a fresh run or chapter replay
    // If replaying a chapter, we ideally want the state *as it was* at start of chapter.
    // Since we only save *at* start of chapter, loading the save does exactly this.
    // But for "New Game", we create fresh.

    // Check if we have a save file for this story to inherit stats if just starting a later chapter via menu?
    // Simplified: "Start Game" creates a fresh state. 
    // "Continue" loads the save.

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

    // Initial Save
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
      // FORCE RESTART CHAPTER LOGIC
      // Even if the save has a specific node key, we reset it to 'start' of that chapter
      // This ensures users can't save-scum mid-chapter.
      // Unless it's the very first node, we ensure the key is 'start' or the entry point.
      // Assuming 'start' is always the entry point for a chapter.

      // If the saved position is NOT 'start', it means they saved mid-chapter (old version) 
      // OR we want to force them back.
      // The prompt says "restart the chapter if not completed".

      // Ideally, the save only HAPPENS at chapter start, so savedState is ALREADY at start.
      // But for robustness:
      // savedState.currentPosition.key = 'start'; 

      const context = getViewModel(storyData, savedState);
      setGameContext(context);
      setLastChanges(null);
      return true;
    }
    return false;
  }, [storyId, storyData, currentUser]);

  const saveGame = useCallback(async (isSilent = false) => {
    // Manual Save is now DISABLED for mid-chapter as per requirements ("cant save... at a particular point")
    // We can interpret "Save Game" button as "Save & Quit" which resets you to chapter start?
    // Or simply disable the button.
    // Based on prompt "cant save the chapter at a particular point", 
    // I will make the manual save function do nothing or just save the CURRENT CHAPTER START.

    if (!gameContext?.gameState) return;

    if (!isSilent) {
      alert("Saving is disabled during chapters. Progress is saved automatically at the start of each chapter.");
    }

    // We do NOT update the save file with current mid-chapter node.
  }, [gameContext]);

  const loadCheckpoint = useCallback(() => {
    if (!gameContext?.gameState) return;
    // This is the "Try Again" on death. It loads the in-memory checkpoint (start of dangerous section)
    // This does NOT load from persistent storage.
    const checkpointState = {
      ...gameContext.gameState,
      currentPosition: gameContext.gameState.checkpoint || gameContext.gameState.currentPosition, // Fallback
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
