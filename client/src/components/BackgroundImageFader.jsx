import React, { useState, useEffect } from 'react';

const BackgroundLayer = ({ imageUrl, isActive }) => (
  <div
    className={`background-layer ${isActive ? 'active' : ''}`}
    style={{ backgroundImage: imageUrl ? `url('${imageUrl}')` : 'none' }}
  />
);

export const BackgroundImageFader = ({ imageUrl }) => {
  const [urls, setUrls] = useState([null, null]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (imageUrl !== urls[activeIndex]) {
      const nextIndex = (activeIndex + 1) % 2;
      const newUrls = [...urls];
      newUrls[nextIndex] = imageUrl;
      setUrls(newUrls);
      setActiveIndex(nextIndex);
    }
  }, [imageUrl, urls, activeIndex]);

  return (
    <>
      <BackgroundLayer
        key={0}
        imageUrl={urls[0]}
        isActive={activeIndex === 0}
      />
      <BackgroundLayer
        key={1}
        imageUrl={urls[1]}
        isActive={activeIndex === 1}
      />
    </>
  );
};
