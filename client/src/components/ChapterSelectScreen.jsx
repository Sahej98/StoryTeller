import React from 'react';
import { storyDetails } from '../stories/the_asylum/index.js';
import { Lock } from 'lucide-react';

export const ChapterSelectScreen = ({ unlockedChapter, onSelect, onBack }) => {
  const chapters = Object.entries(storyDetails.chapters);

  return (
    <div className='chapter-select-container'>
      <h1 className='chapter-select-title'>Select Chapter</h1>
      <div className='chapter-grid'>
        {chapters.map(([key, details]) => {
          const isUnlocked = details.number <= unlockedChapter;
          return (
            <button
              key={key}
              className='chapter-button'
              disabled={!isUnlocked}
              onClick={() => isUnlocked && onSelect(key)}>
              <span className='chapter-button-number'>
                Chapter {details.number}
              </span>
              <span className='chapter-button-title'>{details.title}</span>
              {!isUnlocked && <Lock className='lock-icon' />}
            </button>
          );
        })}
      </div>
      <button className='back-button' onClick={onBack}>
        Main Menu
      </button>
    </div>
  );
};
