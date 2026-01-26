import React, { useEffect } from 'react';

export const Jumpscare = ({ config, characters, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1000); // Duration of the longest jumpscare animation
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!config) {
    return null;
  }

  const { type, character, text, image } = config;

  const renderContent = () => {
    switch (type) {
      case 'sprite': {
        const spriteChar = characters?.[character];
        if (!spriteChar?.sprite) return null;
        return (
          <img
            src={spriteChar.sprite}
            className='jumpscare-sprite'
            alt='A horrifying figure appears suddenly'
          />
        );
      }
      case 'image':
        if (!image) return null;
        return (
          <img
            src={image}
            className='jumpscare-sprite'
            alt='A horrifying image appears suddenly'
          />
        );
      case 'text':
        return <h1 className='jumpscare-text'>{text}</h1>;
      case 'glitch':
        return <div className='jumpscare-glitch-effect'></div>;
      default:
        return null;
    }
  };

  return (
    <div className='jumpscare-overlay' aria-live='assertive'>
      {renderContent()}
    </div>
  );
};
