import React from 'react';

export const Logo = () => (
  <svg
    width='200'
    height='200'
    viewBox='0 0 200 200'
    xmlns='http://www.w3.org/2000/svg'
    className='storyteller-logo'>
    <defs>
      <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
        <feGaussianBlur stdDeviation='3.5' result='coloredBlur' />
        <feMerge>
          <feMergeNode in='coloredBlur' />
          <feMergeNode in='SourceGraphic' />
        </feMerge>
      </filter>
      <linearGradient id='bookCover' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' style={{ stopColor: '#5a4a3a', stopOpacity: 1 }} />
        <stop offset='100%' style={{ stopColor: '#4d3d2d', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id='pageShine' x1='0%' y1='0%' x2='100%' y2='0%'>
        <stop offset='0%' style={{ stopColor: '#fff', stopOpacity: 0.5 }} />
        <stop offset='100%' style={{ stopColor: '#fff', stopOpacity: 0 }} />
      </linearGradient>
    </defs>

    {/* Book */}
    <path
      d='M100 25 C 40 25, 40 175, 100 175 C 160 175, 160 25, 100 25 Z'
      fill='url(#bookCover)'
      stroke='#3b2d1d'
      strokeWidth='4'
    />
    <path
      d='M100 25 V 175'
      stroke='#2c2115'
      strokeWidth='6'
      strokeLinecap='round'
    />
    <path
      d='M100 25 C 160 25, 160 175, 100 175'
      fill='none'
      stroke='url(#pageShine)'
      strokeWidth='2'
    />

    {/* Quill Pen */}
    <g transform='rotate(-25 100 100) translate(15, -10)'>
      <path
        d='M 120,30 Q 110,90 80,110 T 50,160'
        fill='none'
        stroke='#e0e0e0'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <path
        d='M 118,35 L 125,55 M 116,45 L 123,65 M 113,55 L 120,75 M 109,65 L 115,85'
        fill='none'
        stroke='#e0e0e0'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </g>

    {/* Magic Sparkle */}
    <g filter='url(#glow)'>
      <circle cx='75' cy='70' r='3' fill='#00c2c7' className='sparkle-1' />
      <circle cx='85' cy='120' r='2' fill='#00c2c7' className='sparkle-2' />
    </g>
  </svg>
);
