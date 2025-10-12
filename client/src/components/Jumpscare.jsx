import React from 'react';
import { characters } from '../stories/the_asylum/index.js';

export const Jumpscare = () => (
  <div className='jumpscare-overlay' aria-live='assertive'>
    <img
      src={characters.ghost.sprite}
      className='jumpscare-sprite'
      alt='A horrifying ghost appears suddenly'
    />
  </div>
);
