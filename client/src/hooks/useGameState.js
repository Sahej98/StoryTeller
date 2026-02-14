
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
        } catch (e) {
          console.warn("Corrupt story cache", e);
        }
      }

      // Always fetch latest to ensure updates, unless offline
      try {
        const res = await fetch(`${API_URL}/api/stories/${storyId}`);
        if (!res.ok) throw new Error("Failed to fetch story");
        const data = await res.json();

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
    if (nextNodeKey === null || nextNodeKey === '') {
      onChapterEnd();
      return;
    }
    if (nextNodeKey === 'END_STORY') {
      return;
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

    // Determine Revisit Status BEFORE updating state
    const isRevisit = stateAfterNode.visitedNodes.includes(newPosString);

    if (!isRevisit) {
      stateAfterNode.visitedNodes.push(newPosString);
    }
    stateAfterNode.currentPosition = { chapter: nextChapterKey, key: nextNodeKey };

    // Update Highest Chapter & SAVE ONLY ON CHAPTER CHANGE
    if (nextChapterKey !== currentState.currentPosition.chapter) {
      const nextChapterDetails = storyData.storyDetails.chapters[nextChapterKey];
      if (nextChapterDetails?.number) {
        stateAfterNode.highestChapterUnlocked = Math.max(stateAfterNode.highestChapterUnlocked, nextChapterDetails.number);
      }
      savePersistent(storyId, stateAfterNode);
    }

    // Update View with explicit revisit flag
    const newContext = getViewModel(storyData, stateAfterNode, isRevisit);
    setGameContext(newContext);
    setLastChanges({ ...finalChanges, id: Date.now() });

  }, [storyData, gameContext, storyId, onChapterEnd]);

  // 3. Save/Load Helpers
  const savePersistent = (sId, state) => {
    try {
      localStorage.setItem(`${LOCAL_SAVE_KEY}_${sId}`, JSON.stringify(state));
    } catch (e) {
      console.error("Save to local storage failed", e);
    }

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
      checkpoint: { chapter: chapterKey, key: nodeKey },
      relationships: initialRelationships,
    };

    // First time start is never a revisit
    const context = getViewModel(storyData, initialState, false);
    setGameContext(context);
    setLastChanges(null);

    savePersistent(storyId, initialState);

  }, [storyId, storyData]);

  const loadGame = useCallback(async () => {
    if (!storyData) return false;

    let savedState = loadPersistent(storyId);

    if (!savedState && currentUser && !currentUser.isGuest) {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const res = await fetch(`${API_URL}/api/users/load/${storyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          savedState = await res.json();
          localStorage.setItem(`${LOCAL_SAVE_KEY}_${storyId}`, JSON.stringify(savedState));
        }
      } catch (e) { console.error(e); }
    }

    if (savedState) {
      // When loading, default to false for revisit to show full text context for the player returning to the game
      const context = getViewModel(storyData, savedState, false);
      setGameContext(context);
      setLastChanges(null);
      return true;
    }
    return false;
  }, [storyId, storyData, currentUser]);

  const saveGame = useCallback(async (isSilent = false) => {
    if (!isSilent) {
      alert("Progress is only saved at the start of each chapter. Complete the chapter to secure your progress.");
    }
  }, []);

  const loadCheckpoint = useCallback(() => {
    if (!gameContext?.gameState) return;
    const checkpointState = {
      ...gameContext.gameState,
      currentPosition: gameContext.gameState.checkpoint || gameContext.gameState.currentPosition,
      playerStats: { ...gameContext.gameState.playerStats, health: 100, stamina: 100 }
    };
    // Checkpoint reload - assume false for revisit to show text again
    const context = getViewModel(storyData, checkpointState, false);
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
