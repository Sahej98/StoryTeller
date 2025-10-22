import React from 'react';
import { stories } from '../stories/index.js';

export const StorySelectScreen = ({ onSelect, onBack }) => {
  const storyList = Object.values(stories);

  return (
    <div className='selection-screen-container'>
      <div className='selection-screen-header'>
        <h1 className='selection-screen-title'>Select a Story</h1>
        <p className='selection-screen-subtitle'>Your adventure awaits.</p>
      </div>
      <div className='story-card-grid'>
        {storyList.map((story) => (
          <div
            key={story.id}
            className={`story-card theme-${story.theme}`}
            onClick={() => onSelect(story.id)}
            role='button'
            tabIndex='0'
            aria-label={`Select story: ${story.title}`}>
            <div
              className='story-card-thumbnail'
              style={{ backgroundImage: `url(${story.thumbnail})` }}></div>
            <div className='story-card-overlay'>
              <h2 className='story-card-title'>{story.title}</h2>
              <p className='story-card-description'>{story.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className='menu-button back-button' onClick={onBack}>
        Back
      </button>
    </div>
  );
};
