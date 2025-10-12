import React from 'react';

export const DeathScreen = ({ onRestart }) => (
  <div className='to-be-continued-screen'>
    <h2 style={{ color: '#8a0303', textShadow: '0 0 10px #8a0303' }}>
      You Died
    </h2>
    <button className='main-menu-button' onClick={onRestart}>
      Try Again
    </button>
  </div>
);
