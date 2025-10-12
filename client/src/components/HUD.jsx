import React from 'react';
import { BrainCircuit, Heart, Wind, Backpack } from 'lucide-react';

const StatDisplay = ({ label, value, icon, isPulsing }) => {
  const IconComponent = icon;
  return (
    <div className='stat-display' aria-label={`${label}: ${value}`}>
      <IconComponent
        className={`icon ${isPulsing ? 'low-sanity-pulse' : ''}`}
        size={24}
      />
      <span>{value}</span>
    </div>
  );
};

const InventoryDisplay = ({ onClick, count }) => (
  <div
    className='inventory-display'
    onClick={onClick}
    role='button'
    tabIndex='0'
    aria-label={`Open inventory, ${count} items`}>
    <Backpack className='icon' size={28} />
    <span>{count}</span>
  </div>
);

export const HUD = ({ stats, onInventoryClick, inventoryCount }) => {
  const isLowSanity = stats.sanity < 40;
  return (
    <div className='hud-container'>
      <StatDisplay label='Health' value={stats.health} icon={Heart} />
      <StatDisplay
        label='Sanity'
        value={stats.sanity}
        icon={BrainCircuit}
        isPulsing={isLowSanity}
      />
      <StatDisplay label='Stamina' value={stats.stamina} icon={Wind} />
      <InventoryDisplay onClick={onInventoryClick} count={inventoryCount} />
    </div>
  );
};
