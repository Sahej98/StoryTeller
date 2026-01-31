import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit3, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const StorySelectScreen = ({
  onSelect,
  onBack,
  stories,
  currentUser,
  onEdit,
  onDelete,
  showAlert,
  isMobile,
}) => {
  const storyList = stories || [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isAdmin = currentUser?.role === 'admin';

  if (storyList.length === 0) {
    return (
      <div className='story-select-container-themed'>
        <div className='story-select-vignette'></div>
        <header className='story-select-header'>
          <button className='themed-button secondary' onClick={onBack}>
            <ChevronLeft size={20} /> Back
          </button>
        </header>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            zIndex: 2,
          }}>
          <h1 className='selection-screen-title'>The Library is Empty</h1>
          {isAdmin ? (
            <p>Create a new story to begin.</p>
          ) : (
            <p>No stories are available at this time.</p>
          )}
        </div>
      </div>
    );
  }

  const selectedStory = storyList[selectedIndex];
  const isAuthor =
    isAdmin &&
    (!selectedStory.author || selectedStory.author === currentUser.id);

  const changeStory = (dir) => {
    setDirection(dir);
    let nextIndex = selectedIndex + dir;
    if (nextIndex < 0) {
      nextIndex = storyList.length - 1;
    } else if (nextIndex >= storyList.length) {
      nextIndex = 0;
    }
    setSelectedIndex(nextIndex);
  };

  const bookVariants = {
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

  const handleDelete = (e, storyId, storyTitle) => {
    e.stopPropagation();
    showAlert(
      `Are you sure you want to permanently delete "${storyTitle}"?`,
      'error',
      'Confirm Deletion',
      () => {
        onDelete(storyId);
        if (selectedIndex >= storyList.length - 1 && selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
        }
      },
    );
  };

  return (
    <div className='story-select-container-themed'>
      <div className='story-select-vignette'></div>

      <header className='story-select-header'>
        <button className='themed-button secondary' onClick={onBack}>
          <ChevronLeft size={16} /> Back to Menu
        </button>
      </header>

      <main className='story-select-main-themed'>
        <div className='story-carousel-container'>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={selectedIndex}
              className='story-book'
              custom={direction}
              variants={bookVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              style={{ backgroundImage: `url(${selectedStory.thumbnail})` }}>
              <div className='story-book-spine'></div>
              <div className='story-book-pages-side'></div>
              <div className='story-book-pages-top'></div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className='story-select-nav left'
          onClick={() => changeStory(-1)}>
          <ChevronLeft size={48} />
        </button>
        <button
          className='story-select-nav right'
          onClick={() => changeStory(1)}>
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
              {selectedStory.title}
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode='wait'>
            <motion.p
              key={`${selectedIndex}-desc`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1, duration: 0.3 }}>
              {selectedStory.description}
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
              onClick={() => onSelect(selectedStory.id)}>
              Begin Story
            </button>
            {isAuthor && (
              <div className='story-card-admin-actions-themed'>
                <button
                  className='themed-button secondary'
                  onClick={(e) => onEdit(selectedStory)}
                  disabled={isMobile}
                  title={
                    isMobile
                      ? 'Story Editor is not available on mobile devices.'
                      : 'Edit Story'
                  }>
                  <Edit3 size={16} />
                </button>
                <button
                  className='themed-button danger'
                  onClick={(e) =>
                    handleDelete(e, selectedStory.id, selectedStory.title)
                  }>
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};
