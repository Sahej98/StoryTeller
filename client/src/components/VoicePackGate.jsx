import React, { useState } from 'react';
import { Languages, DownloadCloud, Loader, XCircle } from 'lucide-react';

export const VoicePackGate = ({ onInstalled }) => {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleInstall = () => {
    setStatus('loading');

    // This promise tries to get voices until it succeeds.
    const voicePromise = new Promise((resolve) => {
      const checkVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          resolve(voices);
        }
      };

      // This is a common trick to kickstart the voice engine on mobile.
      const utterance = new SpeechSynthesisUtterance(' ');
      utterance.volume = 0;
      utterance.rate = 5;
      window.speechSynthesis.speak(utterance);

      // The 'onvoiceschanged' event is the most reliable way to know when voices are ready.
      speechSynthesis.onvoiceschanged = checkVoices;

      // Fallback interval check for browsers that don't fire the event reliably.
      const intervalId = setInterval(() => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          clearInterval(intervalId);
          // Also clear the onvoiceschanged handler to prevent multiple resolves
          speechSynthesis.onvoiceschanged = null;
          resolve(voices);
        }
      }, 250);
    });

    // This promise will reject after 5 seconds.
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error('Voice loading timed out after 5 seconds.')),
        5000,
      );
    });

    Promise.race([voicePromise, timeoutPromise])
      .then((voices) => {
        setStatus('success');
        setTimeout(() => onInstalled(voices, true), 1000);
      })
      .catch((error) => {
        console.warn(error.message);
        setStatus('error');
        // Give user time to read the error message before proceeding.
        setTimeout(() => onInstalled([], false), 2500);
      });
  };

  let icon, buttonText, title, text;

  switch (status) {
    case 'loading':
      icon = <Loader size={20} className='animate-spin' />;
      buttonText = 'Initializing...';
      title = 'Audio System Initialization';
      text =
        "Attempting to activate your device's built-in text-to-speech engine. This may take a moment.";
      break;
    case 'success':
      icon = <DownloadCloud size={20} />;
      buttonText = 'Ready!';
      title = 'Initialization Complete';
      text = "Your device's voice pack is ready. Preparing the story...";
      break;
    case 'error':
      icon = <XCircle size={20} />;
      buttonText = 'Narration Unavailable';
      title = 'Audio System Failed';
      text =
        'Your browser or device did not provide any narration voices. The narration feature will be disabled, but the game is still fully playable.';
      break;
    default: // idle
      icon = <DownloadCloud size={20} />;
      buttonText = 'Initialize Audio';
      title = 'Audio System Initialization';
      text =
        "To enable character narration, the application needs to initialize your device's built-in text-to-speech engine. This is a one-time setup required by your browser.";
  }

  return (
    <div className='fullscreen-gate-container' style={{ zIndex: 1500 }}>
      <Languages size={64} />
      <h2 className='fullscreen-gate-title'>{title}</h2>
      <p className='fullscreen-gate-text'>{text}</p>
      <div className='fullscreen-gate-actions'>
        <button
          className='fullscreen-gate-button'
          onClick={handleInstall}
          disabled={status !== 'idle'}>
          {icon}
          {buttonText}
        </button>
      </div>
      <p className='fullscreen-gate-instructions'>
        This allows the game to access your device's built-in text-to-speech
        capabilities for narration.
      </p>
    </div>
  );
};
