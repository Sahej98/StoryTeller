
import { useState, useEffect, useRef, useCallback } from 'react';

// Helper functions outside component

export const useTypewriter = ({
  node,
  fullText,
  volumes,
  onFinished,
  onAmbientSfx,
  onCharTyped,
  isReady,
}) => {
  const [displayedText, setDisplayedText] = useState(''); // The text currently displayed
  const [isTyping, setIsTyping] = useState(false); // Whether the typewriter effect is active

  const typewriterIntervalRef = useRef(null);
  const utteranceRef = useRef(null);
  const onFinishedRef = useRef(onFinished);
  const firedTriggersRef = useRef(new Set());

  const PunctuationPauses = {
    '.': 15,
    '!': 15,
    '?': 15,
    ',': 8,
    '...': 20,
  };

  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  const handleFinish = useCallback(() => {
    setIsTyping(false);
    if (typewriterIntervalRef.current) {
      clearInterval(typewriterIntervalRef.current);
      typewriterIntervalRef.current = null;
    }
    utteranceRef.current = null;
    if (onFinishedRef.current) {
      onFinishedRef.current();
    }
  }, []);

  const skip = useCallback(() => {
    if (isTyping) {
      if (typewriterIntervalRef.current) {
        clearInterval(typewriterIntervalRef.current);
        typewriterIntervalRef.current = null;
      }
      setDisplayedText(fullText); // Display full text immediately
      handleFinish(); // Mark as finished
    }
  }, [isTyping, fullText, handleFinish]);

  useEffect(() => {
    if (typewriterIntervalRef.current) {
      clearInterval(typewriterIntervalRef.current);
      typewriterIntervalRef.current = null;
    }
    setDisplayedText('');
    firedTriggersRef.current.clear();

    if (!isReady || !node || !fullText) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    const triggerSfxIfNeeded = (text) => {
      if (node.ambientSfx && onAmbientSfx) {
        node.ambientSfx.forEach((trigger, index) => {
          const triggerId = `sfx-${index}`;
          if (
            !firedTriggersRef.current.has(triggerId) &&
            text.includes(trigger.triggerWord)
          ) {
            onAmbientSfx(trigger.sfx);
            firedTriggersRef.current.add(triggerId);
          }
        });
      }
    };
    
    // Always trigger all ambient SFX immediately at the start of dialogue
    if (node.ambientSfx && onAmbientSfx) {
      node.ambientSfx.forEach(trigger => {
        if (fullText.includes(trigger.triggerWord)) {
          onAmbientSfx(trigger.sfx);
        }
      });
    }

    // Typewriter Mode (Always active now)
    const lineLanguage = 'en'; // Default to English for text segmentation

      if (!('Segmenter' in Intl)) {
        let i = 0;        
        const runStep = () => {
          if (i < fullText.length) {
            const char = fullText[i];
            setDisplayedText(fullText.substring(0, i + 1));            
            if (onCharTyped) onCharTyped();
            
            const baseSpeed = 30 - volumes.textSpeed * 25;
            const pauseMultiplier = PunctuationPauses[char] || 1;
            const nextDelay = Math.max(5, baseSpeed * (i === fullText.length - 1 ? 1 : pauseMultiplier));
            
            i++;
            typewriterIntervalRef.current = setTimeout(runStep, nextDelay);
          } else {
            handleFinish();
          }
        };
        typewriterIntervalRef.current = setTimeout(runStep, 30);
        return;
      }

      try {
        const segmenter = new Intl.Segmenter(lineLanguage, { granularity: 'grapheme' });
        const graphemes = [...segmenter.segment(fullText)].map(s => s.segment);
        let graphemeIndex = 0;
        
        const runGraphemeStep = () => {
          if (graphemeIndex < graphemes.length) {
            const char = graphemes[graphemeIndex];
            const currentText = graphemes.slice(0, graphemeIndex + 1).join('');
            setDisplayedText(currentText);
            if (onCharTyped) onCharTyped();
            
            const baseSpeed = 30 - volumes.textSpeed * 25;
            const pauseMultiplier = PunctuationPauses[char] || 1;
            const nextDelay = Math.max(5, baseSpeed * (graphemeIndex === graphemes.length - 1 ? 1 : pauseMultiplier));
            
            graphemeIndex++;
            typewriterIntervalRef.current = setTimeout(runGraphemeStep, nextDelay);
          } else {
            typewriterIntervalRef.current = null;
            handleFinish();
          }
        };
        typewriterIntervalRef.current = setTimeout(runGraphemeStep, 30);
      } catch (e) {
        console.error("Typewriter error:", e);
        setDisplayedText(fullText);
        handleFinish();
      }
    }

    return () => {
      if (typewriterIntervalRef.current) {
        clearInterval(typewriterIntervalRef.current);
      }
    };
  }, [
    node, fullText, isReady, onAmbientSfx, volumes, handleFinish,
  ]);

  return { displayedText, isTyping, skip };
};
