import React from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Volume2,
  Headphones,
  Monitor,
  Power,
  LogOut,
  Save,
  RotateCcw,
  Keyboard,
  AlertTriangle,
  Film,
  Signal,
  Trash2,
  Database,
  Type,
} from 'lucide-react';
import { KeybindInput } from './KeybindInput.jsx';

const VolumeSlider = ({ label, value, onChange, icon }) => {
  const Icon = icon;
  const percentage = value * 100;
  return (
    <div className='settings-row'>
      <label htmlFor={`volume-${label}`}>
        <Icon size={18} />
        {label}
      </label>
      <div className='slider-container'>
        <input
          id={`volume-${label}`}
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={value}
          onChange={onChange}
          aria-label={`${label} volume`}
          style={{ '--value': `${percentage}%` }}
        />
        <span>{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

const ToggleSwitch = ({
  label,
  checked,
  onChange,
  icon,
  disabled = false,
  disabledText = '',
}) => {
  const Icon = icon;
  return (
    <div className='settings-row' title={disabled ? disabledText : ''}>
      <label
        htmlFor={`toggle-${label}`}
        style={{
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}>
        <Icon size={18} />
        {label}
      </label>
      <label className='switch'>
        <input
          id={`toggle-${label}`}
          type='checkbox'
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span
          className='slider round'
          style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}></span>
      </label>
    </div>
  );
};

export const SettingsModal = ({
  onClose,
  settings,
  onSettingsChange,
  onSaveSettings,
  onBindingChange,
  onSave,
  onRestart,
  onLogout,
  onDeleteAccount,
  showAlert,
  context = 'game',
}) => {
  const handleKeybindChange = (action, newKey) => {
    const newKeybindings = { ...settings.keybindings, [action]: newKey };
    onSettingsChange('keybindings', newKeybindings);
  };

  const handleClearCache = () => {
    showAlert(
      'This will remove all downloaded story content and guest progress from your browser. Your account, settings, and cloud saves will not be affected. Are you sure you want to continue?',
      'error',
      'Confirm Cache Deletion',
      () => {
        let clearedCount = 0;
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (
            key &&
            (key.startsWith('storyteller_data_cache_') ||
              key.startsWith('storyteller_save_'))
          ) {
            keysToRemove.push(key);
          }
        }

        keysToRemove.forEach((key) => {
          localStorage.removeItem(key);
          clearedCount++;
        });

        showAlert(
          `Successfully cleared ${clearedCount} cached items. The page will now reload.`,
          'success',
          'Cache Cleared',
          () => window.location.reload(),
        );
      },
    );
  };

  const keybindLabels = {
    continue: 'Continue Dialogue',
    choice1: 'Choice 1',
    choice2: 'Choice 2',
    choice3: 'Choice 3',
    choice4: 'Choice 4',
    openInventory: 'Inventory',
    openJournal: 'Journal',
    toggleSettings: 'Settings',
    saveGame: 'Quick Save',
  };

  return (
    <motion.div
      className='modal-overlay settings-modal-overlay'
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <motion.div
        className={`modal-panel settings-modal-panel context-${context}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 250 }}>
        <div className='settings-modal-header'>
          <h2>Settings</h2>
          <button
            className='settings-modal-close'
            onClick={onClose}
            aria-label='Close settings'>
            <X size={24} />
          </button>
        </div>
        <div className='settings-modal-content grid-layout'>
          <div className='settings-section'>
            <h3>
              <Headphones size={16} /> Audio
            </h3>
            <VolumeSlider
              label='Master Volume'
              icon={Volume2}
              value={settings.master}
              onChange={(e) =>
                onSettingsChange('master', parseFloat(e.target.value))
              }
            />
            <VolumeSlider
              label='Music'
              icon={Volume2}
              value={settings.bgm}
              onChange={(e) =>
                onSettingsChange('bgm', parseFloat(e.target.value))
              }
            />
            <VolumeSlider
              label='Sound Effects'
              icon={Volume2}
              value={settings.sfx}
              onChange={(e) =>
                onSettingsChange('sfx', parseFloat(e.target.value))
              }
            />
          </div>
          <div className='settings-section'>
            <h3>
              <Monitor size={16} /> Display & Gameplay
            </h3>
            <ToggleSwitch
              icon={Monitor}
              label='Screen Shake'
              checked={settings.screenShakeEnabled}
              onChange={(e) =>
                onSettingsChange('screenShakeEnabled', e.target.checked)
              }
            />
            <ToggleSwitch
              icon={Film}
              label='Film Grain'
              checked={settings.filmGrainEnabled}
              onChange={(e) =>
                onSettingsChange('filmGrainEnabled', e.target.checked)
              }
            />
            <ToggleSwitch
              icon={Type}
              label='Typewriter Sound'
              checked={settings.typewriterSfxEnabled}
              onChange={(e) =>
                onSettingsChange('typewriterSfxEnabled', e.target.checked)
              }
            />
            <ToggleSwitch
              icon={Signal}
              label='Scan Lines'
              checked={settings.scanLinesEnabled}
              onChange={(e) =>
                onSettingsChange('scanLinesEnabled', e.target.checked)
              }
            />
            <VolumeSlider
              label='Text Speed'
              icon={Power}
              value={settings.textSpeed}
              onChange={(e) =>
                onSettingsChange('textSpeed', parseFloat(e.target.value))
              }
            />
          </div>
          <div className='settings-section full-width'>
            <h3>
              <Keyboard size={16} /> Key Bindings
            </h3>
            {Object.entries(settings.keybindings).map(([action, key]) => (
              <KeybindInput
                key={action}
                label={keybindLabels[action] || action}
                value={key}
                onChange={(newKey) => handleKeybindChange(action, newKey)}
                onBindingChange={onBindingChange}
              />
            ))}
          </div>

          <div className='settings-section full-width'>
            <h3>
              <Database size={16} /> Data Management
            </h3>
            <div className='settings-row'>
              <label>Clear Cached Story Data</label>
              <button
                className='themed-button danger'
                onClick={handleClearCache}>
                <Trash2 size={16} /> Clear Cache
              </button>
            </div>
            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--secondary-text-color)',
                marginTop: '-0.5rem',
              }}>
              This removes downloaded story content and guest progress from your
              browser. Your account and settings are not affected.
            </p>
          </div>

          {onDeleteAccount && (
            <div className='settings-section full-width'>
              <h3>
                <AlertTriangle size={16} /> Danger Zone
              </h3>
              <div className='settings-row'>
                <label>Delete Account</label>
                <button
                  className='themed-button danger'
                  onClick={onDeleteAccount}>
                  Delete My Account
                </button>
              </div>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--secondary-text-color)',
                  marginTop: '-0.5rem',
                }}>
                This action is irreversible. All your save data will be
                permanently lost.
              </p>
            </div>
          )}
        </div>
        <div className='settings-modal-actions'>
          <button
            className='themed-button primary mobile-icon-only'
            onClick={onSaveSettings}>
            <Save size={16} /> <span>Save Settings</span>
          </button>
          <div style={{ flex: 1 }}></div> {/* Spacer */}
          {onSave && (
            <button
              className='themed-button secondary mobile-icon-only'
              onClick={onSave}>
              <Save size={16} /> <span>Save Game</span>
            </button>
          )}
          {onRestart && (
            <button
              className='themed-button secondary mobile-icon-only'
              onClick={onRestart}>
              <RotateCcw size={16} /> <span>Restart Story</span>
            </button>
          )}
          {onLogout && (
            <button
              className='themed-button danger mobile-icon-only'
              onClick={onLogout}>
              <LogOut size={16} /> <span>Logout</span>
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
