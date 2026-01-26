import React from 'react';
import {
  Home,
  Backpack,
  BookOpen,
  Settings,
  Save,
  Heart,
  BrainCircuit,
  Zap,
  Scale,
} from 'lucide-react';
import { StatCircle } from './StatCircle.jsx';

export const HUD = ({
  theme,
  playerStats,
  inventoryCount,
  onInventoryClick,
  onJournalClick,
  onSettingsClick,
  onSaveClick,
  onHomeClick,
  updatedStats = [],
}) => {
  return (
    <div className={`control-bar theme-${theme}`}>
      <div className='control-bar-section'>
        {playerStats && (
          <div className='hud-stats-container'>
            <StatCircle
              label='Health'
              value={playerStats.health}
              icon={Heart}
              theme={theme}
              isUpdated={updatedStats.includes('health')}
            />
            <StatCircle
              label='Sanity'
              value={playerStats.sanity}
              icon={BrainCircuit}
              isPulsing={playerStats.sanity < 30}
              theme={theme}
              isUpdated={updatedStats.includes('sanity')}
            />
            <StatCircle
              label='Stamina'
              value={playerStats.stamina}
              icon={Zap}
              theme={theme}
              isUpdated={updatedStats.includes('stamina')}
            />
            <StatCircle
              label='Morality'
              value={playerStats.morality}
              icon={Scale}
              theme={theme}
              isUpdated={updatedStats.includes('morality')}
            />
          </div>
        )}
      </div>
      <div className='control-bar-section'>
        <button
          className='game-action-button'
          onClick={onHomeClick}
          aria-label='Save and Return to Chapters'>
          <Home />
        </button>
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
