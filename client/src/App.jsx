import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useGameState } from './hooks/useGameState.js';
import { useSoundManager } from './hooks/useSoundManager.js';
import { storyData, items } from './stories/the_asylum/index.js';
import { SFX } from './data/audioData.js';
import { GlobalStyles } from './components/GlobalStyles.jsx';
import { Vignette } from './components/Vignette.jsx';
import { Jumpscare } from './components/Jumpscare.jsx';
import { StartScreen } from './components/StartScreen.jsx';
import { GameUI } from './components/GameUI.jsx';
import { MuteButton } from './components/MuteButton.jsx';
import { SettingsModal } from './components/SettingsModal.jsx';
import { HUD } from './components/HUD.jsx';
import { InventoryModal } from './components/InventoryModal.jsx';
import { JournalModal } from './components/JournalModal.jsx';
import { ToBeContinuedScreen } from './components/ToBeContinuedScreen.jsx';
import { ChapterSelectScreen } from './components/ChapterSelectScreen.jsx';
import { CautionScreen } from './components/CautionScreen.jsx';
import { DeathScreen } from './components/DeathScreen.jsx';
import { Settings } from 'lucide-react';

const SettingsButton = ({ onClick }) => (
  <button className='game-button' onClick={onClick} aria-label='Open Settings'>
    <Settings />
  </button>
);

const FilmGrainOverlay = () => <div className='film-grain-overlay'></div>;

export const App = () => {
  const [appState, setAppState] = useState('startScreen'); // startScreen, chapterSelect, caution, playing, toBeContinued, deathScreen
  const [jumpscareActive, setJumpscareActive] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [journalVisible, setJournalVisible] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [volumes, setVolumes] = useState({
    master: 1,
    bgm: 0.3,
    sfx: 0.6,
    narration: 0.8,
  });
  const preMuteMasterVolume = useRef(1);

  const {
    gameState,
    handleChoice: processChoice,
    restartGame,
    startGameAt,
    saveGame,
    loadGame,
    hasSaveData,
    loadCheckpoint,
  } = useGameState();
  const {
    currentPosition,
    playerStats,
    inventory,
    discoveredLore,
    flags,
    highestChapterUnlocked,
    visitedNodes,
  } = gameState;

  const currentNode = storyData[currentPosition.chapter]?.[currentPosition.key];
  const isLowSanity = playerStats.sanity < 40;

  const { bgmAudioRef, sfxAudioRef, playAmbientSfx, stopAllSfx } =
    useSoundManager({
      currentNode,
      volumes,
      gameState: appState,
    });

  const openJournal = () => {
    setInventoryVisible(false);
    setJournalVisible(true);
  };

  const triggerJumpscare = (onComplete) => {
    setJumpscareActive(true);
    if (sfxAudioRef.current && volumes.master > 0) {
      sfxAudioRef.current.src = SFX.jumpscare;
      sfxAudioRef.current.volume = volumes.sfx * volumes.master;
      sfxAudioRef.current
        .play()
        .catch((e) => console.error('Jumpscare SFX failed', e));
    }

    setTimeout(() => {
      setJumpscareActive(false);
      onComplete();
    }, 800);
  };

  const goToChapterSelect = () => {
    loadGame(); // Make sure latest unlocked chapter data is loaded
    setAppState('chapterSelect');
  };

  const handleChoice = (choice) => {
    stopAllSfx();

    if (choice.next === null) {
      setAppState('toBeContinued');
      return;
    }

    const nextPosition =
      typeof choice.next === 'object'
        ? choice.next
        : { chapter: currentPosition.chapter, key: choice.next };
    const isChapterEnd = nextPosition.chapter !== currentPosition.chapter;

    const result = processChoice(choice);

    if (result === 'DEATH') {
      setAppState('deathScreen');
      return;
    }

    const targetNodeKey = result;

    if (isChapterEnd) {
      setTimeout(() => {
        goToChapterSelect();
      }, 100);
      return;
    }

    const targetNode = storyData[targetNodeKey.chapter]?.[targetNodeKey.key];

    if (targetNode) {
      const transition = () => {
        /* State is already updated by processChoice */
      };
      if (targetNode.jumpscare) {
        triggerJumpscare(transition);
      } else {
        transition();
      }
    }
  };

  const handleRestartFromCheckpoint = () => {
    loadCheckpoint();
    setAppState('playing');
  };

  const handleChapterSelect = (chapterKey) => {
    setSelectedChapter(chapterKey);
    setAppState('caution');
  };

  const handleLoadGame = () => {
    if (loadGame()) {
      setAppState('playing');
    }
  };

  const handleCautionProceed = () => {
    if (selectedChapter) {
      startGameAt(selectedChapter);
      setAppState('playing');
      const startNode = storyData[selectedChapter].start;
      if (startNode) {
        const img = new Image();
        img.src = startNode.background;
      }
    }
  };

  const handleVolumeChange = useCallback((type, value) => {
    const newVolume = parseFloat(value);
    setVolumes((prev) => ({ ...prev, [type]: newVolume }));
    if (type === 'master' && newVolume > 0) {
      preMuteMasterVolume.current = newVolume;
    }
  }, []);

  const toggleMute = useCallback(() => {
    const isCurrentlyMuted = volumes.master === 0;
    const newMasterVolume = isCurrentlyMuted ? preMuteMasterVolume.current : 0;
    setVolumes((prev) => ({ ...prev, master: newMasterVolume }));
  }, [volumes.master]);

  const checkChoiceRequirements = useCallback(
    (choice) => {
      if (!choice.requires) return true;
      const {
        stats,
        inventory: requiredInventory,
        flags: requiredFlags,
      } = choice.requires;
      if (stats) {
        for (const stat in stats) {
          if ((playerStats[stat] || 0) < stats[stat]) return false;
        }
      }
      if (requiredInventory) {
        for (const item of requiredInventory) {
          if (!inventory.includes(item)) return false;
        }
      }
      if (requiredFlags) {
        for (const flag of requiredFlags) {
          if (!flags.has(flag)) return false;
        }
      }
      return true;
    },
    [playerStats, inventory, flags]
  );

  const availableChoices =
    currentNode?.choices?.filter(checkChoiceRequirements) || [];

  if (!currentNode && appState === 'playing') {
    return (
      <div>
        Error: Story node not found for {currentPosition.chapter}/
        {currentPosition.key}
      </div>
    );
  }

  const viewportClasses = [
    'game-viewport',
    jumpscareActive ? 'screen-shake' : '',
    isLowSanity ? 'low-sanity' : '',
    currentNode?.visualEffect ? `effect-${currentNode.visualEffect}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const renderContent = () => {
    switch (appState) {
      case 'startScreen':
        return (
          <StartScreen
            onStart={goToChapterSelect}
            onLoad={handleLoadGame}
            hasSaveData={hasSaveData}
          />
        );
      case 'chapterSelect':
        return (
          <ChapterSelectScreen
            unlockedChapter={highestChapterUnlocked}
            onSelect={handleChapterSelect}
            onBack={() => setAppState('startScreen')}
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
          <>
            <HUD
              stats={playerStats}
              onInventoryClick={() => setInventoryVisible(true)}
              inventoryCount={inventory.length}
            />
            <GameUI
              currentPosition={currentPosition}
              volumes={volumes}
              onChoice={handleChoice}
              onRestart={() => handleChapterSelect(currentPosition.chapter)}
              onAmbientSfx={playAmbientSfx}
              onDialogueEnd={stopAllSfx}
              availableChoices={availableChoices}
              timer={currentNode.timer || 0}
              defaultChoiceIndex={currentNode.defaultChoiceIndex || 0}
              visitedNodes={visitedNodes}
            />
          </>
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
      <div
        className={viewportClasses}
        style={{
          backgroundImage:
            appState === 'playing'
              ? `url('${currentNode.background}')`
              : 'none',
        }}>
        <Vignette isLowSanity={isLowSanity} />
        <FilmGrainOverlay />

        {jumpscareActive && <Jumpscare />}
        {renderContent()}

        {appState === 'playing' && (
          <div className='top-right-controls'>
            <MuteButton isMuted={volumes.master === 0} onToggle={toggleMute} />
            <SettingsButton onClick={() => setSettingsVisible(true)} />
          </div>
        )}

        <SettingsModal
          isVisible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
          volumes={volumes}
          onVolumeChange={handleVolumeChange}
          onSave={saveGame}
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
          itemDefs={items}
          discoveredLoreCount={discoveredLore.size}
          onOpenJournal={openJournal}
        />
        <JournalModal
          isVisible={journalVisible}
          onClose={() => setJournalVisible(false)}
          discoveredLore={Array.from(discoveredLore)}
          itemDefs={items}
        />
      </div>
    </>
  );
};
