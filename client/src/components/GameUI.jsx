import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTypewriter } from '../hooks/useTypewriter.js';
import { CharacterSprite } from './CharacterSprite.jsx';
import { DialogueBox } from './DialogueBox.jsx';
import { ChoicesModal } from './ChoicesModal.jsx';
import { HUD } from './HUD.jsx';

export const GameUI = ({
  characters,
  settings,
  onChoice,
  onRestart,
  onAmbientSfx,
  onDialogueEnd,
  playerStats,
  inventory,
  onInventoryClick,
  onJournalClick,
  onSettingsClick,
  onSaveClick,
  onHomeClick,
  lastAction,
  updatedStats,
  // New props from server view model
  currentNode,
  processedChoices,
  speakerKey,
  speakerName,
  textToDisplay,
  isPlayerInScene,
  npcToDisplay,
  voiceMap,
}) => {
  const [uiState, setUiState] = useState({
    dialogueVisible: false,
    choicesVisible: false,
    choicesFadingOut: false,
  });
  const [dialogueFadingOut, setDialogueFadingOut] = useState(false);
  const choiceHandlerRef = useRef(null);

  const characterVoiceKey = characters[speakerKey]?.voiceKey;
  const finalVoiceKey = characterVoiceKey || speakerKey || 'narrator';

  const handleContinueClick = () => {
    if (narratorState === 'narrating') {
      skip();
    } else if (
      narratorState === 'finished' &&
      !uiState.choicesVisible &&
      !dialogueFadingOut
    ) {
      setDialogueFadingOut(true);

      setTimeout(() => {
        const isAutoProceed =
          processedChoices?.length === 1 && processedChoices[0].text === '...';

        setUiState((prev) => ({ ...prev, dialogueVisible: false }));

        if (isAutoProceed) {
          onChoice(processedChoices[0]);
        } else {
          setUiState((prev) => ({ ...prev, choicesVisible: true }));
        }
      }, 500);
    }
  };

  const { displayedText, narratorState, skip } = useTypewriter({
    fullText: textToDisplay,
    node: currentNode,
    volumes: settings,
    narrationEnabled: settings.narrationEnabled,
    onFinished: onDialogueEnd,
    onAmbientSfx: onAmbientSfx,
    isReady: uiState.dialogueVisible,
    speakerKey: finalVoiceKey,
    voiceMap,
  });

  const handleChoiceClick = (choice) => {
    if (uiState.choicesFadingOut) return;

    choiceHandlerRef.current = () => onChoice(choice);

    setUiState({
      dialogueVisible: false,
      choicesVisible: true,
      choicesFadingOut: true,
    });

    setTimeout(() => {
      if (choiceHandlerRef.current) {
        choiceHandlerRef.current();
        choiceHandlerRef.current = null;
      }
    }, 500);
  };

  const lastActionRef = useRef(null);
  useEffect(() => {
    if (
      !lastAction ||
      (lastActionRef.current && lastAction.time === lastActionRef.current.time)
    ) {
      return;
    }
    lastActionRef.current = lastAction;

    const { action } = lastAction;

    if (action === 'continue') {
      handleContinueClick();
    } else if (action.startsWith('choice')) {
      const choiceIndex = parseInt(action.replace('choice', ''), 10) - 1;
      if (
        uiState.choicesVisible &&
        processedChoices[choiceIndex] &&
        !processedChoices[choiceIndex].isDisabled
      ) {
        handleChoiceClick(processedChoices[choiceIndex]);
      }
    }
  }, [lastAction, processedChoices, uiState.choicesVisible]);

  useEffect(() => {
    setUiState({
      dialogueVisible: false,
      choicesVisible: false,
      choicesFadingOut: false,
    });
    setDialogueFadingOut(false);

    // Check if current node exists to prevent errors on chapter end
    if (!currentNode) return;

    const isInitialScene =
      currentNode?.choices?.length > 0 &&
      currentNode.choices[0].next === 'start_b'; // Heuristic for first node
    const delay = isInitialScene ? 1500 : 500;
    const timer = setTimeout(() => {
      setUiState((prev) => ({ ...prev, dialogueVisible: true }));
    }, delay);
    return () => clearTimeout(timer);
  }, [currentNode]);

  return (
    <>
      {(narratorState === 'narrating' ||
        (narratorState === 'finished' &&
          !uiState.choicesVisible &&
          !dialogueFadingOut)) && (
        <div className='continue-click-area' onClick={handleContinueClick} />
      )}

      <div
        className={`dialogue-wrapper ${
          !uiState.dialogueVisible || dialogueFadingOut ? 'hidden' : ''
        }`}
        aria-hidden={!uiState.dialogueVisible || dialogueFadingOut}>
        {isPlayerInScene ? (
          <CharacterSprite
            sprite={characters?.player?.sprite}
            name='Player'
            className='player'
            isActive={speakerKey === 'player'}
          />
        ) : (
          <div style={{ gridColumn: 1 }}></div>
        )}

        <DialogueBox
          speakerName={speakerName}
          displayedText={displayedText}
          narratorState={narratorState}
          textEffects={currentNode?.textEffects}
        />

        <div
          style={{
            gridColumn: 3,
            display: 'flex',
            justifyContent: 'flex-start',
          }}>
          {(npcToDisplay || []).map((npcKey) =>
            characters[npcKey] ? (
              <CharacterSprite
                key={npcKey}
                sprite={characters[npcKey].sprite}
                name={characters[npcKey].name}
                className='npc'
                isActive={speakerKey === npcKey}
              />
            ) : null,
          )}
        </div>
      </div>

      {(uiState.choicesVisible || uiState.choicesFadingOut) && (
        <ChoicesModal
          isFadingOut={uiState.choicesFadingOut}
          choices={processedChoices}
          onChoice={handleChoiceClick}
          onRestart={onRestart}
          timer={currentNode?.timer || 0}
          defaultChoiceIndex={currentNode?.defaultChoiceIndex || 0}
        />
      )}

      <HUD
        playerStats={playerStats}
        inventoryCount={inventory.length}
        onInventoryClick={onInventoryClick}
        onJournalClick={onJournalClick}
        onSettingsClick={onSettingsClick}
        onSaveClick={onSaveClick}
        onHomeClick={onHomeClick}
        updatedStats={updatedStats}
      />
    </>
  );
};
