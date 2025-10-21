import React from 'react';
import { stories } from '../stories/index.js';

export const StorySelectScreen = ({ onSelect, onBack }) => {
  const storyList = Object.values(stories);

  return (
    <div className='menu-screen-container'>
      <h1 className='menu-title'>Select a Story</h1>
      <div className='card-grid'>
        {storyList.map((story) => (
          <div
            key={story.id}
            className='menu-card'
            onClick={() => onSelect(story.id)}
            role='button'
            tabIndex='0'
            aria-label={`Select story: ${story.title}`}>
            <h2 className='card-title'>{story.title}</h2>
            <p className='card-description'>{story.description}</p>
            <span className='card-cta'>Begin</span>
          </div>
        ))}
      </div>
      <button className='back-button' onClick={onBack}>
        Back
      </button>
    </div>
  );
};
