import React from 'react';
import {
  BrainCircuit,
  Heart,
  Wind,
  Backpack,
  BookOpen,
  Settings,
  Save,
  Scale,
} from 'lucide-react';
import { StatCircle } from './StatCircle.jsx';

export const ControlBar = ({
  theme,
  stats,
  inventoryCount,
  onInventoryClick,
  onJournalClick,
  onSettingsClick,
  onSaveClick,
}) => {
  const isLowSanity = stats.sanity < 40;

  return (
    <div className={`control-bar theme-${theme}`}>
      <div className='control-bar-section'>
        <div className='hud-stats-container'>
          <StatCircle
            label='Health'
            value={stats.health}
            icon={Heart}
            theme={theme}
          />
          <StatCircle
            label='Sanity'
            value={stats.sanity}
            icon={BrainCircuit}
            isPulsing={isLowSanity}
            theme={theme}
          />
          <StatCircle
            label='Stamina'
            value={stats.stamina}
            icon={Wind}
            theme={theme}
          />
          <StatCircle
            label='Morality'
            value={stats.morality}
            icon={Scale}
            theme={theme}
          />
        </div>
      </div>
      <div className='control-bar-section'>
        <button
          className='game-action-button'
          onClick={onInventoryClick}
          aria-label={`Open Inventory, ${inventoryCount} items`}>
          <Backpack />
          {inventoryCount > 0 && <span>{inventoryCount}</span>}
        </button>
        <button
          className='game-action-button'
          onClick={onJournalClick}
          aria-label='Open Journal'>
          <BookOpen />
        </button>
        <button
          className='game-action-button'
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
