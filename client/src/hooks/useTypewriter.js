
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

  if (preferences.lang) {
    const langCode = preferences.lang.split('-')[0];
    const langVoices = voices.filter((v) => v.lang.startsWith(langCode));

    if (langVoices.length > 0) {
      if (nameList.length > 0) {
        for (const name of nameList) {
          const found = langVoices.find((v) => v.name.includes(name));
          if (found) return found;
        }
      }
      return langVoices[0];
    }
  }

  if (nameList.length > 0) {
    for (const name of nameList) {
      const found = voices.find((v) => v.name.includes(name));
      if (found) return found;
    }
  }

  return null;
};

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

    // If narration is DISABLED, trigger all SFX immediately at start of dialogue
    // This allows sound design to work even for players who prefer reading speed
    if (!narrationEnabled || isMuted) {
      if (node.ambientSfx && onAmbientSfx) {
        node.ambientSfx.forEach(trigger => {
          // Simple check if word exists in text
          if (fullText.includes(trigger.triggerWord)) {
            onAmbientSfx(trigger.sfx);
          }
        });
      }
    }

    const voicePrefs = voiceMap ? (voiceMap[speakerKey] || voiceMap['narrator']) : null;
    let voice = findVoice(voices, voicePrefs);

    let canSpeak = narrationEnabled && !isMuted && 'speechSynthesis' in window && voices.length > 0 && !!voice;

    if (canSpeak && voicePrefs?.lang && !voice.lang.startsWith(voicePrefs.lang.split('-')[0])) {
      canSpeak = false;
    }

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
          let endIndex = event.charIndex + event.charLength;
          while (endIndex < fullText.length && /[.,!?;:"')\]}]/.test(fullText[endIndex])) {
            endIndex++;
          }

          const spokenText = fullText.substring(0, endIndex);
          setDisplayedText(spokenText);
          // Only trigger timed SFX if speaking, otherwise we did it at start
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
      // Typewriter Mode (No Audio)
      const lineLanguage = voicePrefs?.lang ? voicePrefs.lang.split('-')[0] : 'en';

      if (!('Segmenter' in Intl)) {
        let i = 0;
        const typewriterSpeed = 30 - volumes.textSpeed * 25; // Faster for read-only
        typewriterIntervalRef.current = setInterval(() => {
          if (i < fullText.length) {
            setDisplayedText(fullText.substring(0, i + 1));
            i++;
          } else {
            clearInterval(typewriterIntervalRef.current);
            handleFinish();
          }
        }, Math.max(5, typewriterSpeed));
        return;
      }

      try {
        const segmenter = new Intl.Segmenter(lineLanguage, { granularity: 'grapheme' });
        const graphemes = [...segmenter.segment(fullText)].map(s => s.segment);
        let graphemeIndex = 0;
        const typewriterSpeed = 30 - volumes.textSpeed * 25;

        typewriterIntervalRef.current = window.setInterval(() => {
          if (graphemeIndex < graphemes.length) {
            const currentText = graphemes.slice(0, graphemeIndex + 1).join('');
            setDisplayedText(currentText);
            // No SFX trigger here because we did it at the start for non-narration
            graphemeIndex++;
          } else {
            clearInterval(typewriterIntervalRef.current);
            typewriterIntervalRef.current = null;
            handleFinish();
          }
        }, Math.max(5, typewriterSpeed));
      } catch (e) {
        console.error("Typewriter error:", e);
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
