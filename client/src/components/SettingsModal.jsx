import React from 'react';

const VolumeSlider = ({ label, value, onChange }) => (
  <div className='volume-control'>
    <label htmlFor={`volume-${label}`}>{label}</label>
    <input
      id={`volume-${label}`}
      type='range'
      min='0'
      max='1'
      step='0.05'
      value={value}
      onChange={onChange}
      aria-label={`${label} volume`}
    />
  </div>
);

const ToggleSwitch = ({ label, checked, onChange }) => (
  <div className='settings-toggle'>
    <label htmlFor={`toggle-${label}`}>{label}</label>
    <input
      id={`toggle-${label}`}
      type='checkbox'
      role='switch'
      checked={checked}
      onChange={onChange}
    />
  </div>
);

export const SettingsModal = ({
  isVisible,
  onClose,
  settings,
  onSettingsChange,
  onSave,
  onRestart,
}) => {
  if (!isVisible) return null;

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-panel' onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>
        <ToggleSwitch
          label='Enable Narration'
          checked={settings.narrationEnabled}
          onChange={(e) =>
            onSettingsChange('narrationEnabled', e.target.checked)
          }
        />
        <VolumeSlider
          label='Master'
          value={settings.master}
          onChange={(e) =>
            onSettingsChange('master', parseFloat(e.target.value))
          }
        />
        <VolumeSlider
          label='Music'
          value={settings.bgm}
          onChange={(e) => onSettingsChange('bgm', parseFloat(e.target.value))}
        />
        <VolumeSlider
          label='Sound Effects'
          value={settings.sfx}
          onChange={(e) => onSettingsChange('sfx', parseFloat(e.target.value))}
        />
        <VolumeSlider
          label='Narration'
          value={settings.narration}
          onChange={(e) =>
            onSettingsChange('narration', parseFloat(e.target.value))
          }
        />
        <div className='modal-actions'>
          <button className='modal-button' onClick={onRestart}>
            {' '}
            Restart Story{' '}
          </button>
          <button className='modal-button primary' onClick={onSave}>
            {' '}
            Save Game{' '}
          </button>
        </div>
      </div>
    </div>
  );
};
