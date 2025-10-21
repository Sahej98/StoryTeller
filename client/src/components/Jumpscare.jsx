import React from 'react';

export const Jumpscare = ({ isVisible, characters }) => {
  // Return null if not visible or if the required ghost character doesn't exist for the story
  if (!isVisible || !characters?.ghost) {
    return null;
  }

  return (
    <div className='jumpscare-overlay' aria-live='assertive'>
      <img
        src={characters.ghost.sprite}
        className='jumpscare-sprite'
        alt='A horrifying ghost appears suddenly'
      />
    </div>
  );
};
