import React from 'react';

export const StartScreen = ({ onStart, onLoad, hasSaveData }) => (
  <div className='start-screen-container'>
    <h1>The Asylum</h1>
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      <button className='start-button' onClick={onStart}>
        New Game
      </button>
      {hasSaveData && (
        <button className='load-button' onClick={onLoad}>
          Load Game
        </button>
      )}
    </div>
  </div>
);
