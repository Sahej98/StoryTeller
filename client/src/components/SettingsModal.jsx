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

export const SettingsModal = ({
  isVisible,
  onClose,
  volumes,
  onVolumeChange,
  onSave,
  onRestart,
}) => {
  if (!isVisible) return null;

  return (
    <div className='settings-modal-overlay' onClick={onClose}>
      <div className='settings-panel' onClick={(e) => e.stopPropagation()}>
        <h2>Audio Settings</h2>
        <VolumeSlider
          label='Master'
          value={volumes.master}
          onChange={(e) => onVolumeChange('master', e.target.value)}
        />
        <VolumeSlider
          label='Music'
          value={volumes.bgm}
          onChange={(e) => onVolumeChange('bgm', e.target.value)}
        />
        <VolumeSlider
          label='Sound Effects'
          value={volumes.sfx}
          onChange={(e) => onVolumeChange('sfx', e.target.value)}
        />
        <VolumeSlider
          label='Narration'
          value={volumes.narration}
          onChange={(e) => onVolumeChange('narration', e.target.value)}
        />
        <div className='settings-actions'>
          <button className='settings-button save' onClick={onSave}>
            Save Game
          </button>
          <button className='settings-button' onClick={onRestart}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};
