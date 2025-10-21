import React from 'react';
import { Lock } from 'lucide-react';

export const ChapterSelectScreen = ({
  storyDetails,
  unlockedChapter,
  onSelect,
  onBack,
}) => {
  const chapters = Object.entries(storyDetails.chapters);

  return (
    <div className='menu-screen-container'>
      <h1 className='menu-title'>Select Chapter</h1>
      <div className='card-grid'>
        {chapters.map(([key, details]) => {
          const isUnlocked = details.number <= unlockedChapter;
          return (
            <div
              key={key}
              className={`menu-card ${!isUnlocked ? 'disabled' : ''}`}
              onClick={() => isUnlocked && onSelect(key)}
              role='button'
              tabIndex={isUnlocked ? '0' : '-1'}
              aria-label={
                isUnlocked
                  ? `Select Chapter ${details.number}: ${details.title}`
                  : `Chapter ${details.number} locked`
              }>
              <div className='card-header'>
                <h2 className='card-title'>
                  Chapter {details.number}: {details.title}
                </h2>
                {!isUnlocked && <Lock className='lock-icon' />}
              </div>
              <p className='card-description'>{details.description}</p>
              {isUnlocked && <span className='card-cta'>Play</span>}
            </div>
          );
        })}
      </div>
      <button className='back-button' onClick={onBack}>
        Back
      </button>
    </div>
  );
};
