import React from 'react';

export const ToBeContinuedScreen = ({ onMainMenu }) => (
  <div className='to-be-continued-screen'>
    <h2>To be continued...</h2>
    <button className='main-menu-button' onClick={onMainMenu}>
      Return to Main Menu
    </button>
  </div>
);
