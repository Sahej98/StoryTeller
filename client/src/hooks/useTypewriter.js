import { useState, useEffect, useRef, useCallback } from 'react';

// Helper functions outside component
const findVoice = (voices, preferences) => {
  if (!preferences || !voices || voices.length === 0) return null;

  const getNames = (names) => {
    if (Array.isArray(names)) return names;
    if (typeof names === 'string') return names.split(',').map(n => n.trim()).filter(Boolean);
    return [];
  };

  const nameList = getNames(preferences.names);

  // 1. Try to find by language code first (loose matching, e.g., 'en-US' matches 'en')
  if (preferences.lang) {
    const langCode = preferences.lang.split('-')[0];
    const langVoices = voices.filter((v) => v.lang.startsWith(langCode));

    if (langVoices.length > 0) {
      // If names are also provided, try to find a matching name within the language-specific voices
      if (nameList.length > 0) {
        for (const name of nameList) {
          const found = langVoices.find((v) => v.name.includes(name));
          if (found) return found;
        }
      }
      // If no name matches or no names provided, return the first voice for that language
      return langVoices[0];
    }
  }

  // 2. Fallback to searching by name across all voices
  if (nameList.length > 0) {
    for (const name of nameList) {
      const found = voices.find((v) => v.name.includes(name));
      if (found) return found;
    }
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
  voiceMap,
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

    if (!isReady || !node || !fullText || !voiceMap) {
      setNarratorState('idle');
      return;
    }

    setNarratorState('narrating');

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

    const voicePrefs = voiceMap[speakerKey] || voiceMap['narrator'];
    let voice = findVoice(voices, voicePrefs);

    let canSpeak = narrationEnabled && !isMuted && 'speechSynthesis' in window && voices.length > 0 && !!voice;

    // Final check: if a language is required, but the found voice doesn't match, fall back to typewriter.
    if (canSpeak && voicePrefs?.lang && !voice.lang.startsWith(voicePrefs.lang.split('-')[0])) {
      canSpeak = false;
    }

    // --- Speech Synthesis Logic ---
    if (canSpeak) {
      const utterance = new SpeechSynthesisUtterance(fullText);
      utteranceRef.current = utterance;

      utterance.pitch = voicePrefs.pitch || 1;
      utterance.rate = voicePrefs.rate || 1;
      utterance.volume = volumes.narration * volumes.master;
      utterance.voice = voice;
      if (voicePrefs.lang) {
        utterance.lang = voicePrefs.lang;
      }

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const spokenText = fullText.substring(0, event.charIndex + event.charLength);
          setDisplayedText(spokenText);
          triggerSfxIfNeeded(spokenText);
        }
      };

      utterance.onend = () => {
        if (utteranceRef.current === utterance) {
          setDisplayedText(fullText);
          handleFinish();
        }
      };

      setDisplayedText('');
      speechSynthesis.speak(utterance);
    } else {
      // --- Typewriter Logic ---
      const lineLanguage = voicePrefs?.lang ? voicePrefs.lang.split('-')[0] : 'en';

      // Fallback for Intl.Segmenter if not supported
      if (!('Segmenter' in Intl)) {
        let i = 0;
        const typewriterSpeed = 60 - volumes.textSpeed * 50;
        typewriterIntervalRef.current = setInterval(() => {
          if (i < fullText.length) {
            setDisplayedText(fullText.substring(0, i + 1));
            i++;
          } else {
            clearInterval(typewriterIntervalRef.current);
            handleFinish();
          }
        }, typewriterSpeed);
        return;
      }

      try {
        const segmenter = new Intl.Segmenter(lineLanguage, { granularity: 'grapheme' });
        const graphemes = [...segmenter.segment(fullText)].map(s => s.segment);
        let graphemeIndex = 0;
        const typewriterSpeed = 60 - volumes.textSpeed * 50;

        typewriterIntervalRef.current = window.setInterval(() => {
          if (graphemeIndex < graphemes.length) {
            const currentText = graphemes.slice(0, graphemeIndex + 1).join('');
            setDisplayedText(currentText);
            triggerSfxIfNeeded(currentText);
            graphemeIndex++;
          } else {
            clearInterval(typewriterIntervalRef.current);
            typewriterIntervalRef.current = null;
            handleFinish();
          }
        }, typewriterSpeed);
      } catch (e) {
        console.error("Typewriter error (Intl.Segmenter failed):", e);
        // If Segmenter fails for any reason, fall back to showing full text immediately.
        setDisplayedText(fullText);
        handleFinish();
      }
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
    voiceMap,
  ]);

  return { displayedText, narratorState, skip };
};