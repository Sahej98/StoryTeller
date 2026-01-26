import React, { useEffect, useRef } from 'react';

export const ChoicesModal = ({
  choices,
  onChoice,
  onRestart,
  timer,
  defaultChoiceIndex,
  isFadingOut,
}) => {
  const timerRef = useRef(null);

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setTimeout(() => {
        const defaultChoice = choices[defaultChoiceIndex] || choices[0];
        if (defaultChoice && !defaultChoice.isDisabled) {
          onChoice(defaultChoice);
        }
      }, timer * 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timer, choices, onChoice, defaultChoiceIndex]);

  const handleChoiceClick = (choice) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onChoice(choice);
  };

  const modalClasses = `choices-modal ${isFadingOut ? 'fade-out' : ''}`;

  return (
    <div className={modalClasses}>
      <div className='choices-container'>
        {choices && choices.length > 0 ? (
          choices.map((choice, index) => (
            <button
              key={index}
              className='choice-button'
              onClick={() => handleChoiceClick(choice)}
              disabled={choice.isDisabled}
              aria-label={`Choice ${index + 1}: ${choice.text}${
                choice.isDisabled ? ' (Requirement not met)' : ''
              }`}>
              <span className='choice-text'>{choice.text}</span>
              {timer > 0 && index === 0 && (
                <div
                  className='choice-timer-bar'
                  style={{ animationDuration: `${timer}s` }}></div>
              )}
            </button>
          ))
        ) : (
          <button className='restart-button' onClick={onRestart}>
            Play Again?
          </button>
        )}
      </div>
    </div>
  );
};
