import { useState, useCallback, useEffect } from 'react';

const TOKEN_KEY = 'storyteller_token';

const callGameAPI = async (action, payload) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch('/api/game/action', {
    method: 'POST',
    headers,
    body: JSON.stringify({ action, payload }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Game API error');
  }
  return response.json();
};


export const useGameState = (storyId, onChapterEnd, currentUser) => {
  const [gameContext, setGameContext] = useState(null);
  const [lastChanges, setLastChanges] = useState(null);

  useEffect(() => {
    setGameContext(null);
    setLastChanges(null);
  }, [storyId]);

  const handleChoice = useCallback(async (choice) => {
    if (!storyId || !gameContext?.gameState) return;

    try {
      const result = await callGameAPI('choice', {
        storyId,
        currentState: gameContext.gameState,
        choiceText: choice.text
      });

      if (result.status === 'DEATH') {
        return result;
      }
      if (result.gameContext) {
        if (result.gameContext.view?.currentNode === null) {
          onChapterEnd();
        } else {
          setGameContext(result.gameContext);
          if (result.changes) {
            setLastChanges({ ...result.changes, id: Date.now() }); // Add ID to ensure effect trigger
          }
        }
      }
    } catch (error) {
      console.error('handleChoice error:', error);
    }
  }, [gameContext, storyId, onChapterEnd]);

  const startGameAt = useCallback(async (chapterKey, nodeKey = 'start') => {
    if (!storyId) return;
    setLastChanges(null);
    try {
      const result = await callGameAPI('start', { storyId, chapterKey, nodeKey, currentState: gameContext?.gameState });
      if (result.gameContext) {
        setGameContext(result.gameContext);
      }
    } catch (error) {
      console.error('startGameAt error:', error);
    }
  }, [storyId, gameContext]);

  const restartGame = useCallback(async () => {
    if (!storyId || !gameContext?.gameState) return;
    setLastChanges(null);
    try {
      const result = await callGameAPI('restart', { storyId, chapterKey: gameContext.gameState.currentPosition.chapter, currentState: gameContext.gameState });
      if (result.gameContext) {
        setGameContext(result.gameContext);
      }
    } catch (error) {
      console.error('restartGame error:', error);
    }
  }, [storyId, gameContext]);

  const loadCheckpoint = useCallback(async () => {
    if (!storyId || !gameContext?.gameState) return;
    setLastChanges(null);
    try {
      const result = await callGameAPI('loadCheckpoint', { storyId, currentState: gameContext.gameState });
      if (result.gameContext) {
        setGameContext(result.gameContext);
      }
    } catch (error) {
      console.error('loadCheckpoint error:', error);
    }
  }, [gameContext, storyId]);

  const saveGame = useCallback(
    async (isSilent = false) => {
      if (currentUser?.isGuest || !storyId || !gameContext?.gameState) return;
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return;

      try {
        const response = await fetch(`/api/users/save/${storyId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(gameContext.gameState),
        });
        if (!response.ok) throw new Error('Failed to save game');

        if (!isSilent) alert('Progress Saved!');
      } catch (error) {
        console.error('Save game error:', error);
        if (!isSilent) alert('Error: Could not save game.');
      }
    },
    [gameContext, storyId, currentUser],
  );

  const loadGame = useCallback(async () => {
    if (currentUser?.isGuest || !storyId) return false;
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;
    setLastChanges(null);

    try {
      const res = await fetch(`/api/users/load/${storyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const loadedState = await res.json();
        // After loading the raw state, we need to ask the server for the full view model
        const result = await callGameAPI('load', { storyId, loadedState });
        if (result.gameContext) {
          setGameContext(result.gameContext);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Load game error:', error);
      return false;
    }
  }, [storyId, currentUser]);


  return { gameContext, handleChoice, restartGame, startGameAt, saveGame, loadGame, loadCheckpoint, lastChanges };
};
