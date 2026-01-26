import React from 'react';

export const LoadingScreen = ({ text = 'Loading...' }) => (
  <div className='loading-screen-container'>
    <img
      src='/images/logo.png'
      alt='Storyteller Logo'
      className='loading-logo'
    />
    <h2 className='loading-title'>Storyteller</h2>
    <p className='loading-text'>{text}</p>
  </div>
);
