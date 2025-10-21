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
  textEffects,
  theme,
}) => (
  <div className={`story-container theme-${theme}`} aria-live='polite'>
    {speakerName && speakerName !== 'Narrator' && (
      <h3 className='speaker-name'>{speakerName}</h3>
    )}
    <p className='story-text'>
      {renderTextWithEffects(displayedText, textEffects)}
      {narratorState === 'narrating' && <span className='cursor'></span>}
    </p>
  </div>
);
