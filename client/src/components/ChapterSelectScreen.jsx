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
    <div className='selection-screen-container'>
      <div className='selection-screen-header'>
        <h1 className='selection-screen-title'>{storyDetails.title}</h1>
        <p className='selection-screen-subtitle'>Select a Chapter</p>
      </div>
      <div className='chapter-list'>
        {chapters.map(([key, details]) => {
          const isUnlocked = details.number <= unlockedChapter;
          return (
            <div
              key={key}
              className={`chapter-item ${!isUnlocked ? 'disabled' : ''}`}
              onClick={() => isUnlocked && onSelect(key)}
              role='button'
              tabIndex={isUnlocked ? '0' : '-1'}
              aria-label={
                isUnlocked
                  ? `Select Chapter ${details.number}: ${details.title}`
                  : `Chapter ${details.number} locked`
              }>
              <div className='chapter-item-header'>
                <h2 className='chapter-item-title'>
                  Chapter {details.number}: {details.title}
                </h2>
                {!isUnlocked && <Lock className='lock-icon' size={20} />}
              </div>
              <p className='chapter-item-flavor-text'>{details.flavorText}</p>
              {isUnlocked && (
                <span className='chapter-item-cta'>► Play Chapter</span>
              )}
            </div>
          );
        })}
      </div>
      <button className='menu-button back-button' onClick={onBack}>
        Back to Stories
      </button>
    </div>
  );
};
