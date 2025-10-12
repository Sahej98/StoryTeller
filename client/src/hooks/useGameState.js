import { useState, useCallback, useEffect } from 'react';
import { storyData, items, storyDetails } from '../stories/the_asylum/index.js';

const SAVE_GAME_KEY = 'interactiveHorrorSave';

const initialGameState = {
  currentPosition: { chapter: 'chapter1', key: 'start' },
  checkpoint: { chapter: 'chapter1', key: 'start' },
  playerStats: {
    sanity: 100,
    health: 100,
    stamina: 100,
    morality: 50,
  },
  inventory: [],
  relationships: {
    lily: 0,
    finch: 0,
  },
  flags: new Set(),
  discoveredLore: new Set(),
  visitedNodes: new Set(),
  highestChapterUnlocked: 1,
};

export const useGameState = () => {
  const [gameState, setGameState] = useState(initialGameState);
  const [hasSaveData, setHasSaveData] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(SAVE_GAME_KEY);
    setHasSaveData(!!savedData);
  }, []);

  const applyEffects = useCallback((effects) => {
    if (!effects) return;

    setGameState((prev) => {
      const newState = { ...prev };

      if (effects.setCheckpoint) {
        newState.checkpoint = prev.currentPosition;
      }

      // Stats
      if (effects.stats) {
        newState.playerStats = { ...prev.playerStats };
        for (const stat in effects.stats) {
          newState.playerStats[stat] =
            (newState.playerStats[stat] || 0) + effects.stats[stat];
          // Clamp stats
          if (stat === 'health' || stat === 'stamina' || stat === 'sanity') {
            if (newState.playerStats[stat] > 100)
              newState.playerStats[stat] = 100;
            if (newState.playerStats[stat] < 0) newState.playerStats[stat] = 0;
          }
        }
      }

      // Inventory
      if (effects.inventory) {
        let newInventory = [...prev.inventory];
        const newDiscoveredLore = new Set(prev.discoveredLore);
        if (effects.inventory.add) {
          const itemsToAdd = Array.isArray(effects.inventory.add)
            ? effects.inventory.add
            : [effects.inventory.add];
          itemsToAdd.forEach((item) => {
            if (!newInventory.includes(item)) {
              newInventory.push(item);
            }
            if (items[item]?.lore) {
              newDiscoveredLore.add(item);
            }
          });
        }
        if (effects.inventory.remove) {
          const itemsToRemove = Array.isArray(effects.inventory.remove)
            ? effects.inventory.remove
            : [effects.inventory.remove];
          newInventory = newInventory.filter(
            (item) => !itemsToRemove.includes(item)
          );
        }
        newState.inventory = newInventory;
        newState.discoveredLore = newDiscoveredLore;
      }

      // Relationships
      if (effects.relationships) {
        newState.relationships = { ...prev.relationships };
        for (const char in effects.relationships) {
          newState.relationships[char] =
            (newState.relationships[char] || 0) + effects.relationships[char];
        }
      }

      // Flags
      if (effects.flags) {
        const newFlags = new Set(prev.flags);
        if (effects.flags.set) {
          const flagsToSet = Array.isArray(effects.flags.set)
            ? effects.flags.set
            : [effects.flags.set];
          flagsToSet.forEach((flag) => newFlags.add(flag));
        }
        newState.flags = newFlags;
      }

      return newState;
    });
  }, []);

  const handleChoice = useCallback(
    (choice) => {
      let isDeath = false;

      const nextChapterKey =
        choice.next?.chapter || gameState.currentPosition.chapter;
      const nextNodeKey =
        typeof choice.next === 'object' ? choice.next.key : choice.next;
      const nextNode = storyData[nextChapterKey]?.[nextNodeKey];

      if (nextNode?.isDeath) {
        return 'DEATH';
      }

      if (choice.effects) {
        applyEffects(choice.effects);
      }
      if (nextNode?.effects) {
        applyEffects(nextNode.effects);
      }

      setGameState((prev) => {
        const newVisited = new Set(prev.visitedNodes);
        const nodeIdentifier = `${prev.currentPosition.chapter}/${prev.currentPosition.key}`;
        newVisited.add(nodeIdentifier);

        let updatedState = { ...prev, visitedNodes: newVisited };

        if (nextChapterKey !== prev.currentPosition.chapter) {
          const nextChapterNum = storyDetails.chapters[nextChapterKey]?.number;
          if (nextChapterNum) {
            const newHighest = Math.max(
              prev.highestChapterUnlocked,
              nextChapterNum
            );
            updatedState = {
              ...updatedState,
              highestChapterUnlocked: newHighest,
            };

            try {
              const serializableState = {
                ...updatedState,
                flags: Array.from(updatedState.flags),
                discoveredLore: Array.from(updatedState.discoveredLore),
                visitedNodes: Array.from(newVisited),
              };
              localStorage.setItem(
                SAVE_GAME_KEY,
                JSON.stringify(serializableState)
              );
              setHasSaveData(true);
            } catch (e) {
              console.error('Auto-save failed on chapter unlock', e);
            }
          }
        }

        updatedState.currentPosition = {
          chapter: nextChapterKey,
          key: nextNodeKey,
        };
        return updatedState;
      });

      return { chapter: nextChapterKey, key: nextNodeKey };
    },
    [applyEffects, gameState]
  );

  const restartGame = useCallback(() => {
    const currentUnlocked = gameState.highestChapterUnlocked;
    const freshState = {
      ...initialGameState,
      highestChapterUnlocked: currentUnlocked,
    };
    setGameState(freshState);
  }, [gameState.highestChapterUnlocked]);

  const startGameAt = useCallback(
    (chapterKey) => {
      const freshState = {
        ...initialGameState,
        currentPosition: { chapter: chapterKey, key: 'start' },
        highestChapterUnlocked: gameState.highestChapterUnlocked,
      };
      setGameState(freshState);
    },
    [gameState.highestChapterUnlocked]
  );

  const saveGame = useCallback(() => {
    try {
      const serializableState = {
        ...gameState,
        flags: Array.from(gameState.flags),
        discoveredLore: Array.from(gameState.discoveredLore),
        visitedNodes: Array.from(gameState.visitedNodes),
      };
      localStorage.setItem(SAVE_GAME_KEY, JSON.stringify(serializableState));
      setHasSaveData(true);
      alert('Progress Saved!');
    } catch (error) {
      console.error('Failed to save game:', error);
      alert('Error: Could not save game.');
    }
  }, [gameState]);

  const loadGame = useCallback(() => {
    try {
      const savedData = localStorage.getItem(SAVE_GAME_KEY);
      if (savedData) {
        const loadedState = JSON.parse(savedData);
        const mergedState = {
          ...initialGameState,
          ...loadedState,
          flags: new Set(loadedState.flags),
          discoveredLore: new Set(loadedState.discoveredLore || []),
          visitedNodes: new Set(loadedState.visitedNodes || []),
          highestChapterUnlocked: loadedState.highestChapterUnlocked || 1,
        };
        setGameState(mergedState);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to load game:', error);
      alert('Error: Could not load save file.');
      return false;
    }
  }, []);

  const loadCheckpoint = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentPosition: prev.checkpoint,
      playerStats: {
        ...prev.playerStats,
        health: 100,
        stamina: 100,
      },
    }));
  }, []);

  return {
    gameState,
    handleChoice,
    restartGame,
    startGameAt,
    saveGame,
    loadGame,
    hasSaveData,
    loadCheckpoint,
  };
};
