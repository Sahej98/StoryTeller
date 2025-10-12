import React from 'react';

export const Vignette = ({ isLowSanity }) => (
  <div className={`vignette ${isLowSanity ? 'low-sanity' : ''}`}></div>
);
