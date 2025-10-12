import React from 'react';

export const CharacterSprite = ({ sprite, name, className, isActive }) => (
    <img src={sprite} className={`character-sprite ${className} ${isActive ? 'active' : ''}`} alt={`${name} character`} />
);
