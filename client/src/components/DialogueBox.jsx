import React from 'react';
import { ChevronDown } from 'lucide-react';

const scrambleText = (text, intensity) => {
  const glyphs = 'ᚙᛮᚸᚻᚦ᚛᚜×†‡§‖¶⁖⁘⁙⁚⁛⁜⁂';
  return text.split('').map(char => {
    if (char === ' ' || char === '\n') return char;
    return Math.random() < intensity ? glyphs[Math.floor(Math.random() * glyphs.length)] : char;
  }).join('');
};

const renderTextWithEffects = (text, effects = [], sanity = 100) => {
  const glitchIntensity = sanity < 25 ? (25 - sanity) / 100 : 0;
  const processedText = glitchIntensity > 0 ? scrambleText(text, glitchIntensity) : text;

  if (!effects || !effects.length) return processedText;

  // 1. Sort by length descending to match longest phrases first (e.g. "A lot" before "A")
  // 2. Escape special regex characters (dots, brackets, etc.)
  const effectWords = effects
    .filter((e) => e && e.word) // Safety check
    .sort((a, b) => b.word.length - a.word.length)
    .map((e) => e.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (effectWords.length === 0) return text;

  // Create a regex that splits by the effect words, capturing them
  const regex = new RegExp(`(${effectWords.join('|')})`, 'g');

  const parts = processedText.split(regex);

  return parts.map((part, index) => {
    // Check if this part matches an effect word exactly
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
  isTyping,
  textEffects,
  sanity,
  theme,
}) => (
  <div className={`story-container theme-${theme} ${sanity < 15 ? 'critical-sanity-glitch' : ''}`} aria-live='polite'>
    {speakerName && speakerName !== 'Narrator' && (
      <h3 className='speaker-name'>{speakerName}</h3>
    )}
    <p className='story-text'>
      {renderTextWithEffects(displayedText, textEffects, sanity)}
      {isTyping && <span className='cursor'></span>}
    </p>
    {!isTyping && (
      <div className='continue-indicator' aria-hidden='true'>
        <ChevronDown color='white' />
      </div>
    )}
  </div>
);
