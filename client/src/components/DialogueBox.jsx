import React from 'react';

const renderTextWithEffects = (text, effects = []) => {
  if (!effects || !effects.length) return text;

  // Create a regex that will split the string by all the words we want to style
  const effectWords = effects.map((e) =>
    e.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  const regex = new RegExp(`(${effectWords.join('|')})`, 'g');

  const parts = text.split(regex);

  return parts.map((part, index) => {
    const effect = effects.find((e) => e.word === part);
    if (effect) {
      return (
        <span key={index} className={`text-effect-${effect.effect}`}>
          {part}
        </span>
      );
    }
    return part;
  });
};

export const DialogueBox = ({
  speakerName,
  displayedText,
  narratorState,
  speakerKey,
  textEffects,
}) => (
  <div className='story-container' aria-live='polite'>
    <div className={`speaker-name ${speakerKey}`}>{speakerName}</div>
    <p className='story-text'>
      {renderTextWithEffects(displayedText, textEffects)}
      {narratorState === 'narrating' && <span className='cursor'></span>}
    </p>
  </div>
);
