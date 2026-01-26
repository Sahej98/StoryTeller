import React from 'react';

export const CautionScreen = ({
  onProceed,
  title = 'WARNING',
  text = 'This story contains content that may be disturbing to some players. Player discretion is advised.',
}) => (
  <div className='caution-screen'>
    <div className='caution-box'>
      <h2 className='caution-title'>{title}</h2>
      <p className='caution-text'>{text}</p>
      <button className='proceed-button' onClick={onProceed}>
        Proceed
      </button>
    </div>
  </div>
);
