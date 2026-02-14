
import { useEffect, useRef, useCallback } from 'react';

export const useSoundManager = ({
  currentNode,
  volumes,
  gameState,
  hasInteracted,
  BGM,
  SFX,
}) => {
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
      audioRef.current.volume = targetVolume;
      if (onComplete) onComplete();
      return;
    }

    const steps = duration / 20;
    const volumeStep = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    bgmFadeInterval.current = setInterval(() => {
      currentStep++;
      const newVolume = startVolume + volumeStep * currentStep;

      // Safe access inside interval
      if (audioRef.current) {
        if (currentStep >= steps) {
          audioRef.current.volume = targetVolume;
          clearInterval(bgmFadeInterval.current);
          bgmFadeInterval.current = null;
          if (onComplete) onComplete();
        } else {
          audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
        }
      } else {
        // Clean up if ref is lost
        clearInterval(bgmFadeInterval.current);
        bgmFadeInterval.current = null;
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
    if (!BGM || !SFX || !bgmAudioRef.current) return;

    const FADE_DURATION = 1000;
    const menuStates = ['auth', 'startScreen', 'storySelect', 'chapterSelect', 'userManagement', 'globalSettings'];
    const isMenuState = menuStates.includes(gameState);
    const isPlayingState = gameState === 'playing';
    const targetBgmVolume = volumes.bgm * masterVolume;

    // Handle Editor state separately - likely silence or specific editor BGM
    if (gameState === 'editor') {
      fade(bgmAudioRef, 0, FADE_DURATION, () => {
        if (bgmAudioRef.current) {
          bgmAudioRef.current.pause();
          currentBgm.current = null;
        }
      });
      return;
    }

    if (isMenuState) {
      const menuBgm = BGM.menu;
      if (currentBgm.current !== menuBgm) {
        // Transition to Menu Music
        fade(bgmAudioRef, 0, FADE_DURATION, () => {
          if (bgmAudioRef.current) {
            bgmAudioRef.current.src = menuBgm;
            currentBgm.current = menuBgm;
            bgmAudioRef.current.loop = true;
            if (hasInteracted) {
              bgmAudioRef.current.play().catch(e => console.error("Menu play failed", e));
              fade(bgmAudioRef, targetBgmVolume, FADE_DURATION);
            }
          }
        });
      } else if (!bgmFadeInterval.current && bgmAudioRef.current) {
        // Just volume adjustment if already playing
        bgmAudioRef.current.volume = targetBgmVolume;
        if (hasInteracted && bgmAudioRef.current.paused) bgmAudioRef.current.play().catch(() => { });
      }
    } else if (isPlayingState) {
      // In-Game Music Logic
      if (currentNode) {
        const newBgm = currentNode.bgm;

        if (newBgm === 'STOP') {
          // Explicit Stop
          if (currentBgm.current) {
            fade(bgmAudioRef, 0, FADE_DURATION, () => {
              if (bgmAudioRef.current) {
                bgmAudioRef.current.pause();
                bgmAudioRef.current.src = "";
                currentBgm.current = null;
              }
            });
          }
        } else if (newBgm && currentBgm.current !== newBgm) {
          // Switch Tracks
          fade(bgmAudioRef, 0, FADE_DURATION, () => {
            if (bgmAudioRef.current) {
              bgmAudioRef.current.src = newBgm;
              currentBgm.current = newBgm;
              if (hasInteracted) {
                bgmAudioRef.current.play().catch(e => console.error("Game BGM failed", e));
                fade(bgmAudioRef, targetBgmVolume, FADE_DURATION);
              }
            }
          });
        }

        // Implicit Continue: If newBgm is undefined/null/empty, we do NOT stop the music.
        // We just let it keep playing the current track.

        if (!bgmFadeInterval.current && currentBgm.current && bgmAudioRef.current) {
          // Volume adjustment (e.g. if settings changed)
          bgmAudioRef.current.volume = targetBgmVolume;
        }
      }
    } else {
      // Fallback for death screens etc. - usually silence or specific handling
      // For now, fade out
      if (currentBgm.current) {
        fade(bgmAudioRef, 0, FADE_DURATION, () => {
          if (bgmAudioRef.current) {
            bgmAudioRef.current.pause();
            currentBgm.current = null;
          }
        });
      }
    }

    // Cleanup SFX volume
    if (sfxAudioRef.current) {
      sfxAudioRef.current.volume = volumes.sfx * masterVolume;
    }

  }, [currentNode, volumes, masterVolume, gameState, fade, hasInteracted, BGM, SFX]);

  // Handle immediate one-shot SFX from node
  useEffect(() => {
    if (gameState === 'playing' && currentNode?.sfx && hasInteracted && sfxAudioRef.current) {
      // Play node SFX
      sfxAudioRef.current.src = currentNode.sfx;
      sfxAudioRef.current.volume = volumes.sfx * masterVolume;
      sfxAudioRef.current.play().catch(e => console.error("Node SFX failed", e));
    }
  }, [currentNode, gameState, hasInteracted, volumes.sfx, masterVolume]);


  const playAmbientSfx = useCallback(
    (sfxUrl, delay = 0) => {
      if (masterVolume === 0 || !hasInteracted) return;

      const playSound = () => {
        const audio = new Audio(sfxUrl);
        audio.volume = volumes.sfx * masterVolume;
        audio
          .play()
          .catch((e) => console.error('Ambient SFX failed to play.', e));

        activeAmbientSounds.current.push(audio);
        audio.onended = () => {
          activeAmbientSounds.current = activeAmbientSounds.current.filter(
            (a) => a !== audio,
          );
        };
      };

      if (delay > 0) {
        setTimeout(playSound, delay);
      } else {
        playSound();
      }
    },
    [volumes, masterVolume, hasInteracted],
  );

  const stopAllSfx = useCallback(() => {
    if (sfxAudioRef.current) {
      sfxAudioRef.current.pause();
      sfxAudioRef.current.currentTime = 0;
    }

    activeAmbientSounds.current.forEach((audio) => {
      if (audio.paused) return;
      // Quick fade out
      let vol = audio.volume;
      const fadeOut = setInterval(() => {
        vol = Math.max(0, vol - 0.1);
        // Check if audio exists and isn't garbage collected unexpectedly
        try {
          audio.volume = vol;
          if (vol <= 0) {
            audio.pause();
            clearInterval(fadeOut);
          }
        } catch (e) {
          clearInterval(fadeOut);
        }
      }, 50);
    });

    activeAmbientSounds.current = [];
  }, []);

  return { bgmAudioRef, sfxAudioRef, playAmbientSfx, stopAllSfx };
};
