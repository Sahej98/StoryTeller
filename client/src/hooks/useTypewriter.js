import { useState, useEffect, useRef, useCallback } from 'react';

export const useTypewriter = ({
  node,
  fullText,
  volumes,
  onFinished,
  onAmbientSfx,
  isReady,
  onDialogueEnd,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [narratorState, setNarratorState] = useState('idle');
  const [voices, setVoices] = useState([]);
  const typewriterIntervalRef = useRef(null);
  const firedTriggersRef = useRef(new Set());

  const isMuted = volumes.master === 0 || volumes.narration === 0;

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const stopNarration = useCallback(() => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    if (typewriterIntervalRef.current) {
      clearInterval(typewriterIntervalRef.current);
      typewriterIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    stopNarration();
    setDisplayedText('');
    firedTriggersRef.current.clear();

    if (!isReady || !node || !fullText) {
      setNarratorState('idle');
      return;
    }

    setNarratorState('narrating');

    const isSpeechActive =
      !isMuted && 'speechSynthesis' in window && voices.length > 0;

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

    const handleFinish = () => {
      setNarratorState('finished');
      if (onDialogueEnd) {
        onDialogueEnd();
      }
      const hasChoices = node.choices && node.choices.length > 0;
      const delay = hasChoices ? 500 : 0;
      setTimeout(() => {
        onFinished();
      }, delay);
    };

    // --- Typewriter Logic ---
    let charIndex = 0;
    const typewriterSpeed = 50;
    typewriterIntervalRef.current = window.setInterval(() => {
      if (charIndex < fullText.length) {
        const currentText = fullText.substring(0, charIndex + 1);
        setDisplayedText(currentText);

        if (!isSpeechActive) {
          triggerSfxIfNeeded(currentText);
        }
        charIndex++;
      } else {
        clearInterval(typewriterIntervalRef.current);
        typewriterIntervalRef.current = null;
        if (!isSpeechActive) {
          handleFinish();
        }
      }
    }, typewriterSpeed);

    // --- Speech Synthesis Logic ---
    if (isSpeechActive) {
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.pitch = 0.5;
      utterance.rate = 0.7;
      utterance.volume = volumes.narration * volumes.master;

      const preferredVoices = [
        'Microsoft David - English (United States)',
        'Google US English',
        'Microsoft Zira Desktop - English (United States)',
        'Google UK English Female',
      ];
      let voice = null;
      for (const name of preferredVoices) {
        voice = voices.find((v) => v.name === name);
        if (voice) break;
      }
      if (!voice) {
        voice =
          voices.find((v) => v.lang.startsWith('en-US')) ||
          voices.find((v) => v.lang.startsWith('en-'));
      }
      if (voice) utterance.voice = voice;

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const spokenText = fullText.substring(
            0,
            event.charIndex + event.charLength
          );
          triggerSfxIfNeeded(spokenText);
        }
      };

      utterance.onend = () => {
        setDisplayedText(fullText);
        handleFinish();
      };

      speechSynthesis.speak(utterance);
    }

    return () => stopNarration();
  }, [
    node,
    fullText,
    isReady,
    isMuted,
    voices,
    onFinished,
    stopNarration,
    onAmbientSfx,
    volumes,
    onDialogueEnd,
  ]);

  return { displayedText, narratorState };
};
