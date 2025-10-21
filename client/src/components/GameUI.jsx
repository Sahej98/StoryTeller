import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTypewriter } from '../hooks/useTypewriter.js';
import { CharacterSprite } from './CharacterSprite.jsx';
import { DialogueBox } from './DialogueBox.jsx';
import { ChoicesModal } from './ChoicesModal.jsx';
import { ControlBar } from './ControlBar.jsx';

export const GameUI = ({
  storyData,
  characters,
  currentPosition,
  settings,
  onChoice,
  onRestart,
  onAmbientSfx,
  onDialogueEnd,
  availableChoices,
  timer,
  defaultChoiceIndex,
  visitedNodes,
  theme,
  playerStats,
  inventory,
  flags,
  onInventoryClick,
  onJournalClick,
  onSettingsClick,
  onSaveClick,
}) => {
  const [uiState, setUiState] = useState({
    dialogueVisible: false,
    choicesVisible: false,
    choicesFadingOut: false,
  });
  const preloadedImages = useRef(new Set());
  const choiceHandlerRef = useRef(null);

  const currentNode = storyData[currentPosition.chapter][currentPosition.key];

  const handleNarrationFinish = useCallback(() => {
    const isAutoProceed =
      availableChoices?.length === 1 && availableChoices[0].text === '...';

    if (isAutoProceed) {
      // Hide the current dialogue before proceeding. This uses the fade-out animation.
      setUiState((prev) => ({ ...prev, dialogueVisible: false }));
      // Wait for the fade-out to finish before changing scenes.
      setTimeout(() => {
        onChoice(availableChoices[0]);
      }, 500); // Match the CSS transition duration for .dialogue-wrapper
    } else {
      // Otherwise, show the choices.
      setUiState((prev) => ({ ...prev, choicesVisible: true }));
    }
  }, [availableChoices, onChoice]);

  const hasRevisitText =
    visitedNodes.has(`${currentPosition.chapter}/${currentPosition.key}`) &&
    currentNode.revisitText;
  const textToDisplay = hasRevisitText
    ? currentNode.revisitText
    : currentNode.text;

  const getSpeakerKey = useCallback(() => {
    const key =
      hasRevisitText && currentNode.revisitSpeaker
        ? currentNode.revisitSpeaker
        : currentNode.speaker;
    if (!key) return 'narrator';
    if (key === 'You') return 'player';
    return key.toLowerCase();
  }, [currentNode, hasRevisitText]);

  const { displayedText, narratorState, skip } = useTypewriter({
    fullText: textToDisplay,
    node: currentNode,
    volumes: settings,
    narrationEnabled: settings.narrationEnabled,
    onFinished: handleNarrationFinish,
    onDialogueEnd,
    onAmbientSfx,
    isReady: uiState.dialogueVisible,
    speakerKey: getSpeakerKey(),
  });

  const handleChoiceClick = (choice) => {
    if (uiState.choicesFadingOut) return;

    choiceHandlerRef.current = () => onChoice(choice);

    // Hide BOTH choices and dialogue to prevent flicker on scene change
    setUiState({
      dialogueVisible: false,
      choicesVisible: false,
      choicesFadingOut: true,
    });

    // Wait for fade-out animation to complete before loading the next node
    setTimeout(() => {
      if (choiceHandlerRef.current) {
        choiceHandlerRef.current();
        choiceHandlerRef.current = null;
      }
    }, 500); // Match CSS transition duration
  };

  useEffect(() => {
    setUiState({
      dialogueVisible: false,
      choicesVisible: false,
      choicesFadingOut: false,
    });
    const isInitialScene =
      currentPosition.chapter === 'chapter1' && currentPosition.key === 'start';
    const delay = isInitialScene ? 1500 : 500;
    const timer = setTimeout(() => {
      setUiState((prev) => ({ ...prev, dialogueVisible: true }));
    }, delay);
    return () => clearTimeout(timer);
  }, [currentPosition]);

  useEffect(() => {
    if (currentNode.choices) {
      currentNode.choices.forEach((choice) => {
        if (!choice.next) return;
        let nextChapterData = storyData[currentPosition.chapter];
        let nextKey = choice.next;
        let nextNodeDef = choice.next;

        if (typeof nextNodeDef === 'object' && nextNodeDef.chapter) {
          nextChapterData = storyData[nextNodeDef.chapter];
          nextKey = nextNodeDef.key;
        }

        const nextNode = nextChapterData?.[nextKey];
        if (
          nextNode &&
          nextNode.background &&
          !preloadedImages.current.has(nextNode.background)
        ) {
          const img = new Image();
          img.src = nextNode.background;
          preloadedImages.current.add(nextNode.background);
        }
      });
    }
  }, [currentNode.choices, currentPosition.chapter, storyData]);

  const isPlayerInScene =
    currentNode.speaker === 'player' ||
    !!currentNode.npc ||
    currentNode.speaker === 'You';
  const npcToDisplay = Array.isArray(currentNode.npc)
    ? currentNode.npc
    : currentNode.npc
    ? [currentNode.npc]
    : [];

  const speakerKey = getSpeakerKey();
  const speakerInfo = characters[speakerKey];
  let speakerName = speakerInfo ? speakerInfo.name : speakerKey;

  // Logic to show '???' for undiscovered characters
  if (speakerKey === 'harris' && !flags.has('met_harris')) {
    speakerName = '???';
  }

  return (
    <>
      <div
        className={`dialogue-wrapper ${
          !uiState.dialogueVisible ? 'hidden' : ''
        }`}
        aria-hidden={!uiState.dialogueVisible}>
        {isPlayerInScene ? (
          <CharacterSprite
            sprite={characters.player.sprite}
            name='Player'
            className='player'
            isActive={getSpeakerKey() === 'player'}
          />
        ) : (
          <div style={{ gridColumn: 1 }}></div>
        )}

        <DialogueBox
          speakerName={speakerName}
          displayedText={displayedText}
          narratorState={narratorState}
          textEffects={currentNode.textEffects}
          theme={theme}
        />

        <div
          style={{
            gridColumn: 3,
            display: 'flex',
            justifyContent: 'flex-start',
          }}>
          {npcToDisplay.map((npcKey) =>
            characters[npcKey] ? (
              <CharacterSprite
                key={npcKey}
                sprite={characters[npcKey].sprite}
                name={characters[npcKey].name}
                className='npc'
                isActive={getSpeakerKey() === npcKey}
              />
            ) : null
          )}
        </div>
      </div>

      {(uiState.choicesVisible || uiState.choicesFadingOut) && (
        <ChoicesModal
          isFadingOut={uiState.choicesFadingOut}
          choices={availableChoices}
          onChoice={handleChoiceClick}
          onRestart={onRestart}
          timer={timer}
          defaultChoiceIndex={defaultChoiceIndex}
          theme={theme}
        />
      )}

      <ControlBar
        stats={playerStats}
        inventoryCount={inventory.length}
        onInventoryClick={onInventoryClick}
        onJournalClick={onJournalClick}
        onSettingsClick={onSettingsClick}
        onSaveClick={onSaveClick}
        onSkipClick={skip}
      />
    </>
  );
};
