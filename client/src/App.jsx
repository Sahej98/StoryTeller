import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useGameState } from './hooks/useGameState.js';
import { useSoundManager } from './hooks/useSoundManager.js';
import { stories } from './stories/index.js';
import { SFX } from './data/audioData.js';
import { GlobalStyles } from './components/GlobalStyles.jsx';
import { Vignette } from './components/Vignette.jsx';
import { Jumpscare } from './components/Jumpscare.jsx';
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
import { ScanLinesOverlay } from './components/ScanLinesOverlay.jsx';
import { FilmGrainOverlay } from './components/FilmGrainOverlay.jsx';
import { StatChangeIndicator } from './components/StatChangeIndicator.jsx';

const SAVE_GAME_KEY = 'interactiveHorrorSave';
const SETTINGS_KEY = 'storytellerSettings';

const AutosaveIndicator = () => (
  <div className='autosave-indicator'>Autosaving...</div>
);

export const App = () => {
  const [appState, setAppState] = useState('startScreen'); // startScreen, storySelect, chapterSelect, caution, playing, toBeContinued, deathScreen, loading
  const [jumpscareConfig, setJumpscareConfig] = useState(null);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [journalVisible, setJournalVisible] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [activeBackground, setActiveBackground] = useState(null);
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [showAutosave, setShowAutosave] = useState(false);
  const [statNotifications, setStatNotifications] = useState([]);
  const oneShotAudioRef = useRef(null);

  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      const defaults = {
        master: 1,
        bgm: 0.3,
        sfx: 0.6,
        narration: 0.8,
        narrationEnabled: true,
      };
      return savedSettings
        ? { ...defaults, ...JSON.parse(savedSettings) }
        : defaults;
    } catch {
      return {
        master: 1,
        bgm: 0.3,
        sfx: 0.6,
        narration: 0.8,
        narrationEnabled: true,
      };
    }
  });

  const selectedStory = selectedStoryId ? stories[selectedStoryId] : null;
  const storyTheme = selectedStory ? selectedStory.theme || 'scifi' : 'scifi';

  const onChapterEnd = useCallback(() => {
    setShowAutosave(true);
    setTimeout(() => setShowAutosave(false), 2500);
    setTimeout(() => {
      goToChapterSelect();
    }, 100);
  }, []);

  const {
    gameState,
    handleChoice: processChoice,
    restartGame,
    startGameAt,
    saveGame,
    loadGame,
    hasSaveData,
    loadCheckpoint,
  } = useGameState(selectedStoryId, selectedStory, onChapterEnd);

  const {
    currentPosition,
    playerStats = { sanity: 100, health: 100, stamina: 100, morality: 50 },
    inventory = [],
    discoveredLore = new Set(),
    flags = new Set(),
    highestChapterUnlocked = 1,
    visitedNodes = new Set(),
    characters: discoveredCharacters = new Set(),
  } = gameState || {};

  const prevStatsRef = useRef(playerStats);

  useEffect(() => {
    if (playerStats) {
      const changes = {};
      for (const stat in playerStats) {
        const diff =
          playerStats[stat] -
          (prevStatsRef.current?.[stat] || playerStats[stat]);
        if (diff !== 0) {
          changes[stat] = diff;
        }
      }

      if (Object.keys(changes).length > 0) {
        const newNotifications = Object.entries(changes).map(
          ([stat, change]) => ({
            id: Date.now() + Math.random(),
            stat,
            change,
          })
        );
        setStatNotifications((prev) => [...prev, ...newNotifications]);
      }

      prevStatsRef.current = playerStats;
    }
  }, [playerStats]);

  const removeNotification = (id) => {
    setStatNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const currentNode =
    selectedStory && currentPosition
      ? selectedStory.storyData[currentPosition.chapter]?.[currentPosition.key]
      : null;
  const isLowSanity = playerStats?.sanity < 40;

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Could not save settings.', e);
    }
  }, [settings]);

  useEffect(() => {
    if (appState === 'playing') {
      if (currentNode?.background) {
        setActiveBackground(currentNode.background);
      }
    } else {
      setActiveBackground(null);
    }
  }, [appState, currentNode]);

  const { bgmAudioRef, sfxAudioRef, playAmbientSfx, stopAllSfx } =
    useSoundManager({
      currentNode,
      volumes: settings,
      gameState: appState,
    });

  const triggerJumpscare = (config, onComplete) => {
    if (!config) {
      if (onComplete) onComplete();
      return;
    }
    setJumpscareConfig(config);
    const sfxToPlay = config.sfx ? SFX[config.sfx] : SFX.jumpscare;
    if (settings.master > 0 && settings.sfx > 0 && sfxToPlay) {
      oneShotAudioRef.current = new Audio(sfxToPlay);
      oneShotAudioRef.current.volume = settings.sfx * settings.master;
      oneShotAudioRef.current
        .play()
        .catch((e) => console.error('Jumpscare SFX failed', e));
    }

    setTimeout(() => {
      setJumpscareConfig(null);
      if (onComplete) onComplete();
    }, config.duration || 900);
  };

  const handleStartNewGame = () => setAppState('storySelect');

  const handleStorySelect = (storyId) => {
    setSelectedStoryId(storyId);
    setAppState('chapterSelect');
  };

  const goToChapterSelect = () => {
    loadGame(true); // silent load to refresh unlocked chapters
    setAppState('chapterSelect');
  };

  const handleChoice = (choice) => {
    stopAllSfx();

    if (choice.next === null) {
      setAppState('toBeContinued');
      return;
    }

    const result = processChoice(choice);
    if (result === 'DEATH') {
      setAppState('deathScreen');
      return;
    }

    const targetNode = selectedStory.storyData[result.chapter]?.[result.key];
    if (targetNode?.jumpscare) {
      triggerJumpscare(targetNode.jumpscare, () => {});
    }
  };

  const handleRestartFromCheckpoint = () => {
    loadCheckpoint();
    setAppState('playing');
  };

  const handleChapterSelect = (chapterKey) => {
    setSelectedChapter(chapterKey);
    if (storyTheme === 'horror') {
      setAppState('caution');
    } else {
      handleCautionProceed();
    }
  };

  const handleLoadGame = () => {
    const savedData = localStorage.getItem(SAVE_GAME_KEY);
    if (savedData) {
      try {
        const loadedState = JSON.parse(savedData);
        if (loadedState.storyId && stories[loadedState.storyId]) {
          setSelectedStoryId(loadedState.storyId);
          setAppState('loading');
        } else {
          alert('Save data is corrupted or from an unknown story.');
        }
      } catch (e) {
        alert('Could not read save data.');
        localStorage.removeItem(SAVE_GAME_KEY);
      }
    }
  };

  useEffect(() => {
    if (appState === 'loading' && selectedStoryId) {
      if (loadGame()) {
        setAppState('playing');
      } else {
        setAppState('startScreen');
      }
    }
  }, [appState, selectedStoryId, loadGame]);

  const handleCautionProceed = () => {
    if (selectedChapter) {
      startGameAt(selectedChapter);
      setAppState('playing');
      const startNode = selectedStory.storyData[selectedChapter].start;
      if (startNode?.background) {
        const img = new Image();
        img.src = startNode.background;
      }
    }
  };

  const handleSettingsChange = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleQuickSave = () => {
    saveGame(true);
    setShowAutosave(true);
    setTimeout(() => setShowAutosave(false), 2500);
  };

  const checkChoiceRequirements = useCallback(
    (choice) => {
      if (!choice.requires) return true;
      const {
        stats,
        inventory: requiredInventory,
        flags: requiredFlags,
        notFlags: forbiddenFlags,
      } = choice.requires;
      if (stats)
        for (const stat in stats)
          if ((playerStats[stat] || 0) < stats[stat]) return false;
      if (requiredInventory)
        for (const item of requiredInventory)
          if (!inventory.includes(item)) return false;
      if (requiredFlags)
        for (const flag of requiredFlags) if (!flags.has(flag)) return false;
      if (forbiddenFlags)
        for (const flag of forbiddenFlags) if (flags.has(flag)) return false;
      return true;
    },
    [playerStats, inventory, flags]
  );

  const availableChoices =
    currentNode?.choices?.filter(checkChoiceRequirements) || [];

  if (appState === 'playing' && (!gameState || !currentNode)) {
    if (gameState && !currentNode)
      return (
        <div>
          Error: Story node not found for {currentPosition.chapter}/
          {currentPosition.key}
        </div>
      );
    return null;
  }

  const viewportClasses = [
    'game-viewport',
    jumpscareConfig && 'screen-shake',
    isLowSanity && 'low-sanity',
    currentNode?.visualEffect && `effect-${currentNode.visualEffect}`,
  ]
    .filter(Boolean)
    .join(' ');

  const renderContent = () => {
    if (
      !selectedStory &&
      ['playing', 'chapterSelect', 'caution'].includes(appState)
    ) {
      setTimeout(() => setAppState('startScreen'), 0);
      return null;
    }

    switch (appState) {
      case 'startScreen':
        return (
          <StartScreen
            onNewGame={handleStartNewGame}
            onLoad={handleLoadGame}
            hasSaveData={hasSaveData}
            onSettingsClick={() => setSettingsVisible(true)}
          />
        );
      case 'storySelect':
        return (
          <StorySelectScreen
            onSelect={handleStorySelect}
            onBack={() => setAppState('startScreen')}
          />
        );
      case 'chapterSelect':
        return (
          <ChapterSelectScreen
            storyDetails={selectedStory.storyDetails}
            unlockedChapter={highestChapterUnlocked}
            onSelect={handleChapterSelect}
            onBack={() => setAppState('storySelect')}
          />
        );
      case 'caution':
        return <CautionScreen onProceed={handleCautionProceed} />;
      case 'toBeContinued':
        return (
          <ToBeContinuedScreen onMainMenu={() => setAppState('startScreen')} />
        );
      case 'deathScreen':
        return <DeathScreen onRestart={handleRestartFromCheckpoint} />;
      case 'playing':
        return (
          <GameUI
            storyData={selectedStory.storyData}
            characters={selectedStory.characters}
            theme={storyTheme}
            currentPosition={currentPosition}
            settings={settings}
            onChoice={handleChoice}
            onRestart={() => handleChapterSelect(currentPosition.chapter)}
            onAmbientSfx={playAmbientSfx}
            onDialogueEnd={stopAllSfx}
            availableChoices={availableChoices}
            timer={currentNode.timer || 0}
            defaultChoiceIndex={currentNode.defaultChoiceIndex || 0}
            visitedNodes={visitedNodes}
            playerStats={playerStats}
            inventory={inventory}
            flags={flags}
            onInventoryClick={() => setInventoryVisible(true)}
            onJournalClick={() => setJournalVisible(true)}
            onSettingsClick={() => setSettingsVisible(true)}
            onSaveClick={handleQuickSave}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <GlobalStyles />
      <audio ref={bgmAudioRef} loop />
      <audio ref={sfxAudioRef} />
      <div className={viewportClasses}>
        <div className='stat-change-container'>
          {statNotifications.map((notif) => (
            <StatChangeIndicator
              key={notif.id}
              {...notif}
              onComplete={removeNotification}
            />
          ))}
        </div>

        {activeBackground && (
          <BackgroundImageFader imageUrl={activeBackground} />
        )}
        <Vignette isLowSanity={isLowSanity} />
        {storyTheme === 'horror' && <FilmGrainOverlay />}
        {storyTheme === 'scifi' && <ScanLinesOverlay />}

        <Jumpscare
          config={jumpscareConfig}
          characters={selectedStory?.characters}
        />
        {renderContent()}

        {showAutosave && <AutosaveIndicator />}

        {selectedStory && (
          <>
            <SettingsModal
              isVisible={settingsVisible}
              onClose={() => setSettingsVisible(false)}
              settings={settings}
              onSettingsChange={handleSettingsChange}
              onSave={() => saveGame()}
              onRestart={() => {
                setSettingsVisible(false);
                restartGame();
                goToChapterSelect();
              }}
            />
            <InventoryModal
              isVisible={inventoryVisible}
              onClose={() => setInventoryVisible(false)}
              inventory={inventory}
              itemDefs={selectedStory.items}
            />
            <JournalModal
              isVisible={journalVisible}
              onClose={() => setJournalVisible(false)}
              discoveredLore={Array.from(discoveredLore)}
              discoveredCharacters={Array.from(discoveredCharacters)}
              itemDefs={selectedStory.items}
              characterDefs={selectedStory.characters}
            />
          </>
        )}
      </div>
    </>
  );
};
