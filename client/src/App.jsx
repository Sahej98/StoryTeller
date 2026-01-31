import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useGameState } from './hooks/useGameState.js';
import { useSoundManager } from './hooks/useSoundManager.js';
import { AnimatePresence } from 'framer-motion';

import { Vignette } from './components/Vignette.jsx';
import { StartScreen } from './components/StartScreen.jsx';
import { GameUI } from './components/GameUI.jsx';
import { SettingsModal } from './components/SettingsModal.jsx';
import { InventoryModal } from './components/InventoryModal.jsx';
import { JournalModal } from './components/JournalModal.jsx';
import { ToBeContinuedScreen } from './components/ToBeContinuedScreen.jsx';
import { ChapterSelectScreen } from './components/ChapterSelectScreen.jsx';
import { CautionScreen } from './components/CautionScreen.jsx';
import { DeathScreen } from './components/DeathScreen.jsx';
import { BackgroundImageFader } from './components/BackgroundImageFader.jsx';
import { StorySelectScreen } from './components/StorySelectScreen.jsx';
import { AuthScreen } from './components/AuthScreen.jsx';
import { StoryEditor } from './components/StoryEditor.jsx';
import { Jumpscare } from './components/Jumpscare.jsx';
import { StatChangeIndicator } from './components/StatChangeIndicator.jsx';
import { NotificationIndicator } from './components/NotificationIndicator.jsx';
import { UserManagementScreen } from './components/UserManagementScreen.jsx';
import { AlertModal } from './components/AlertModal.jsx';
import { LoadingScreen } from './components/LoadingScreen.jsx';
import { StoryEndScreen } from './components/StoryEndScreen.jsx';
import { LoreModal } from './components/LoreModal.jsx';
import { FilmGrainOverlay } from './components/FilmGrainOverlay.jsx';
import { ScanLinesOverlay } from './components/ScanLinesOverlay.jsx';
import { VoicePackGate } from './components/VoicePackGate.jsx';
import { ArrowLeft } from 'lucide-react';

const TOKEN_KEY = 'storyteller_token';
const API_URL = import.meta.env.VITE_API_URL || '';

const defaultSettings = {
  master: 1,
  bgm: 0.3,
  sfx: 0.6,
  narration: 0.8,
  narrationEnabled: true,
  textSpeed: 0.5,
  screenShakeEnabled: true,
  filmGrainEnabled: true,
  scanLinesEnabled: false,
  keybindings: {
    continue: ' ', // Spacebar
    choice1: '1',
    choice2: '2',
    choice3: '3',
    choice4: '4',
    openInventory: 'i',
    openJournal: 'j',
    toggleSettings: 'Escape',
    saveGame: 'F5',
  },
};

const AutosaveIndicator = () => (
  <div className='autosave-indicator'>Autosaving...</div>
);

function hexToRgb(hex) {
  if (!hex) return [255, 255, 255]; // fallback to white
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
  }
  // Fallback for invalid hex
  return [255, 255, 255];
}

export const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem(TOKEN_KEY),
  );
  const [appState, setAppState] = useState('loading'); // loading, voicepack_prompt, auth_check, auth, startScreen...
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [journalVisible, setJournalVisible] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [activeBackground, setActiveBackground] = useState(null);
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [showAutosave, setShowAutosave] = useState(false);
  const [allStories, setAllStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const [editingStory, setEditingStory] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isBindingKey, setIsBindingKey] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [jumpscare, setJumpscare] = useState(null);
  const [statChanges, setStatChanges] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [screenShake, setScreenShake] = useState(false);
  const [updatedStats, setUpdatedStats] = useState([]);
  const [gameData, setGameData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [deathInfo, setDeathInfo] = useState(null);
  const [achievedEnding, setAchievedEnding] = useState(null);
  const [viewingLore, setViewingLore] = useState(null);
  const [systemVoices, setSystemVoices] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // A simple check for mobile devices.
    const mobileCheck =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    setIsMobile(mobileCheck);
  }, []);

  const showAlert = (
    message,
    type = 'error',
    title = 'Alert',
    onConfirm = null,
    actions = null,
    prompt = null,
  ) => {
    setAlerts((prev) => [
      ...prev,
      { id: Date.now(), message, type, title, onConfirm, actions, prompt },
    ]);
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gamedata`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.error('Failed to fetch game data:', error);
      } finally {
        setAppState('voicepack_prompt');
      }
    };
    fetchGameData();
  }, []);

  const handleVoicePackInstalled = useCallback((voices) => {
    setSystemVoices(voices);
    setAppState('auth_check');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement;
      if (
        activeElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName)
      ) {
        return;
      }

      if (isBindingKey) return;

      const action = Object.keys(settings.keybindings).find(
        (key) => settings.keybindings[key] === e.key,
      );

      if (action) {
        // Prevent default browser actions for keys like Space or F5
        if (
          action === 'continue' ||
          action === 'saveGame' ||
          action.startsWith('choice')
        ) {
          e.preventDefault();
        }

        const isModalOpen =
          settingsVisible || inventoryVisible || journalVisible;

        if (action === 'toggleSettings') {
          if (settingsVisible) {
            setSettingsVisible(false);
          } else {
            // Open settings, close others
            setSettingsVisible(true);
            setInventoryVisible(false);
            setJournalVisible(false);
          }
          return;
        }

        if (settingsVisible) return; // Don't process game actions if settings are open

        if (action === 'openInventory' && appState === 'playing') {
          setInventoryVisible((v) => !v);
        } else if (action === 'openJournal' && appState === 'playing') {
          setJournalVisible((v) => !v);
        } else if (action === 'saveGame' && appState === 'playing') {
          handleQuickSave();
        } else if (!isModalOpen) {
          // Pass game-specific actions down only if no modals are open
          setLastAction({ action, time: Date.now() });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isBindingKey,
    settings.keybindings,
    appState,
    settingsVisible,
    inventoryVisible,
    journalVisible,
  ]);

  useEffect(() => {
    const verifyToken = async () => {
      if (authToken) {
        try {
          const res = await fetch(`${API_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          if (res.ok) {
            const userData = await res.json();
            setCurrentUser({ ...userData, isGuest: false });
            setSettings({ ...defaultSettings, ...userData.settings });
            setAppState('startScreen');
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          handleLogout();
        }
      } else {
        setAppState('auth');
      }
    };
    if (appState === 'auth_check') {
      verifyToken();
    }
  }, [appState, authToken]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        const headers = {};
        if (authToken) {
          headers['Authorization'] = `Bearer ${authToken}`;
        }
        const response = await fetch(`${API_URL}/api/stories`, { headers });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setAllStories(data);
      } catch (error) {
        console.error('Failed to fetch stories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (appState === 'storySelect' || appState === 'startScreen') {
      fetchStories();
    }
  }, [appState, authToken]);

  useEffect(() => {
    const fetchStoryData = async () => {
      if (!selectedStoryId) return;
      if (selectedStory && selectedStory.id === selectedStoryId) return;
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_URL}/api/stories/${selectedStoryId}`,
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setSelectedStory(data);
      } catch (error) {
        console.error(`Failed to fetch story ${selectedStoryId}:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStoryData();
  }, [selectedStoryId, selectedStory]);

  const handleSettingsChange = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    if (currentUser && !currentUser.isGuest && authToken) {
      try {
        await fetch(`${API_URL}/api/users/settings`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ [key]: value }),
        });
      } catch (error) {
        console.error('Failed to save settings:', error);
      }
    }
  };

  const onChapterEnd = useCallback(() => {
    setTimeout(() => goToChapterSelect(), 100);
  }, []);

  const {
    gameContext,
    handleChoice: processChoice,
    restartGame,
    startGameAt,
    saveGame,
    loadGame,
    loadCheckpoint,
    lastChanges,
  } = useGameState(selectedStoryId, onChapterEnd, currentUser);

  const { gameState, view } = gameContext || {};
  const {
    currentNode,
    processedChoices,
    speakerKey,
    speakerName,
    textToDisplay,
    isPlayerInScene,
    npcToDisplay,
  } = view || {};
  const {
    playerStats,
    inventory = [],
    discoveredLore = [],
    flags = [],
    highestChapterUnlocked = 1,
    visitedNodes = [],
    characters = [],
    relationships = {},
  } = gameState || {};

  useEffect(() => {
    if (appState === 'playing' && gameState?.visitedNodes && saveGame) {
      if (gameState.visitedNodes.length > 0) {
        saveGame(true);
      }
    }
  }, [
    gameState?.currentPosition,
    appState,
    saveGame,
    gameState?.visitedNodes.length,
  ]);

  const { bgmAudioRef, sfxAudioRef, playAmbientSfx, stopAllSfx } =
    useSoundManager({
      currentNode,
      volumes: settings,
      gameState: appState,
      hasInteracted,
      BGM: gameData?.BGM,
      SFX: gameData?.SFX,
    });

  useEffect(() => {
    if (appState !== 'playing' || !currentNode) {
      setActiveBackground(null);
      setScreenShake(false);
      return;
    }

    if (currentNode.background) {
      setActiveBackground(currentNode.background);
    }

    if (currentNode.jumpscare && gameData?.SFX) {
      setJumpscare(currentNode.jumpscare);
      if (gameData.SFX[currentNode.jumpscare.sfx]) {
        const audio = new Audio(gameData.SFX[currentNode.jumpscare.sfx]);
        audio.volume = settings.sfx * settings.master;
        audio.play().catch(() => {});
      }
    }

    if (settings.screenShakeEnabled && currentNode.visualEffect === 'rumble') {
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 400);
    }
  }, [appState, currentNode, settings, playAmbientSfx, gameData]);

  useEffect(() => {
    if (!lastChanges || !selectedStory) return;

    // Handle Stat Changes
    if (lastChanges.stats && lastChanges.stats.length > 0) {
      const newStatChanges = lastChanges.stats.map((change) => ({
        ...change,
        id: Date.now() + Math.random(),
      }));
      setStatChanges((prev) => [...prev, ...newStatChanges]);

      const statsThatChanged = lastChanges.stats.map((c) => c.stat);
      setUpdatedStats(statsThatChanged);
      setTimeout(() => setUpdatedStats([]), 700);
    }

    // Handle Notifications
    const newNotifications = [];
    if (lastChanges.inventory) {
      lastChanges.inventory.add.forEach((item) => {
        const itemDef = selectedStory?.items?.[item];
        newNotifications.push({
          id: `item_add_${item}_${Date.now()}`,
          type: 'item_add',
          text: `${itemDef?.name || item}`,
        });
      });
      lastChanges.inventory.remove.forEach((item) => {
        const itemDef = selectedStory?.items?.[item];
        newNotifications.push({
          id: `item_remove_${item}_${Date.now()}`,
          type: 'item_remove',
          text: `${itemDef?.name || item}`,
        });
      });
    }

    if (lastChanges.relationships && lastChanges.relationships.length > 0) {
      lastChanges.relationships.forEach((relChange) => {
        const charDef = selectedStory?.characters?.[relChange.character];
        if (charDef?.name) {
          newNotifications.push({
            id: `rel_${relChange.character}_${Date.now()}`,
            type: 'relationship',
            text: `${charDef.name} ${relChange.change > 0 ? '+' : ''}${relChange.change}`,
            change: relChange.change,
          });
        }
      });
    }

    if (lastChanges.loreAdded && lastChanges.loreAdded.length > 0) {
      newNotifications.push({
        id: `journal_lore_${Date.now()}`,
        type: 'journal_update',
        text: 'Journal Updated (Lore)',
      });
    }

    if (
      lastChanges.charactersDiscovered &&
      lastChanges.charactersDiscovered.length > 0
    ) {
      newNotifications.push({
        id: `journal_char_${Date.now()}`,
        type: 'journal_update',
        text: 'Journal Updated (Characters)',
      });
    }

    if (newNotifications.length > 0) {
      setNotifications((prev) => [...prev, ...newNotifications]);
    }
  }, [lastChanges, selectedStory]);

  useEffect(() => {
    const handleGlobalClick = (event) => {
      const target = event.target.closest('button');
      if (target && gameData?.SFX) {
        if (
          target.classList.contains('choice-button') ||
          target.classList.contains('restart-button')
        ) {
          return;
        }

        if (settings && settings.master > 0 && settings.sfx > 0) {
          const audio = new Audio(gameData.SFX.uiClick);
          audio.volume = settings.sfx * settings.master;
          audio.play().catch(() => {});
        }
      }
    };
    window.addEventListener('click', handleGlobalClick, true);
    return () => window.removeEventListener('click', handleGlobalClick, true);
  }, [settings, gameData]);

  const handleStorySelect = (storyId) => {
    setSelectedStory(null);
    setSelectedStoryId(storyId);
    setAppState('chapterSelect');
  };
  const goToChapterSelect = () => {
    loadGame(true);
    setAppState('chapterSelect');
  };
  const handleChoice = async (choice) => {
    stopAllSfx();
    if (choice.next === null) {
      setAppState('toBeContinued');
      return;
    }
    if (choice.next === 'END_STORY') {
      if (choice.ending) {
        setAchievedEnding(choice.ending);
      } else {
        // A default ending if none is specified
        setAchievedEnding({
          key: 'default_ending',
          title: 'The Story Concludes',
          description: 'Your journey has come to an end.',
          thumbnail: selectedStory.thumbnail, // fallback to story thumbnail
        });
      }
      setAppState('storyEnd');
      return;
    }
    const result = await processChoice(choice);
    if (result?.status === 'DEATH') {
      setDeathInfo({ text: result.text, next: result.nextOnDeath });
      setAppState('deathScreen');
    }
  };

  const handleContinueAfterDeath = (nodeKey) => {
    setAppState('playing');
    startGameAt(gameContext.gameState.currentPosition.chapter, nodeKey);
  };

  const handleChapterSelect = (chapterKey) => {
    setSelectedChapter(chapterKey);
    if (selectedStory.cautionScreen?.enabled) {
      setAppState('caution');
    } else {
      handleCautionProceed();
    }
  };
  const handleCautionProceed = () => {
    if (selectedChapter) {
      startGameAt(selectedChapter);
      setAppState('playing');
    }
  };
  const handleQuickSave = () => {
    if (currentUser?.isGuest) {
      showAlert(
        'Guest progress is not saved. Please register for an account to save.',
        'info',
        'Guest Account',
      );
      return;
    }
    saveGame(true);
    setShowAutosave(true);
    setTimeout(() => setShowAutosave(false), 2500);
  };

  const handleSaveAndGoHome = async () => {
    if (appState !== 'playing') return;

    if (currentUser && !currentUser.isGuest) {
      await saveGame(true); // silent save
    } else {
      showAlert(
        'As a guest, your progress will not be saved when you return to the chapter menu.',
        'info',
        'Guest Account',
      );
    }
    goToChapterSelect();
  };

  const handleAuthSuccess = ({ user, token }) => {
    if (user.isGuest) {
      setCurrentUser(user);
      setSettings(defaultSettings);
      setAppState('startScreen');
    } else {
      localStorage.setItem(TOKEN_KEY, token);
      setAuthToken(token);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthToken(null);
    setCurrentUser(null);
    setAppState('auth');
    setSelectedStory(null);
    setSelectedStoryId(null);
  };

  const handleDeleteAccount = async () => {
    showAlert(
      'Are you sure you want to delete your account? This action is irreversible and all your save data will be permanently lost.',
      'error',
      'Confirm Account Deletion',
      async () => {
        try {
          const response = await fetch(`${API_URL}/api/users/me`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${authToken}` },
          });
          if (!response.ok) throw new Error('Failed to delete account');
          handleLogout();
        } catch (error) {
          console.error('Delete account error:', error);
          showAlert('Error deleting account.', 'error', 'Deletion Failed');
        }
      },
    );
  };

  const handleContinue = async () => {
    if (currentUser?.lastSave?.storyId) {
      await handleStorySelect(currentUser.lastSave.storyId);
      const loaded = await loadGame();
      if (loaded) {
        setAppState('playing');
      }
    }
  };

  const handleEditStory = (story) => {
    setEditingStory(story);
    setAppState('editor');
  };
  const handleDeleteStory = async (storyId) => {
    if (!authToken) return;
    try {
      const response = await fetch(`${API_URL}/api/stories/${storyId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!response.ok) throw new Error('Failed to delete story');
      setAllStories((prev) => prev.filter((s) => s.id !== storyId));
      if (selectedStoryId === storyId) {
        setSelectedStoryId(null);
        setSelectedStory(null);
      }
      setAppState('storySelect');
    } catch (error) {
      console.error('Delete story error:', error);
      showAlert('Error deleting story.', 'error', 'Deletion Failed');
    }
  };
  const handleSaveStory = async (storyData) => {
    if (!authToken) return;
    const isNewStory = !storyData._id;
    const method = isNewStory ? 'POST' : 'PUT';
    const endpoint = isNewStory
      ? `${API_URL}/api/stories`
      : `${API_URL}/api/stories/${storyData.id}`;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(storyData),
      });
      if (!response.ok) {
        const errText = await response.text();
        console.error('Save error response:', errText);
        let err;
        try {
          err = JSON.parse(errText);
        } catch (e) {
          err = { message: errText };
        }
        throw new Error(err.message || 'Failed to save story');
      }
      const savedStory = await response.json();

      setAllStories((prev) =>
        isNewStory
          ? [...prev, savedStory]
          : prev.map((s) => (s.id === savedStory.id ? savedStory : s)),
      );
      setAppState('storySelect');
      setEditingStory(null);
      return true; // Indicate success
    } catch (error) {
      console.error('Save story error:', error);
      showAlert(`Error saving story: ${error.message}`, 'error', 'Save Failed');
      return false; // Indicate failure
    }
  };

  const handleEditorBack = useCallback(() => {
    setAppState('startScreen');
    setEditingStory(null);
  }, []);

  const handleViewLore = (itemKey) => {
    const itemDef = selectedStory?.items?.[itemKey];
    if (itemDef?.lore && itemDef.lore.title && itemDef.lore.content) {
      setViewingLore(itemDef.lore);
    }
  };

  const onEditorClick = () => {
    setEditingStory(null);
    setAppState('editor');
  };

  const storyForTheme = appState === 'editor' ? editingStory : selectedStory;
  const storyAccentColor = storyForTheme?.accentColor || '#FFFFFF';

  const combinedVoiceMap = { ...gameData?.voiceMap, ...selectedStory?.voices };

  const renderContent = () => {
    if (appState === 'loading' || !gameData)
      return <LoadingScreen text='Initializing...' />;

    if (appState === 'voicepack_prompt')
      return <VoicePackGate onInstalled={handleVoicePackInstalled} />;

    if (
      isLoading &&
      ![
        'auth',
        'startScreen',
        'loading',
        'voicepack_prompt',
        'auth_check',
      ].includes(appState)
    )
      return <LoadingScreen />;

    if (appState === 'auth' || appState === 'auth_check')
      return (
        <AuthScreen onAuthSuccess={handleAuthSuccess} showAlert={showAlert} />
      );

    if (appState === 'editor') {
      if (isMobile) {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              padding: '2rem',
              boxSizing: 'border-box',
            }}>
            <h2
              className='selection-screen-title'
              style={{ marginBottom: '1rem' }}>
              Editor Unavailable on Mobile
            </h2>
            <p
              style={{
                color: 'var(--secondary-text-color)',
                fontFamily: 'var(--body-font)',
                maxWidth: '400px',
                margin: '0 0 2rem 0',
                lineHeight: '1.6',
              }}>
              The Story Editor has complex features that require a larger
              screen. Please switch to a desktop device to create and edit
              stories.
            </p>
            <button
              className='themed-button secondary'
              onClick={handleEditorBack}>
              <ArrowLeft size={16} /> Back to Menu
            </button>
          </div>
        );
      }
      return (
        <StoryEditor
          storyToEdit={editingStory}
          onBack={handleEditorBack}
          onSave={handleSaveStory}
          gameData={gameData}
          showAlert={showAlert}
          systemVoices={systemVoices}
        />
      );
    }
    switch (appState) {
      case 'startScreen':
        return (
          <StartScreen
            onNewGame={() => setAppState('storySelect')}
            onLoad={handleContinue}
            hasSaveData={!!currentUser?.lastSave}
            onSettingsClick={() => setSettingsVisible(true)}
            onEditorClick={onEditorClick}
            onUserManagementClick={() => setAppState('userManagement')}
            onLogout={handleLogout}
            isAdmin={currentUser?.role === 'admin'}
            isMobile={isMobile}
          />
        );
      case 'userManagement':
        return (
          <UserManagementScreen
            onBack={() => setAppState('startScreen')}
            showAlert={showAlert}
            currentUser={currentUser}
          />
        );
      case 'storySelect':
        if (isLoading) return <LoadingScreen text='Loading library...' />;
        return (
          <StorySelectScreen
            onSelect={handleStorySelect}
            onBack={() => setAppState('startScreen')}
            stories={allStories}
            currentUser={currentUser}
            onEdit={handleEditStory}
            onDelete={handleDeleteStory}
            showAlert={showAlert}
            isMobile={isMobile}
          />
        );
      case 'chapterSelect':
        if (isLoading || !selectedStory)
          return <LoadingScreen text='Loading story...' />;
        return (
          <ChapterSelectScreen
            storyDetails={selectedStory.storyDetails}
            thumbnail={selectedStory.thumbnail}
            unlockedChapter={highestChapterUnlocked}
            onSelect={handleChapterSelect}
            onBack={() => setAppState('storySelect')}
          />
        );
      case 'caution':
        return (
          <CautionScreen
            onProceed={handleCautionProceed}
            title={selectedStory.cautionScreen?.title}
            text={selectedStory.cautionScreen?.text}
          />
        );
      case 'playing':
        if (isLoading || !selectedStory || !gameContext)
          return <LoadingScreen text='Loading chapter...' />;
        return (
          <GameUI
            playerStats={playerStats}
            characters={selectedStory.characters}
            settings={settings}
            onChoice={handleChoice}
            onRestart={() =>
              handleChapterSelect(gameState?.currentPosition.chapter)
            }
            onAmbientSfx={playAmbientSfx}
            onDialogueEnd={stopAllSfx}
            inventory={inventory}
            onInventoryClick={() => setInventoryVisible(true)}
            onJournalClick={() => setJournalVisible(true)}
            onSettingsClick={() => setSettingsVisible(true)}
            onSaveClick={handleQuickSave}
            onHomeClick={handleSaveAndGoHome}
            lastAction={lastAction}
            updatedStats={updatedStats}
            // Props from server view model
            currentNode={currentNode}
            processedChoices={processedChoices}
            speakerKey={speakerKey}
            speakerName={speakerName}
            textToDisplay={textToDisplay}
            isPlayerInScene={isPlayerInScene}
            npcToDisplay={npcToDisplay}
            voiceMap={combinedVoiceMap}
          />
        );
      case 'toBeContinued':
        return (
          <ToBeContinuedScreen onMainMenu={() => setAppState('storySelect')} />
        );
      case 'deathScreen':
        return (
          <DeathScreen
            onRestart={loadCheckpoint}
            onContinue={handleContinueAfterDeath}
            deathInfo={deathInfo}
          />
        );
      case 'storyEnd':
        return (
          <StoryEndScreen
            storyDetails={selectedStory?.storyDetails}
            ending={achievedEnding}
            onMainMenu={() => {
              setAchievedEnding(null);
              setAppState('storySelect');
            }}
          />
        );
      default:
        return null;
    }
  };

  const viewportStyle = {
    '--accent-color': storyAccentColor,
    '--accent-color-rgb': hexToRgb(storyAccentColor).join(', '),
  };

  const settingsContext = [
    'playing',
    'toBeContinued',
    'deathScreen',
    'storyEnd',
    'caution',
    'chapterSelect',
  ].includes(appState)
    ? 'game'
    : 'menu';

  return (
    <>
      <audio ref={bgmAudioRef} loop />
      <audio ref={sfxAudioRef} />
      <AlertModal alerts={alerts} setAlerts={setAlerts} />
      <div
        className={`game-viewport ${screenShake ? 'screen-shake' : ''}`}
        style={viewportStyle}>
        {settings.filmGrainEnabled && <FilmGrainOverlay />}
        {settings.scanLinesEnabled && <ScanLinesOverlay />}
        <AnimatePresence>
          {jumpscare && (
            <Jumpscare
              config={jumpscare}
              characters={selectedStory?.characters || {}}
              onComplete={() => setJumpscare(null)}
            />
          )}
        </AnimatePresence>
        <BackgroundImageFader imageUrl={activeBackground} />
        <Vignette isLowSanity={playerStats?.sanity < 30} />
        {renderContent()}
        <div className='stat-change-container'>
          <AnimatePresence>
            {statChanges.map((change) => (
              <StatChangeIndicator
                key={change.id}
                {...change}
                onComplete={(id) =>
                  setStatChanges((prev) => prev.filter((c) => c.id !== id))
                }
              />
            ))}
          </AnimatePresence>
        </div>
        <div className='notification-container'>
          <AnimatePresence>
            {notifications.map((note) => (
              <NotificationIndicator
                key={note.id}
                {...note}
                onComplete={(id) =>
                  setNotifications((prev) => prev.filter((n) => n.id !== id))
                }
              />
            ))}
          </AnimatePresence>
        </div>
        {showAutosave && <AutosaveIndicator />}
        <AnimatePresence>
          {settingsVisible && (
            <SettingsModal
              onClose={() => setSettingsVisible(false)}
              settings={settings}
              onSettingsChange={handleSettingsChange}
              onBindingChange={setIsBindingKey}
              onSave={appState === 'playing' ? handleQuickSave : null}
              onRestart={
                appState === 'playing'
                  ? () => {
                      setSettingsVisible(false);
                      restartGame();
                      goToChapterSelect();
                    }
                  : null
              }
              onLogout={() => {
                setSettingsVisible(false);
                handleLogout();
              }}
              onDeleteAccount={
                currentUser && !currentUser.isGuest ? handleDeleteAccount : null
              }
              context={settingsContext}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {inventoryVisible && selectedStory && (
            <InventoryModal
              onClose={() => setInventoryVisible(false)}
              inventory={inventory}
              itemDefs={selectedStory.items}
              onViewLore={handleViewLore}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {journalVisible && selectedStory && (
            <JournalModal
              onClose={() => setJournalVisible(false)}
              discoveredLore={discoveredLore}
              discoveredCharacters={characters}
              relationships={relationships}
              itemDefs={selectedStory.items}
              characterDefs={selectedStory.characters}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {viewingLore && (
            <LoreModal
              lore={viewingLore}
              onClose={() => setViewingLore(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
