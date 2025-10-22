import React from 'react';

export const StatCircle = ({ label, value, icon: Icon, isPulsing, theme }) => {
  const radius = 22; // Adjusted for padding
  const circumference = 2 * Math.PI * radius;
  // Prevent negative offset for values > 100, and ensure 0 for value 0
  const safeValue = Math.max(0, Math.min(100, value));
  const offset = circumference - (safeValue / 100) * circumference;

  const pulsateClass = isPulsing ? 'low-sanity-pulse' : '';

  return (
    <div className='stat-circle-wrapper' aria-label={`${label}: ${value}`}>
      <div className={`stat-circle-display theme-${theme} ${pulsateClass}`}>
        <svg
          className='stat-circle-svg'
          width='52'
          height='52'
          viewBox='0 0 52 52'>
          <circle
            className='stat-circle-bg'
            strokeWidth='4'
            fill='transparent'
            r={radius}
            cx='26'
            cy='26'
          />
          <circle
            className='stat-circle-progress'
            strokeWidth='4'
            fill='transparent'
            r={radius}
            cx='26'
            cy='26'
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
