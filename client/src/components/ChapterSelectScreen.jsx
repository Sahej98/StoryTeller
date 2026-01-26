import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChapterSelectScreen = ({
  storyDetails,
  thumbnail,
  unlockedChapter,
  onSelect,
  onBack,
}) => {
  const chapterList = Object.entries(storyDetails.chapters)
    .map(([key, details]) => ({
      key,
      ...details,
    }))
    .sort((a, b) => a.number - b.number);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (chapterList.length === 0) {
    return (
      <div className='story-select-container-themed'>
        <header className='story-select-header'>
          <button className='themed-button secondary' onClick={onBack}>
            <ChevronLeft size={16} /> Back to Library
          </button>
        </header>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <h1 className='selection-screen-title'>
            This story has no chapters yet.
          </h1>
        </div>
      </div>
    );
  }

  const changeChapter = (dir) => {
    setDirection(dir);
    let nextIndex = selectedIndex + dir;
    if (nextIndex < 0) {
      nextIndex = chapterList.length - 1;
    } else if (nextIndex >= chapterList.length) {
      nextIndex = 0;
    }
    setSelectedIndex(nextIndex);
  };

  const selectedChapter = chapterList[selectedIndex];
  const isUnlocked = selectedChapter.number <= unlockedChapter;

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '150%' : '-150%',
      rotateY: direction > 0 ? -70 : 70,
      scale: 0.7,
      opacity: 0,
    }),
    center: {
      x: '0%',
      scale: 1,
      rotateY: 0,
      zIndex: 2,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '150%' : '-150%',
      rotateY: direction < 0 ? -70 : 70,
      zIndex: 0,
      scale: 0.7,
      opacity: 0,
    }),
  };

  return (
    <div className='story-select-container-themed'>
      <div className='story-select-vignette'></div>

      <header className='story-select-header'>
        <button className='themed-button secondary' onClick={onBack}>
          <ChevronLeft size={16} /> Back to Library
        </button>
      </header>

      <main className='story-select-main-themed'>
        <div className='story-carousel-container'>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={selectedIndex}
              className={`chapter-card ${!isUnlocked ? 'locked' : ''}`}
              custom={direction}
              variants={cardVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              style={{ backgroundImage: `url(${thumbnail})` }}>
              {!isUnlocked && <Lock className='chapter-card-lock' size={48} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className='story-select-nav left'
          onClick={() => changeChapter(-1)}>
          <ChevronLeft size={48} />
        </button>
        <button
          className='story-select-nav right'
          onClick={() => changeChapter(1)}>
          <ChevronRight size={48} />
        </button>

        <div className='story-details-panel'>
          <AnimatePresence mode='wait'>
            <motion.h2
              key={`${selectedIndex}-title`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}>
              {selectedChapter.title}
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode='wait'>
            <motion.p
              key={`${selectedIndex}-desc`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1, duration: 0.3 }}>
              {selectedChapter.flavorText}
            </motion.p>
          </AnimatePresence>
          <motion.div
            className='story-details-actions'
            key={`${selectedIndex}-actions`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}>
            <button
              className='themed-button primary'
              onClick={() => onSelect(selectedChapter.key)}
              disabled={!isUnlocked}>
              Begin Chapter
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
