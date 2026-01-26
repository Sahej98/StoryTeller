import React, { useState, useEffect, useCallback } from 'react';
import { Maximize, Smartphone, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FullscreenGate = ({ children }) => {
  const [isGateActive, setIsGateActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const checkDeviceAndMode = useCallback(() => {
    const mobileCheck = /Mobi/i.test(window.navigator.userAgent);
    setIsMobile(mobileCheck);

    const pwaCheck =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone;
    const fullscreenCheck = !!document.fullscreenElement;

    if (mobileCheck) {
      setIsGateActive(!pwaCheck);
    } else {
      setIsGateActive(!fullscreenCheck);
    }
  }, []);

  useEffect(() => {
    checkDeviceAndMode();
    const handleFullscreenChange = () => checkDeviceAndMode();
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    const handleResize = () => checkDeviceAndMode();
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('resize', handleResize);
    };
  }, [checkDeviceAndMode]);

  const requestFullscreen = () => {
    document.documentElement.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`,
      );
    });
  };

  const handleInstallClick = async () => {
    if (!installPromptEvent) {
      return;
    }
    installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    setInstallPromptEvent(null);
  };

  const GateContent = isMobile ? (
    <div className='fullscreen-gate-container'>
      <Smartphone size={64} />
      <h2 className='fullscreen-gate-title'>A Better Experience Awaits</h2>
      <p className='fullscreen-gate-text'>
        For a truly immersive story, install this application to your home
        screen. It enables fullscreen, offline access, and a better performance.
      </p>
      <p className='fullscreen-gate-instructions'>
        <strong>On iOS:</strong> Tap the 'Share' icon and then 'Add to Home
        Screen'.
        <br />
        <strong>On Android:</strong> Tap the menu icon (⋮) and then 'Install
        App' or 'Add to Home Screen'.
      </p>
    </div>
  ) : (
    <div className='fullscreen-gate-container'>
      <Maximize size={64} />
      <h2 className='fullscreen-gate-title'>Enter Immersive Mode</h2>
      <p className='fullscreen-gate-text'>
        This experience is designed to be played in fullscreen to eliminate
        distractions and draw you into the story.
      </p>
      <div className='fullscreen-gate-actions'>
        <button className='fullscreen-gate-button' onClick={requestFullscreen}>
          <Maximize size={20} /> Enter Fullscreen
        </button>
        {installPromptEvent && (
          <button
            className='fullscreen-gate-button secondary'
            onClick={handleInstallClick}>
            <Download size={20} /> Install App
          </button>
        )}
      </div>
      <p className='fullscreen-gate-instructions'>
        You can press F11 or Esc to exit at any time.
      </p>
    </div>
  );

  return (
    <>
      {children}
      <AnimatePresence>
        {isGateActive && (
          <motion.div
            key='fullscreen-gate'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            {GateContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
