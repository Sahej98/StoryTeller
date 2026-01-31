import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, DownloadCloud } from 'lucide-react';

export const VoicePackGate = ({ onInstalled }) => {
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleInstall = () => {
    setStatus('loading');
    // This is the key part: triggering getVoices() makes the browser load them.
    // It's often asynchronous, especially on mobile.
    const getVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setStatus('success');
        setTimeout(() => onInstalled(voices), 1000); // Give a moment for visual feedback
      } else {
        // Fallback for browsers that don't fire onvoiceschanged or are slow
        setTimeout(getVoices, 100);
      }
    };

    // The 'onvoiceschanged' event is the most reliable way to know when voices are ready.
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = getVoices;
    }

    // Immediately try to get them, in case they're already loaded.
    getVoices();
  };

  return (
    <div className='fullscreen-gate-container' style={{ zIndex: 1500 }}>
      <Languages size={64} />
      <h2 className='fullscreen-gate-title'>Voice Pack Installation</h2>
      <p className='fullscreen-gate-text'>
        To ensure a fully immersive experience with character narration, please
        install the required voice pack. This is a one-time setup for your
        browser.
      </p>
      <div className='fullscreen-gate-actions'>
        <button
          className='fullscreen-gate-button'
          onClick={handleInstall}
          disabled={status !== 'idle'}>
          <DownloadCloud size={20} />
          {status === 'idle' && 'Install Voice Pack'}
          {status === 'loading' && 'Installing...'}
          {status === 'success' && 'Installation Complete!'}
        </button>
      </div>
      <p className='fullscreen-gate-instructions'>
        This allows the game to access your device's built-in text-to-speech
        capabilities for narration.
      </p>
    </div>
  );
};
