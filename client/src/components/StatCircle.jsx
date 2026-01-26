import React from 'react';

export const StatCircle = ({
  label,
  value,
  icon: Icon,
  isPulsing,
  theme,
  isUpdated,
}) => {
  const radius = 22; // Keep original radius for calculations
  const circumference = 2 * Math.PI * radius;
  // Prevent negative offset for values > 100, and ensure 0 for value 0
  const safeValue = Math.max(0, Math.min(100, value));
  const offset = circumference - (safeValue / 100) * circumference;

  const pulsateClass = isPulsing ? 'low-sanity-pulse' : '';
  const updatedClass = isUpdated ? 'updated' : '';

  return (
    <div className='stat-circle-wrapper' aria-label={`${label}: ${value}`}>
      <div
        className={`stat-circle-display theme-${theme} ${pulsateClass} ${updatedClass}`}>
        <svg
          className='stat-circle-svg'
          width='80'
          height='80'
          viewBox='0 0 80 80'>
          <circle
            className='stat-circle-bg'
            strokeWidth='4'
            fill='transparent'
            r={radius}
            cx='40'
            cy='40'
          />
          <circle
            className='stat-circle-progress'
            strokeWidth='4'
            fill='transparent'
            r={radius}
            cx='40'
            cy='40'
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        <Icon className='stat-circle-icon' size={22} />
      </div>
      <span className='stat-circle-value'>{value}</span>
    </div>
  );
};
