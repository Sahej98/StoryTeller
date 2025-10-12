import React from 'react';
import { VolumeX, Volume2 } from 'lucide-react';

export const MuteButton = ({ isMuted, onToggle }) => (
  <button
    className='game-button'
    onClick={onToggle}
    aria-label={isMuted ? 'Unmute' : 'Mute'}>
    {isMuted ? <VolumeX /> : <Volume2 />}
  </button>
);
