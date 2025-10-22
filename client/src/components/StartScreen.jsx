import React from 'react';

export const StartScreen = ({
  onNewGame,
  onLoad,
  hasSaveData,
  onSettingsClick,
}) => (
  <>
    <div
      className='start-screen-background'
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1598214105267-144b574a2b3c?q=80&w=1974&auto=format&fit=crop')`,
      }}></div>
    <div className='start-screen-vignette'></div>
    <div className='start-screen-container'>
      <div className='start-screen-title-container'>
        <h1 className='start-screen-title'>Storyteller</h1>
      </div>
      <div className='start-screen-menu-container'>
        {hasSaveData && (
          <button className='start-screen-menu-item' onClick={onLoad}>
            Continue
          </button>
        )}
        <button className='start-screen-menu-item' onClick={onNewGame}>
          New Story
        </button>
        <button className='start-screen-menu-item' onClick={onSettingsClick}>
          Settings
        </button>
        <button className='start-screen-menu-item' disabled>
          Quit
        </button>
      </div>
      <div></div>
    </div>
  </>
);
