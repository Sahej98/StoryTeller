import { useState, useCallback, useEffect } from 'react';

const SAVE_GAME_KEY = 'interactiveHorrorSave';

const genericInitialState = {
  playerStats: { sanity: 100, health: 100, stamina: 100, morality: 50 },
  inventory: [],
  flags: new Set(),
  discoveredLore: new Set(),
  visitedNodes: new Set(),
  characters: new Set(),
  highestChapterUnlocked: 1,
};

export const useGameState = (storyId, story, onChapterEnd) => {
  const [hasSaveData, setHasSaveData] = useState(false);

  const getInitialState = useCallback(() => {
    if (!story) return null;
    const firstChapterKey = Object.keys(story.storyDetails.chapters)[0];
    const initialRelationships = story.characters
      ? Object.keys(story.characters).reduce((acc, charKey) => {
          acc[charKey] = 0;
          return acc;
        }, {})
      : {};
    return {
      ...genericInitialState,
      currentPosition: { chapter: firstChapterKey, key: 'start' },
      checkpoint: { chapter: firstChapterKey, key: 'start' },
      relationships: initialRelationships,
    };
  }, [story]);

  const [gameState, setGameState] = useState(getInitialState());

  useEffect(() => {
    const savedData = localStorage.getItem(SAVE_GAME_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (storyId && parsed.storyId === storyId) {
          setHasSaveData(true);
        } else if (!storyId) {
          setHasSaveData(true);
        }
      } catch (e) {
        setHasSaveData(false);
      }
    } else {
      setHasSaveData(false);
    }
  }, [storyId]);

  useEffect(() => {
    if (story) {
      setGameState(getInitialState());
    }
  }, [storyId, story, getInitialState]);

  const applyEffects = useCallback(
    (effects) => {
      if (!effects || !story) return;
      setGameState((prev) => {
        const newState = { ...prev };
        if (effects.setCheckpoint) newState.checkpoint = prev.currentPosition;
        if (effects.stats) {
          newState.playerStats = { ...prev.playerStats };
          for (const stat in effects.stats) {
            newState.playerStats[stat] =
              (newState.playerStats[stat] || 0) + effects.stats[stat];
            if (['health', 'stamina', 'sanity'].includes(stat))
              newState.playerStats[stat] = Math.max(
                0,
                Math.min(100, newState.playerStats[stat])
              );
          }
        }
        if (effects.inventory) {
          let newInventory = [...prev.inventory];
          const newDiscoveredLore = new Set(prev.discoveredLore);
          if (effects.inventory.add) {
            const itemsToAdd = Array.isArray(effects.inventory.add)
              ? effects.inventory.add
              : [effects.inventory.add];
            itemsToAdd.forEach((item) => {
              if (!newInventory.includes(item)) newInventory.push(item);
              if (story.items[item]?.lore) newDiscoveredLore.add(item);
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
        if (effects.relationships) {
          newState.relationships = { ...prev.relationships };
          for (const char in effects.relationships)
            newState.relationships[char] =
              (newState.relationships[char] || 0) + effects.relationships[char];
        }
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
    },
    [story]
  );

  const handleChoice = useCallback(
    (choice) => {
      if (!story || !gameState) return;

      const currentNode =
        story.storyData[gameState.currentPosition.chapter][
          gameState.currentPosition.key
        ];
      const nextChapterKey =
        choice.next?.chapter || gameState.currentPosition.chapter;
      const nextNodeKey =
        typeof choice.next === 'object' ? choice.next.key : choice.next;
      const nextNode = story.storyData[nextChapterKey]?.[nextNodeKey];
      const isChapterEnd = nextChapterKey !== gameState.currentPosition.chapter;

      if (nextNode?.isDeath) return 'DEATH';
      if (choice.effects) applyEffects(choice.effects);
      if (nextNode?.effects) applyEffects(nextNode.effects);

      setGameState((prev) => {
        const newVisited = new Set(prev.visitedNodes);
        newVisited.add(
          `${prev.currentPosition.chapter}/${prev.currentPosition.key}`
        );

        const newDiscoveredCharacters = new Set(prev.characters);
        const charactersInNode = [
          currentNode.speaker,
          ...(Array.isArray(currentNode.npc)
            ? currentNode.npc
            : currentNode.npc
            ? [currentNode.npc]
            : []),
        ];
        charactersInNode.forEach((charKey) => {
          if (charKey && charKey !== 'Narrator' && charKey !== 'You') {
            newDiscoveredCharacters.add(charKey.toLowerCase());
          }
        });

        let updatedState = {
          ...prev,
          visitedNodes: newVisited,
          characters: newDiscoveredCharacters,
          currentPosition: { chapter: nextChapterKey, key: nextNodeKey },
        };

        if (isChapterEnd) {
          const nextChapterNum =
            story.storyDetails.chapters[nextChapterKey]?.number;
          if (nextChapterNum) {
            updatedState.highestChapterUnlocked = Math.max(
              prev.highestChapterUnlocked,
              nextChapterNum
            );
            try {
              const serializableState = {
                ...updatedState,
                storyId,
                flags: Array.from(updatedState.flags),
                discoveredLore: Array.from(updatedState.discoveredLore),
                visitedNodes: Array.from(newVisited),
                characters: Array.from(newDiscoveredCharacters),
              };
              localStorage.setItem(
                SAVE_GAME_KEY,
                JSON.stringify(serializableState)
              );
              setHasSaveData(true);
            } catch (e) {
              console.error('Auto-save failed on chapter unlock', e);
            }
            if (onChapterEnd) onChapterEnd();
          }
        }
        return updatedState;
      });

      return { chapter: nextChapterKey, key: nextNodeKey };
    },
    [applyEffects, gameState, story, storyId, onChapterEnd]
  );

  const restartGame = useCallback(() => {
    if (!gameState) return;
    const currentUnlocked = gameState.highestChapterUnlocked;
    const freshState = {
      ...getInitialState(),
      highestChapterUnlocked: currentUnlocked,
    };
    setGameState(freshState);
  }, [gameState, getInitialState]);

  const startGameAt = useCallback(
    (chapterKey) => {
      const freshState = {
        ...getInitialState(),
        currentPosition: { chapter: chapterKey, key: 'start' },
        checkpoint: { chapter: chapterKey, key: 'start' },
        highestChapterUnlocked: gameState.highestChapterUnlocked,
      };
      setGameState(freshState);
    },
    [gameState, getInitialState]
  );

  const saveGame = useCallback(
    (isSilent = false) => {
      if (!storyId || !gameState) return;
      try {
        const serializableState = {
          storyId,
          ...gameState,
          flags: Array.from(gameState.flags),
          discoveredLore: Array.from(gameState.discoveredLore),
          visitedNodes: Array.from(gameState.visitedNodes),
          characters: Array.from(gameState.characters),
        };
        localStorage.setItem(SAVE_GAME_KEY, JSON.stringify(serializableState));
        setHasSaveData(true);
        if (!isSilent) alert('Progress Saved!');
      } catch (error) {
        console.error('Failed to save game:', error);
        if (!isSilent) alert('Error: Could not save game.');
      }
    },
    [gameState, storyId]
  );

  const loadGame = useCallback(
    (isSilent = false) => {
      if (!storyId) return false;
      try {
        const savedData = localStorage.getItem(SAVE_GAME_KEY);
        if (savedData) {
          const loadedState = JSON.parse(savedData);
          if (loadedState.storyId !== storyId) {
            if (!isSilent) alert('Save file belongs to another story.');
            return false;
          }
          const mergedState = {
            ...getInitialState(),
            ...loadedState,
            flags: new Set(loadedState.flags),
            discoveredLore: new Set(loadedState.discoveredLore || []),
            visitedNodes: new Set(loadedState.visitedNodes || []),
            characters: new Set(loadedState.characters || []),
          };
          setGameState(mergedState);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Failed to load game:', error);
        if (!isSilent) alert('Error: Could not load save file.');
        return false;
      }
    },
    [storyId, getInitialState]
  );

  const loadCheckpoint = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentPosition: prev.checkpoint,
      playerStats: { ...prev.playerStats, health: 100, stamina: 100 },
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
