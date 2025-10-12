import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTypewriter } from '../hooks/useTypewriter.js';
import { storyData, characters } from '../stories/the_asylum/index.js';
import { CharacterSprite } from './CharacterSprite.jsx';
import { DialogueBox } from './DialogueBox.jsx';
import { ChoicesModal } from './ChoicesModal.jsx';

export const GameUI = ({
  currentPosition,
  volumes,
  onChoice,
  onRestart,
  onAmbientSfx,
  onDialogueEnd,
  availableChoices,
  timer,
  defaultChoiceIndex,
  visitedNodes,
}) => {
  const [uiState, setUiState] = useState({
    dialogueVisible: false,
    choicesVisible: false,
  });
  const preloadedImages = useRef(new Set());
  const currentNode = storyData[currentPosition.chapter][currentPosition.key];

  const handleNarrationFinish = useCallback(() => {
    setUiState({ dialogueVisible: false, choicesVisible: true });
  }, []);

  const hasRevisitText =
    visitedNodes.has(currentPosition.key) && currentNode.revisitText;
  const textToDisplay = hasRevisitText
    ? currentNode.revisitText
    : currentNode.text;

  const { displayedText, narratorState } = useTypewriter({
    fullText: textToDisplay,
    node: currentNode,
    volumes,
    onFinished: handleNarrationFinish,
    onDialogueEnd,
    onAmbientSfx,
    isReady: uiState.dialogueVisible,
  });

  useEffect(() => {
    setUiState({ dialogueVisible: false, choicesVisible: false });
    const isInitialScene =
      currentPosition.chapter === 'chapter1' && currentPosition.key === 'start';
    const delay = isInitialScene ? 3000 : 800;
    const timer = setTimeout(() => {
      setUiState((prev) => ({ ...prev, dialogueVisible: true }));
    }, delay);
    return () => clearTimeout(timer);
  }, [currentPosition]);

  useEffect(() => {
    if (currentNode.choices) {
      currentNode.choices.forEach((choice) => {
        let nextChapterData = storyData[currentPosition.chapter];
        let nextKey = choice.next;
        let nextNodeDef = choice.next;

        if (typeof nextNodeDef === 'object' && nextNodeDef.chapter) {
          nextChapterData = storyData[nextNodeDef.chapter];
          nextKey = nextNodeDef.key;
        }

        const nextNode = nextChapterData?.[nextKey];
        if (nextNode && !preloadedImages.current.has(nextNode.background)) {
          const img = new Image();
          img.src = nextNode.background;
          preloadedImages.current.add(nextNode.background);
        }
      });
    }
  }, [currentNode.choices, currentPosition.chapter]);

  const getSpeakerName = () => {
    const speakerKey =
      hasRevisitText && currentNode.revisitSpeaker
        ? currentNode.revisitSpeaker
        : currentNode.speaker;
    if (speakerKey === 'Narrator' || speakerKey === 'You') return speakerKey;
    return characters[speakerKey]?.name || '';
  };

  const getSpeakerKey = () => {
    const speakerKey =
      hasRevisitText && currentNode.revisitSpeaker
        ? currentNode.revisitSpeaker
        : currentNode.speaker;
    if (
      speakerKey === 'Narrator' ||
      speakerKey === 'You' ||
      speakerKey === 'player'
    )
      return 'narrator';
    return speakerKey || 'narrator';
  };

  const isPlayerInScene =
    currentNode.speaker === 'player' ||
    !!currentNode.npc ||
    currentNode.speaker === 'You';
  const isNpcInScene = !!currentNode.npc;
  const isPlayerSpeaking =
    currentNode.speaker === 'player' || currentNode.speaker === 'You';

  // Handle cases where npc is an array
  const isNpcSpeaking = Array.isArray(currentNode.npc)
    ? currentNode.npc.includes(currentNode.speaker)
    : currentNode.speaker === currentNode.npc;

  const npcToDisplay = Array.isArray(currentNode.npc)
    ? currentNode.npc
    : currentNode.npc
    ? [currentNode.npc]
    : [];

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
            isActive={isPlayerSpeaking}
          />
        ) : (
          <div style={{ gridColumn: 1 }}></div>
        )}

        <DialogueBox
          speakerName={getSpeakerName()}
          displayedText={displayedText}
          narratorState={narratorState}
          speakerKey={getSpeakerKey()}
          textEffects={currentNode.textEffects}
        />

        <div
          style={{
            gridColumn: 3,
            display: 'flex',
            justifyContent: 'flex-start',
          }}>
          {isNpcInScene &&
            npcToDisplay.map((npcKey) =>
              characters[npcKey] ? (
                <CharacterSprite
                  key={npcKey}
                  sprite={characters[npcKey].sprite}
                  name={characters[npcKey].name}
                  className='npc'
                  isActive={currentNode.speaker === npcKey}
                />
              ) : null
            )}
        </div>
      </div>

      {uiState.choicesVisible && (
        <ChoicesModal
          choices={availableChoices}
          onChoice={onChoice}
          onRestart={onRestart}
          timer={timer}
          defaultChoiceIndex={defaultChoiceIndex}
        />
      )}
    </>
  );
};
