import React, { useState, useEffect } from 'react';

const BackgroundLayer = ({ imageUrl, isActive }) => (
  <div
    className={`background-layer ${isActive ? 'active' : ''}`}
    style={{ backgroundImage: imageUrl ? `url('${imageUrl}')` : 'none' }}
  />
);

export const BackgroundImageFader = ({ imageUrl }) => {
  // Use a tuple to store [current, previous] image URLs
  // And an index to track which one is active
  const [urls, setUrls] = useState([imageUrl, null]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // When the imageUrl prop changes and it's different from the currently active one
    if (imageUrl !== urls[activeIndex]) {
      // The next index to use is the other one in our tuple of two layers
      const nextIndex = (activeIndex + 1) % 2;

      const newUrls = [...urls];
      newUrls[nextIndex] = imageUrl;
      setUrls(newUrls);

      // Switch the active index to trigger the CSS fade transition
      setActiveIndex(nextIndex);
    }
  }, [imageUrl, urls, activeIndex]);

  return (
    <>
      <BackgroundLayer imageUrl={urls[0]} isActive={activeIndex === 0} />
      <BackgroundLayer imageUrl={urls[1]} isActive={activeIndex === 1} />
    </>
  );
};
