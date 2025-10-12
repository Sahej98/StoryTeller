import React from 'react';

export const CautionScreen = ({ onProceed }) => (
  <div className='caution-screen'>
    <div className='caution-box'>
      <h2 className='caution-title'>WARNING</h2>
      <p className='caution-text'>
        This story is intended for mature audiences and contains scenes of
        graphic violence, blood, torture, and intense psychological horror.
      </p>
      <p className='caution-text'>Player discretion is advised.</p>
      <button className='proceed-button' onClick={onProceed}>
        Proceed
      </button>
    </div>
  </div>
);
