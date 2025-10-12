import { useEffect, useRef, useCallback } from 'react';

export const useSoundManager = ({ currentNode, volumes, gameState }) => {
  const bgmAudioRef = useRef(null);
  const sfxAudioRef = useRef(null);
  const currentBgm = useRef(null);
  const activeAmbientSounds = useRef([]);
  const bgmFadeInterval = useRef(null);

  const masterVolume = volumes.master;

  const fade = useCallback((audioRef, targetVolume, duration, onComplete) => {
    if (bgmFadeInterval.current) {
      clearInterval(bgmFadeInterval.current);
    }

    if (!audioRef.current || isNaN(audioRef.current.volume)) {
      if (onComplete) onComplete();
      return;
    }

    const startVolume = audioRef.current.volume;
    if (Math.abs(startVolume - targetVolume) < 0.01) {
      if (onComplete) onComplete();
      return;
    }

    const steps = duration / 20;
    const volumeStep = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    bgmFadeInterval.current = setInterval(() => {
      currentStep++;
      const newVolume = startVolume + volumeStep * currentStep;

      if (currentStep >= steps) {
        audioRef.current.volume = targetVolume;
        clearInterval(bgmFadeInterval.current);
        bgmFadeInterval.current = null;
        if (onComplete) onComplete();
      } else {
        audioRef.current.volume = newVolume;
      }
    }, 20);
  }, []);

  useEffect(() => {
    if (bgmAudioRef.current) bgmAudioRef.current.muted = masterVolume === 0;
    if (sfxAudioRef.current) sfxAudioRef.current.muted = masterVolume === 0;

    if (masterVolume === 0) {
      speechSynthesis.cancel();
      if (bgmFadeInterval.current) {
        clearInterval(bgmFadeInterval.current);
        bgmFadeInterval.current = null;
      }
      activeAmbientSounds.current.forEach((audio) => {
        audio.pause();
      });
      activeAmbientSounds.current = [];
    }
  }, [masterVolume]);

  useEffect(() => {
    if (gameState !== 'playing') {
      if (bgmAudioRef.current && !bgmAudioRef.current.paused) {
        fade(bgmAudioRef, 0, 500, () => bgmAudioRef.current.pause());
      }
      return;
    }

    const FADE_DURATION = 1000;

    if (bgmAudioRef.current) {
      const targetBgmVolume = volumes.bgm * masterVolume;

      if (currentNode.bgm && currentBgm.current !== currentNode.bgm) {
        const newBgm = currentNode.bgm;
        currentBgm.current = newBgm;

        if (bgmAudioRef.current.src && !bgmAudioRef.current.paused) {
          fade(bgmAudioRef, 0, FADE_DURATION, () => {
            bgmAudioRef.current.src = newBgm;
            bgmAudioRef.current
              .play()
              .catch((e) => console.error('BGM play failed', e));
            fade(bgmAudioRef, targetBgmVolume, FADE_DURATION);
          });
        } else {
          bgmAudioRef.current.src = newBgm;
          bgmAudioRef.current.volume = 0;
          bgmAudioRef.current
            .play()
            .catch((e) => console.error('BGM play failed', e));
          fade(bgmAudioRef, targetBgmVolume, FADE_DURATION);
        }
      } else if (
        currentNode.hasOwnProperty('bgm') &&
        !currentNode.bgm &&
        bgmAudioRef.current.src &&
        !bgmAudioRef.current.paused
      ) {
        fade(bgmAudioRef, 0, FADE_DURATION, () => {
          bgmAudioRef.current.pause();
          bgmAudioRef.current.src = '';
          currentBgm.current = null;
        });
      } else if (!bgmFadeInterval.current) {
        bgmAudioRef.current.volume = targetBgmVolume;
      }
    }

    if (sfxAudioRef.current) {
      sfxAudioRef.current.volume = volumes.sfx * masterVolume;
      if (currentNode.sfx) {
        sfxAudioRef.current.src = currentNode.sfx;
        sfxAudioRef.current
          .play()
          .catch((e) => console.error('SFX play failed', e));
      } else {
        sfxAudioRef.current.pause();
      }
    }
  }, [currentNode, volumes, masterVolume, gameState, fade]);

  const playAmbientSfx = useCallback(
    (sfxUrl, delay = 0) => {
      if (masterVolume === 0) return;

      const playSound = () => {
        const audio = new Audio(sfxUrl);
        audio.volume = volumes.sfx * masterVolume;
        audio
          .play()
          .catch((e) => console.error('Ambient SFX failed to play.', e));

        activeAmbientSounds.current.push(audio);
        audio.onended = () => {
          activeAmbientSounds.current = activeAmbientSounds.current.filter(
            (a) => a !== audio
          );
        };
      };

      if (delay > 0) {
        setTimeout(playSound, delay);
      } else {
        playSound();
      }
    },
    [volumes, masterVolume]
  );

  const stopAllSfx = useCallback(() => {
    if (sfxAudioRef.current) {
      sfxAudioRef.current.pause();
      sfxAudioRef.current.currentTime = 0;
    }

    activeAmbientSounds.current.forEach((audio) => {
      if (audio.paused) return;
      let currentVolume = audio.volume;
      const fadeOutInterval = setInterval(() => {
        currentVolume -= 0.1;
        if (currentVolume > 0.01) {
          audio.volume = Math.max(0, currentVolume);
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(fadeOutInterval);
        }
      }, 50);
    });

    activeAmbientSounds.current = [];
  }, []);

  return { bgmAudioRef, sfxAudioRef, playAmbientSfx, stopAllSfx };
};
