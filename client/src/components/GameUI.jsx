import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTypewriter } from '../hooks/useTypewriter.js';
import { CharacterSprite } from './CharacterSprite.jsx';
import { DialogueBox } from './DialogueBox.jsx';
import { ChoicesModal } from './ChoicesModal.jsx';
import { HUD } from './HUD.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';

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
  currentNode,
  processedChoices,
  speakerKey,
  speakerName,
  textToDisplay,
  isPlayerInScene,
  npcToDisplay,
}) => {
  const [uiState, setUiState] = useState({
    dialogueVisible: false,
    choicesVisible: false,
    choicesFadingOut: false,
  });
  const [dialogueFadingOut, setDialogueFadingOut] = useState(false);
  const choiceHandlerRef = useRef(null);

  const playTypewriterTick = useCallback(() => {
    if (settings.typewriterSfxEnabled && settings.master > 0 && settings.sfx > 0) {
      const audio = new Audio('/audio/sfx/typewriter_tick.mp3');
      audio.volume = settings.sfx * settings.master * 0.4;
      audio.play().catch(() => {});
    }
  }, [settings]);

  const handleContinueClick = () => {
    if (isTyping) {
      skip();
    } else if (
      !isTyping &&
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

  const { displayedText, isTyping, skip } = useTypewriter({
    fullText: textToDisplay,
    node: currentNode,
    volumes: settings,
    onFinished: onDialogueEnd,
    onAmbientSfx: onAmbientSfx,
    onCharTyped: playTypewriterTick,
    isReady: uiState.dialogueVisible,
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

    if (!currentNode) return;

    const isInitialScene =
      currentNode?.choices?.length > 0 &&
      currentNode.choices[0].next === 'start_b';
    const delay = isInitialScene ? 1500 : 500;
    const timer = setTimeout(() => {
      setUiState((prev) => ({ ...prev, dialogueVisible: true }));
    }, delay);
    return () => clearTimeout(timer);
  }, [currentNode]);

  return (
    <>
      {(isTyping || (!isTyping && !uiState.choicesVisible && !dialogueFadingOut)) && (
        <div className='continue-click-area' onClick={handleContinueClick} />
      )}

      <div
        className={`dialogue-wrapper ${
          !uiState.dialogueVisible || dialogueFadingOut ? 'hidden' : ''
        }`}
        aria-hidden={!uiState.dialogueVisible || dialogueFadingOut}>
        <div className='scene-layout'>
          <div className='scene-column left'>
            {isPlayerInScene && (
              <CharacterSprite
                sprite={characters?.player?.sprite}
                name='Player'
                className='player'
                isActive={speakerKey === 'player'}
              />
            )}
          </div>

          <div className='scene-column center'>
            {/* Mobile-only sprite container is handled via CSS rearranging these columns */}
            <div className='story-box-container'>
              <DialogueBox
                speakerName={speakerName}
                displayedText={displayedText}
                isTyping={isTyping}
                sanity={playerStats?.sanity}
                textEffects={currentNode?.textEffects}
              />
            </div>
          </div>

          <div className='scene-column right'>
            <AnimatePresence mode="popLayout">
              {(npcToDisplay || []).map((npcKey) =>
                characters[npcKey] ? (
                  <motion.div
                    key={npcKey}
                    initial={{ opacity: 0, x: 40, filter: 'blur(5px)' }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      filter: 'blur(0px)',
                      transition: { duration: 0.8, ease: "easeOut" }
                    }}
                    exit={{ opacity: 0, x: 20, filter: 'blur(5px)', transition: { duration: 0.5 } }}
                  >
                    <CharacterSprite
                      sprite={characters[npcKey].sprite}
                      name={characters[npcKey].name}
                      className='npc'
                      isActive={speakerKey === npcKey}
                    />
                  </motion.div>
                ) : null,
              )}
            </AnimatePresence>
          </div>
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
