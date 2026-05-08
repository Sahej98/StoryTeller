import React from 'react';

export const Vignette = ({ sanity }) => {
  const intensity = Math.max(0, (100 - sanity) / 100);
  
  const style = {
    boxShadow: `inset 0 0 ${150 + (intensity * 100)}px rgba(0, 0, 0, ${0.8 + (intensity * 0.2)}), 
                inset 0 0 ${intensity * 120}px rgba(183, 28, 28, ${intensity * 0.6})`,
    opacity: intensity > 0 ? 1 : 0.8,
  };

  return (
    <div className="vignette" style={style}></div>
  );
};
