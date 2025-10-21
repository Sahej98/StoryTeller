import React from 'react';
import {
  BrainCircuit,
  Heart,
  Wind,
  Backpack,
  BookOpen,
  Settings,
  Save,
  FastForward,
} from 'lucide-react';

const StatDisplay = ({ label, value, icon, isPulsing }) => {
  const IconComponent = icon;
  return (
    <div className='stat-display' aria-label={`${label}: ${value}`}>
      <IconComponent
        className={`icon ${isPulsing ? 'low-sanity-pulse' : ''}`}
        size={20}
      />
      <span>{value}</span>
    </div>
  );
};

export const ControlBar = ({
  stats,
  inventoryCount,
  onInventoryClick,
  onJournalClick,
  onSettingsClick,
  onSaveClick,
  onSkipClick,
}) => {
  const isLowSanity = stats.sanity < 40;

  return (
    <div className='control-bar'>
      <div className='control-bar-section'>
        <div className='hud-stats'>
          <StatDisplay label='Health' value={stats.health} icon={Heart} />
          <StatDisplay
            label='Sanity'
            value={stats.sanity}
            icon={BrainCircuit}
            isPulsing={isLowSanity}
          />
          <StatDisplay label='Stamina' value={stats.stamina} icon={Wind} />
        </div>
      </div>
      <div className='control-bar-section'>
        <button
          className='game-action-button'
          onClick={onInventoryClick}
          aria-label='Open Inventory'>
          <Backpack /> <span>{inventoryCount}</span>
        </button>
        <button
          className='game-action-button'
          onClick={onJournalClick}
          aria-label='Open Journal'>
          <BookOpen />
        </button>
        <button
          className='game-action-button'
          onClick={onSkipClick}
          aria-label='Skip Text'>
          <FastForward />
        </button>
        <button
          className='game-action-button save-btn'
          onClick={onSaveClick}
          aria-label='Save Game'>
          <Save />
        </button>
        <button
          className='game-action-button'
          onClick={onSettingsClick}
          aria-label='Open Settings'>
          <Settings />
        </button>
      </div>
    </div>
  );
};
