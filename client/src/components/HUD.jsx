import React, { useState } from 'react';
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
  Menu,
  X,
} from 'lucide-react';
import { StatCircle } from './StatCircle.jsx';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`control-bar theme-${theme}`}>
      <div className='control-bar-section stats-section'>
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
      <div className='control-bar-section actions-section'>
        <button
          className={`game-action-button toggle-button ${isExpanded ? 'active' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label='Toggle Menu'>
          {isExpanded ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className='expanded-actions'
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.2 }}>
              <button
                className='game-action-button'
                onClick={() => {
                  onHomeClick();
                  setIsExpanded(false);
                }}
                aria-label='Save and Return to Chapters'>
                <Home />
              </button>
              <button
                className='game-action-button'
                onClick={() => {
                  onInventoryClick();
                  setIsExpanded(false);
                }}
                aria-label={`Open Inventory, ${inventoryCount} items`}>
                <Backpack />
                {inventoryCount > 0 && <span>{inventoryCount}</span>}
              </button>
              <button
                className='game-action-button'
                onClick={() => {
                  onJournalClick();
                  setIsExpanded(false);
                }}
                aria-label='Open Journal'>
                <BookOpen />
              </button>
              <button
                className='game-action-button'
                onClick={() => {
                  onSaveClick();
                  setIsExpanded(false);
                }}
                aria-label='Save Game'>
                <Save />
              </button>
              <button
                className='game-action-button'
                onClick={() => {
                  onSettingsClick();
                  setIsExpanded(false);
                }}
                aria-label='Open Settings'>
                <Settings />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
