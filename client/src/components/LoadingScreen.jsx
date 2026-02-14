import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLAVOR_TEXTS = [
  'Consulting the archives of the forgotten...',
  'Whispers are gathering in the dark...',
  'Inking the pages of your destiny...',
  'Characters are assuming their positions...',
  'Calibrating the weight of your choices...',
  'Distilling the essence of madness...',
  'Sharpening the scalpels of fate...',
  'Igniting the lamps of the library...',
  'Binding the threads of the narrative...',
  'Stitching together the tapestry of truth...',
  'Listening to the echoes of the past...',
  'Preparing the stage for your story...',
  'Sweeping the dust from broken memories...',
  'Unlocking the cages of the mind...',
  'Feeding the ink-wells with shadow...',
  'Counting the heartbeats in the walls...',
  'Organizing the chaos of the void...',
  'Tuning the frequencies of the unseen...',
  'Polishing the mirrors of reflection...',
  'Mending the frayed edges of reality...',
  'Sorting the bones of old stories...',
  'Lighting the way through the fog...',
];

const SYSTEM_MESSAGES = [
  'LINKING_NEURAL_PATHWAY...',
  'BUFFERING_SENSORY_DATA...',
  'SYNCING_WORLD_STATE_v4.2...',
  'ESTABLISHING_TEMPORAL_ANCHOR...',
  'LOADING_ATMOSPHERE_ASSETS...',
  'RECONSTRUCTING_FRAGMENTS...',
  'VALIDATING_USER_IDENTITY...',
];

const CRITICAL_ASSETS = [
  '/images/logo.png',
  '/images/story_teller.jpg',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop',
  'https://www.transparenttextures.com/patterns/old-wall.png',
  'https://www.transparenttextures.com/patterns/paper-fibers.png',
];

const Mote = ({ delay }) => {
  const size = useMemo(() => Math.random() * 4 + 1, []);
  const left = useMemo(() => Math.random() * 100, []);
  const duration = useMemo(() => Math.random() * 10 + 10, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: '110vh', x: 0 }}
      animate={{
        opacity: [0, 0.4, 0],
        y: '-10vh',
        x: [0, Math.random() * 50 - 25, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        position: 'absolute',
        left: `${left}%`,
        width: size,
        height: size,
        backgroundColor: '#ffab40',
        borderRadius: '50%',
        filter: 'blur(1px)',
        zIndex: 1,
      }}
    />
  );
};

export const LoadingScreen = ({ text }) => {
  const [flavorIndex, setFlavorIndex] = useState(() =>
    Math.floor(Math.random() * FLAVOR_TEXTS.length),
  );
  const [sysIndex, setSysIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  useEffect(() => {
    // Actual asset preloading
    let loadedCount = 0;
    const totalAssets = CRITICAL_ASSETS.length;

    const preload = () => {
      CRITICAL_ASSETS.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          const p = (loadedCount / totalAssets) * 100;
          // Don't jump backward if simulated progress is higher
          setProgress((prev) => Math.max(prev, Math.round(p)));
          if (loadedCount === totalAssets) {
            setIsAssetsLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++; // Count as "done" even if failed to keep loading moving
          if (loadedCount === totalAssets) setIsAssetsLoaded(true);
        };
      });
    };

    preload();

    // Cycle flavor texts automatically
    const textInterval = setInterval(() => {
      setFlavorIndex((prev) => (prev + 1) % FLAVOR_TEXTS.length);
    }, 4500);

    // Cycle system messages faster
    const sysInterval = setInterval(() => {
      setSysIndex((prev) => (prev + 1) % SYSTEM_MESSAGES.length);
    }, 1200);

    // Simulated "Smooth" progress if assets load too fast
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        // Jittery progress for "realism"
        const jump =
          Math.random() > 0.7 ? Math.random() * 5 : Math.random() * 1;
        return Math.min(99, prev + jump);
      });
    }, 300);

    return () => {
      clearInterval(textInterval);
      clearInterval(sysInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const handleReroll = () => {
    let next = Math.floor(Math.random() * FLAVOR_TEXTS.length);
    if (next === flavorIndex) next = (next + 1) % FLAVOR_TEXTS.length;
    setFlavorIndex(next);
  };

  return (
    <div
      className='loading-screen-container'
      style={{ position: 'relative', overflow: 'hidden' }}>
      {[...Array(20)].map((_, i) => (
        <Mote key={i} delay={i * 0.8} />
      ))}

      <div className='loading-vignette' />
      <div className='loading-grain' />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <div className='loading-logo-container'>
          <img
            src='/images/logo.png'
            alt='Storyteller Logo'
            className='loading-logo'
          />
        </div>

        <h2 className='loading-title'>Storyteller</h2>

        <div className='loading-progress-outer'>
          <div className='loading-progress-label'>
            <span>MANIFESTING ASSETS</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className='loading-progress-container'>
            <motion.div
              className='loading-progress-bar'
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
            />
          </div>
        </div>

        <div
          className='loading-text-wrapper'
          onClick={handleReroll}
          title='Click to reroll flavor text'>
          <AnimatePresence mode='wait'>
            <motion.p
              key={flavorIndex}
              className='loading-flavor-text clickable'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}>
              {FLAVOR_TEXTS[flavorIndex]}
            </motion.p>
          </AnimatePresence>

          <div className='loading-sys-box'>
            <AnimatePresence mode='wait'>
              <motion.span
                key={sysIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className='loading-status-text'>
                {SYSTEM_MESSAGES[sysIndex]}
              </motion.span>
            </AnimatePresence>
            {text && (
              <span className='loading-status-text highlight'> // {text}</span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
