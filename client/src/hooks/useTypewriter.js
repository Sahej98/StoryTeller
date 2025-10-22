import { useState, useEffect, useRef, useCallback } from 'react';
import { voiceMap } from '../data/voiceData.js';

// Helper functions outside component
const findVoice = (voices, preferences) => {
  if (!preferences || !preferences.names || !voices) return null;
  for (const name of preferences.names) {
    const found = voices.find((v) => v.name.includes(name));
    if (found) return found;
  }
  return null;
};

// Hook
export const useTypewriter = ({
  node,
  fullText,
  volumes,
  narrationEnabled,
  onFinished,
  onAmbientSfx,
  isReady,
  speakerKey,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [narratorState, setNarratorState] = useState('idle');
  const [voices, setVoices] = useState([]);

  const typewriterIntervalRef = useRef(null);
  const utteranceRef = useRef(null);
  const onFinishedRef = useRef(onFinished);
  const firedTriggersRef = useRef(new Set());

  // Keep onFinished callback fresh without causing re-runs
  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  const isMuted = volumes.master === 0 || volumes.narration === 0;

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
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
    utteranceRef.current = null;
  }, []);

  const handleFinish = useCallback(() => {
    setNarratorState('finished');
    if (onFinishedRef.current) {
      onFinishedRef.current();
    }
  }, []);

  const skip = useCallback(() => {
    if (narratorState === 'narrating') {
      stopNarration();
      setDisplayedText(fullText);
      handleFinish();
    }
  }, [narratorState, fullText, stopNarration, handleFinish]);

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
      narrationEnabled &&
      !isMuted &&
      'speechSynthesis' in window &&
      voices.length > 0;

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

    // --- Speech Synthesis Logic ---
    if (isSpeechActive) {
      const utterance = new SpeechSynthesisUtterance(fullText);
      utteranceRef.current = utterance;

      const voicePrefs = voiceMap[speakerKey] || voiceMap['narrator'];

      utterance.pitch = voicePrefs.pitch || 1;
      utterance.rate = voicePrefs.rate || 1;
      utterance.volume = volumes.narration * volumes.master;

      let voice = findVoice(voices, voicePrefs);
      if (!voice) {
        voice = voices.find((v) => v.lang.startsWith('en'));
      }
      if (voice) utterance.voice = voice;

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          let endIndex = event.charIndex + event.charLength;
          while (
            endIndex < fullText.length &&
            !/[a-zA-Z0-9\u00C0-\u017F]/.test(fullText[endIndex])
          ) {
            endIndex++;
          }
          const spokenText = fullText.substring(0, endIndex);
          setDisplayedText(spokenText);
          triggerSfxIfNeeded(spokenText);
        }
      };

      utterance.onend = () => {
        if (utteranceRef.current === utterance) {
          // Ensure it's not a stale event
          setDisplayedText(fullText);
          handleFinish();
        }
      };

      setDisplayedText('');
      speechSynthesis.speak(utterance);
    } else {
      // --- Typewriter Logic ---
      let charIndex = 0;
      const typewriterSpeed = 40;
      typewriterIntervalRef.current = window.setInterval(() => {
        if (charIndex < fullText.length) {
          const currentText = fullText.substring(0, charIndex + 1);
          setDisplayedText(currentText);
          triggerSfxIfNeeded(currentText);
          charIndex++;
        } else {
          clearInterval(typewriterIntervalRef.current);
          typewriterIntervalRef.current = null;
          handleFinish();
        }
      }, typewriterSpeed);
    }

    return () => stopNarration();
  }, [
    node,
    fullText,
    isReady,
    isMuted,
    voices,
    stopNarration,
    onAmbientSfx,
    volumes,
    speakerKey,
    handleFinish,
    narrationEnabled,
  ]);

  return { displayedText, narratorState, skip };
};
