import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { useGameState } from './hooks/useGameState.js';
import { useSoundManager } from './hooks/useSoundManager.js';
import { useSmartPreload } from './hooks/useSmartPreload.js';
import { AnimatePresence, motion } from 'framer-motion';

import { Vignette } from './components/Vignette.jsx';
import { StartScreen } from './components/StartScreen.jsx';
import { GameUI } from './components/GameUI.jsx';
import { SettingsModal } from './components/SettingsModal.jsx';
import { InventoryModal } from './components/InventoryModal.jsx';
import { JournalModal } from './components/JournalModal.jsx';
import { ToBeContinuedScreen } from './components/ToBeContinuedScreen.jsx';
import { ChapterEndScreen } from './components/ChapterEndScreen.jsx';
import { ChapterSelectScreen } from './components/ChapterSelectScreen.jsx';
import { CautionScreen } from './components/CautionScreen.jsx';
import { DeathScreen } from './components/DeathScreen.jsx';
import { BackgroundImageFader } from './components/BackgroundImageFader.jsx';
import { StorySelectScreen } from './components/StorySelectScreen.jsx';
import { AuthScreen } from './components/AuthScreen.jsx';
import { StoryEditor } from './components/StoryEditor.jsx';
import { StatChangeIndicator } from './components/StatChangeIndicator.jsx';
import { NotificationIndicator } from './components/NotificationIndicator.jsx';
import { UserManagementScreen } from './components/UserManagementScreen.jsx';
import { GlobalSettingsScreen } from './components/GlobalSettingsScreen.jsx';
import { AlertModal } from './components/AlertModal.jsx';
import { LoadingScreen } from './components/LoadingScreen.jsx';
import { StoryEndScreen } from './components/StoryEndScreen.jsx';
import { LoreModal } from './components/LoreModal.jsx';
import { Jumpscare } from './components/Jumpscare.jsx';
import { FilmGrainOverlay } from './components/FilmGrainOverlay.jsx';
import { ScanLinesOverlay } from './components/ScanLinesOverlay.jsx'; // Keep if scanlines are still a feature

const TOKEN_KEY = 'storyteller_token';
const SETTINGS_KEY = 'storyteller_settings';
const API_URL = import.meta.env.VITE_API_URL || '';

const defaultSettings = {
  master: 1,
  bgm: 0.3,
  sfx: 0.6, // Keep SFX
  textSpeed: 0.5,
  screenShakeEnabled: true,
  filmGrainEnabled: true,
  typewriterSfxEnabled: true,
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
  if (!hex) return [255, 255, 255];
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
  }
  return [255, 255, 255];
}

export const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem(TOKEN_KEY),
  );
  const [appState, setAppState] = useState('loading');
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
  const [settings, setSettings] = useState(() => {
    try {
      const localSettings = localStorage.getItem(SETTINGS_KEY);
      return localSettings
        ? { ...defaultSettings, ...JSON.parse(localSettings) }
        : defaultSettings;
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error);
      return defaultSettings;
    }
  });
  const [editingStory, setEditingStory] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isBindingKey, setIsBindingKey] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [jumpscare, setJumpscare] = useState(null);
  const [statChanges, setStatChanges] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [bloodSplatter, setBloodSplatter] = useState(false);
  const [sanityDrop, setSanityDrop] = useState(false);
  const [staminaDrop, setStaminaDrop] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [updatedStats, setUpdatedStats] = useState([]);
  const [gameData, setGameData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [deathInfo, setDeathInfo] = useState(null);
  const [achievedEnding, setAchievedEnding] = useState(null);
  const [viewingLore, setViewingLore] = useState(null);
  const [isMobile, setIsMobile] = useState(false); // Keep mobile check for other UI adjustments
  const [loadingText, setLoadingText] = useState('Loading...');

  const lastJumpscareNodeRef = useRef(null);
  const sanityWhisperAudioRef = useRef(null);
  const heartbeatAudioRef = useRef(null);

  const showAlert = useCallback(
    (
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
    },
    [],
  );

  useEffect(() => {
    const mobileCheck =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    setIsMobile(mobileCheck);
  }, [showAlert]);

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
        setAppState('auth_check');
      }
    };
    fetchGameData();
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
            setSettingsVisible(true);
            setInventoryVisible(false);
            setJournalVisible(false);
          }
          return;
        }

        if (settingsVisible) return;

        if (action === 'openInventory' && appState === 'playing') {
          setInventoryVisible((v) => !v);
        } else if (action === 'openJournal' && appState === 'playing') {
          setJournalVisible((v) => !v);
        } else if (action === 'saveGame' && appState === 'playing') {
          handleQuickSave();
        } else if (!isModalOpen) {
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

  const handleSettingsChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveAllSettings = async () => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings to localStorage:', error);
    }

    if (currentUser && !currentUser.isGuest && authToken) {
      try {
        const response = await fetch(`${API_URL}/api/users/settings`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(settings),
        });
        if (!response.ok) throw new Error('Server responded with an error.');
        showAlert('Settings saved to your account!', 'success', 'Saved');
      } catch (error) {
        console.error('Failed to save settings to server:', error);
        showAlert(
          'Failed to save settings to your account.',
          'error',
          'Save Failed',
        );
      }
    } else {
      showAlert('Settings saved to this device!', 'success', 'Saved');
    }
  };

  const onChapterEnd = useCallback((finalState) => {
    setAppState('chapterEnd');
  }, [selectedStoryId]);

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

  useSmartPreload(
    currentNode,
    selectedStory?.storyData,
    selectedStory?.characters,
  );

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

  // Ensure SFX stops when leaving game
  useEffect(() => {
    if (appState !== 'playing') {
      stopAllSfx();
    }
  }, [appState, stopAllSfx]);

  useEffect(() => {
    if (appState !== 'playing' || !currentNode) {
      setActiveBackground(null);
      setScreenShake(false);
      lastJumpscareNodeRef.current = null;
      return;
    }

    if (currentNode.background) {
      setActiveBackground(currentNode.background);
    }

    if (currentNode.jumpscare) {
      const nodeId = `${gameState?.currentPosition?.chapter}_${gameState?.currentPosition?.key}`;

      if (lastJumpscareNodeRef.current !== nodeId) {
        lastJumpscareNodeRef.current = nodeId;
        setJumpscare(currentNode.jumpscare);

        if (gameData?.SFX) {
          const sfxSource = currentNode.jumpscare.sfx;
          let sfxUrl = null;

          if (gameData.SFX[sfxSource]) {
            sfxUrl = gameData.SFX[sfxSource];
          } else if (
            typeof sfxSource === 'string' &&
            (sfxSource.startsWith('/') || sfxSource.startsWith('http'))
          ) {
            sfxUrl = sfxSource;
          }

          if (sfxUrl) {
            const audio = new Audio(sfxUrl);
            audio.volume = settings.sfx * settings.master;
            audio
              .play()
              .catch((e) => console.warn('Jumpscare audio play failed', e));
          }
        }
      }
    }

    if (settings.screenShakeEnabled && currentNode.visualEffect === 'rumble') {
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 400);
    }
  }, [appState, currentNode, settings, playAmbientSfx, gameData, gameState]);

  const handleJumpscareComplete = useCallback(() => {
    setJumpscare(null);
  }, []);

  useEffect(() => {
    if (!lastChanges || !selectedStory) return;

    if (lastChanges.stats && lastChanges.stats.length > 0) {
      const newStatChanges = lastChanges.stats.map((change) => ({
        ...change,
        isNegative: change.change < 0,
        id: Date.now() + Math.random(),
      }));
      setStatChanges((prev) => [...prev, ...newStatChanges]);

      if (lastChanges.stats.some(s => s.stat === 'health' && s.change < 0)) {
        setBloodSplatter(true);
        setTimeout(() => setBloodSplatter(false), 2000);
      }
      
      if (lastChanges.stats.some(s => s.stat === 'sanity' && s.change < 0)) {
        setSanityDrop(true);
        setTimeout(() => setSanityDrop(false), 1500);
      }

      if (lastChanges.stats.some(s => s.stat === 'stamina' && s.change < 0)) {
        setStaminaDrop(true);
        setTimeout(() => setStaminaDrop(false), 1500);
      }

      const statsThatChanged = lastChanges.stats.map((c) => c.stat);
      setUpdatedStats(statsThatChanged);
      setTimeout(() => setUpdatedStats([]), 700);
    }

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

  // Handle Stat-Reactive Audio Loops (Whispers & Heartbeat)
  useEffect(() => {
    if (appState !== 'playing' || !playerStats || !gameData?.SFX) {
      if (sanityWhisperAudioRef.current) {
        sanityWhisperAudioRef.current.pause();
        sanityWhisperAudioRef.current = null;
      }
      if (heartbeatAudioRef.current) {
        heartbeatAudioRef.current.pause();
        heartbeatAudioRef.current = null;
      }
      return;
    }

    const { health, sanity, stamina } = playerStats;
    const masterVol = settings.master;
    const sfxVol = settings.sfx;

    // 1. Sanity Whispers Logic
    if (!sanityWhisperAudioRef.current && gameData.SFX.sanity_whispers) {
      const audio = new Audio(gameData.SFX.sanity_whispers);
      audio.loop = true;
      sanityWhisperAudioRef.current = audio;
    }

    if (sanityWhisperAudioRef.current) {
      // Volume starts scaling up when sanity is below 50%
      const whisperIntensity = Math.max(0, (50 - sanity) / 50);
      sanityWhisperAudioRef.current.volume = whisperIntensity * sfxVol * masterVol;
      
      if (whisperIntensity > 0 && sanityWhisperAudioRef.current.paused && hasInteracted) {
        sanityWhisperAudioRef.current.play().catch(() => {});
      } else if (whisperIntensity <= 0 && !sanityWhisperAudioRef.current.paused) {
        sanityWhisperAudioRef.current.pause();
      }
    }

    // 2. Heartbeat Logic (Health or Stamina)
    if (!heartbeatAudioRef.current && gameData.SFX.heartbeat) {
      const audio = new Audio(gameData.SFX.heartbeat);
      audio.loop = true;
      heartbeatAudioRef.current = audio;
    }

    if (heartbeatAudioRef.current) {
      // Triggered by either critical health or critical stamina (below 30%)
      const lowestPhysicalStat = Math.min(health, stamina);
      const heartbeatIntensity = Math.max(0, (30 - lowestPhysicalStat) / 30);
      heartbeatAudioRef.current.volume = heartbeatIntensity * sfxVol * masterVol;
      
      // Scale playback speed from 1.0 (at 30% health/stamina) up to 2.0 (at 0% health/stamina)
      heartbeatAudioRef.current.playbackRate = 1.0 + heartbeatIntensity;

      if (heartbeatIntensity > 0 && heartbeatAudioRef.current.paused && hasInteracted) {
        heartbeatAudioRef.current.play().catch(() => {});
      } else if (heartbeatIntensity <= 0 && !heartbeatAudioRef.current.paused) {
        heartbeatAudioRef.current.pause();
      }
    }
  }, [appState, playerStats, settings, gameData, hasInteracted]);

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
    if (choice.next === 'END_STORY') {
      if (choice.ending) {
        setAchievedEnding(choice.ending);
      } else {
        setAchievedEnding({
          key: 'default_ending',
          title: 'The Story Concludes',
          description: 'Your journey has come to an end.',
          thumbnail: selectedStory.thumbnail,
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

  const proceedToGame = useCallback(() => {
    if (selectedChapter) {
      setLoadingText('Starting chapter...');
      startGameAt(selectedChapter);
      setAppState('playing');
    }
  }, [selectedChapter, startGameAt]);

  useEffect(() => {
    if (appState !== 'preloading' || !selectedChapter || !selectedStory) return;

    const startNodeKey = 'start';
    const chapterData = selectedStory.storyData[selectedChapter];

    setTimeout(() => {
      if (selectedStory.cautionScreen?.enabled) {
        setAppState('caution');
      } else {
        proceedToGame();
      }
    }, 1000);
  }, [appState, selectedChapter, selectedStory, proceedToGame]);

  const handleContinueAfterDeath = (nodeKey) => {
    setAppState('playing');
    startGameAt(gameContext.gameState.currentPosition.chapter, nodeKey);
  };

  const handleChapterSelect = (chapterKey) => {
    setSelectedChapter(chapterKey);
    setLoadingText('Loading chapter...');
    setAppState('preloading');
  };

  const handleCautionProceed = () => {
    proceedToGame();
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
      await saveGame(true);
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
      setAppState('startScreen');
    } else {
      localStorage.setItem(TOKEN_KEY, token);
      setAuthToken(token);
      setCurrentUser({ ...user, isGuest: false });
      if (user.settings) {
        setSettings({ ...defaultSettings, ...user.settings });
      }
      setAppState('startScreen');
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
    if (!authToken) {
      showAlert('You must be logged in to save stories.', 'error', 'Authentication Required');
      handleLogout();
      return false;
    }

    const isNewStory = !storyData._id;
    const method = isNewStory ? 'POST' : 'PUT';
    const identifier = storyData.id || storyData._id;

    const endpoint = isNewStory
      ? `${API_URL}/api/stories`
      : `${API_URL}/api/stories/${identifier}`;

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
        if (response.status === 401 || response.status === 400) { // 400 for current server behavior before fix
          showAlert('Your session has expired. Please log in again.', 'error', 'Session Expired');
          handleLogout();
          return false;
        }
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
      // Update the active gameplay story if it's the one we just saved
      if (selectedStoryId === savedStory.id || selectedStoryId === savedStory._id) {
        setSelectedStory(savedStory);
      }
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

  const combinedVoiceMap = useMemo(() => {
    // This was removed in a previous step, but the variable was still declared.
    // If voice narration is completely removed, this can be deleted.
    return {}; 
  }, []);

  const renderContent = () => {
    if (appState === 'loading' || !gameData)
      return <LoadingScreen text='Initializing...' />;

    if (appState === 'preloading') return <LoadingScreen text={loadingText} />;

    if (
      isLoading &&
      !['auth', 'startScreen', 'loading', 'auth_check'].includes(appState)
    )
      return <LoadingScreen />;

    if (appState === 'auth' || appState === 'auth_check')
      return (
        <AuthScreen onAuthSuccess={handleAuthSuccess} showAlert={showAlert} />
      );

    if (appState === 'editor') {
      return (
        <StoryEditor
          storyToEdit={editingStory}
          onBack={handleEditorBack}
          onSave={handleSaveStory}
        />
      );
    }

    if (appState === 'globalSettings') {
      return (
        <GlobalSettingsScreen
          onBack={() => setAppState('startScreen')}
          showAlert={showAlert}
          authToken={authToken}
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
            onGlobalAssetsClick={() => setAppState('globalSettings')}
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
            currentNode={currentNode}
            processedChoices={processedChoices}
            speakerKey={speakerKey}
            speakerName={speakerName}
            textToDisplay={textToDisplay}
            isPlayerInScene={isPlayerInScene}
            npcToDisplay={npcToDisplay}
          />
        );
      case 'chapterEnd':
        const chapterDetails = selectedStory?.storyDetails?.chapters?.[gameState?.currentPosition?.chapter];
        return (
          <ChapterEndScreen 
            chapter={chapterDetails}
            stats={playerStats}
            relationships={relationships}
            characterDefs={selectedStory.characters}
            discoveredCharacters={characters}
            inventoryCount={inventory.length}
            onNext={() => goToChapterSelect()} 
          />
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

  // Calculate intensities for horror effects
  const sanityValue = playerStats?.sanity ?? 100;
  const isInsane = sanityValue < 40;
  const flickerClass = isInsane ? `sanity-flicker-${sanityValue < 15 ? 'heavy' : 'light'}` : '';
  const isCriticalHealth = playerStats?.health < 25;
  const sanityOffset = Math.max(0, (70 - sanityValue) / 10);

  const viewportStyle = {
    '--accent-color': storyAccentColor,
    '--accent-color-rgb': hexToRgb(storyAccentColor).join(', '),
    '--sanity-offset': `${sanityOffset}px`,
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
        className={`game-viewport ${screenShake ? 'screen-shake' : ''} ${flickerClass} ${sanityOffset > 0 ? 'sanity-chromatic' : ''} ${isCriticalHealth ? "critical-health-pulse" : ""} ${currentNode?.visualEffect ? `effect-${currentNode.visualEffect}` : ''}`}
        style={viewportStyle}>
          <AnimatePresence>
          {bloodSplatter && (
            <motion.div 
              key="blood-splatter"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ exit: { duration: 3 } }}
              className="blood-splatter-overlay" 
            />
          )}
          {sanityDrop && (
            <motion.div 
              key="sanity-drop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sanity-drop-overlay" 
            />
          )}
          {staminaDrop && (
            <motion.div 
              key="stamina-drop"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="stamina-drop-overlay" 
            />
          )}
        </AnimatePresence>
        {settings.filmGrainEnabled && <FilmGrainOverlay />}
        {settings.scanLinesEnabled && <ScanLinesOverlay />}
        <AnimatePresence>
          {jumpscare && (
            <Jumpscare
              config={jumpscare}
              characters={selectedStory?.characters || {}}
              onComplete={handleJumpscareComplete}
            />
          )}
        </AnimatePresence>
        <BackgroundImageFader imageUrl={activeBackground} />
        <Vignette sanity={playerStats?.sanity ?? 100} />
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
            \n{' '}
          </AnimatePresence>
        </div>
        {showAutosave && <AutosaveIndicator />}
        <AnimatePresence>
          {settingsVisible && (
            <SettingsModal
              onClose={() => setSettingsVisible(false)}
              settings={settings}
              onSettingsChange={handleSettingsChange}
              onSaveSettings={saveAllSettings}
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
              showAlert={showAlert}
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
