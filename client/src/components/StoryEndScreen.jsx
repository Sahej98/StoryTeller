import React from 'react';
import { motion } from 'framer-motion';
import { Library } from 'lucide-react';

const defaultEnding = {
  title: 'The Story Concludes',
  description: 'Your journey has come to an end.',
  thumbnail: '/images/story_teller.jpg',
};

export const StoryEndScreen = ({ storyDetails, ending, onMainMenu }) => {
  const currentEnding = ending || defaultEnding;
  // Use the ending's specific thumbnail if available, otherwise fall back to the story's main thumbnail.
  const thumbnail = currentEnding.thumbnail || storyDetails?.thumbnail;

  return (
    <div className='story-select-container-themed'>
      <div className='story-select-vignette'></div>

      <main
        className='story-select-main-themed'
        style={{ justifyContent: 'center', paddingTop: 0, paddingBottom: 0 }}>
        <motion.div
          className='chapter-card'
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{
            backgroundImage: `url(${thumbnail})`,
            position: 'relative',
            width: '480px',
            height: '320px',
          }}>
          <div className='chapter-card-overlay'></div>
          <div className='chapter-card-content'>
            <h3
              className='chapter-card-number'
              style={{ color: 'var(--accent-color)' }}>
              Ending Achieved
            </h3>
            <h2 className='chapter-card-title'>{currentEnding.title}</h2>
          </div>
        </motion.div>

        <motion.div
          className='story-details-panel'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ marginTop: '2rem' }}>
          <p>{currentEnding.description}</p>
          <div className='story-details-actions'>
            <button className='themed-button primary' onClick={onMainMenu}>
              <Library size={16} /> Return to Library
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
