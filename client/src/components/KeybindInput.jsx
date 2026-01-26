import React, { useState, useEffect, useRef } from 'react';

export const KeybindInput = ({ label, value, onChange, onBindingChange }) => {
  const [isBinding, setIsBinding] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isBinding) {
        e.preventDefault();
        e.stopPropagation();
        onChange(e.key);
        setIsBinding(false);
        onBindingChange(false);
      }
    };

    if (isBinding) {
      window.addEventListener('keydown', handleKeyDown, true);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isBinding, onChange, onBindingChange]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isBinding) {
      setIsBinding(true);
      onBindingChange(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        if (isBinding) {
          setIsBinding(false);
          onBindingChange(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBinding, onBindingChange]);

  const displayValue = value === ' ' ? 'Space' : value;

  return (
    <div className='settings-row keybind-row'>
      <label>{label}</label>
      <button ref={buttonRef} onClick={handleClick} className='keybind-button'>
        {isBinding ? 'Press any key...' : displayValue}
      </button>
    </div>
  );
};
