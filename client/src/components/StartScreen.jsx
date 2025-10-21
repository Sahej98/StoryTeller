import React from 'react';
import { Logo } from './Logo.jsx';

export const StartScreen = ({ onNewGame, onLoad, hasSaveData }) => (
  <div className='start-screen-container'>
    <div className='start-screen-content'>
      <Logo />
      <h1 className='start-screen-title'>Storyteller</h1>
      <p className='start-screen-tagline'>Your adventure awaits.</p>
      <div className='start-screen-buttons'>
        <button className='menu-button primary' onClick={onNewGame}>
          New Story
        </button>
        {hasSaveData && (
          <button className='menu-button' onClick={onLoad}>
            Continue
          </button>
        )}
      </div>
    </div>
    <div className='start-screen-vignette'></div>
  </div>
);
