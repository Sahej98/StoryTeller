import React from 'react';
import { Plus, Trash2, TrendingUp, Box, Flag } from 'lucide-react';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const rowStyle = {
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  background: 'rgba(30, 30, 30, 0.4)',
  padding: '0.5rem',
  borderRadius: '4px',
  border: '1px solid #4a3a2a',
};

const inputStyle = {
  background: 'rgba(10, 10, 10, 0.3)',
  border: '1px solid #5a4a3a',
  color: '#e0d1b9',
  padding: '0.4rem',
  borderRadius: '3px',
  fontFamily: 'inherit',
  fontSize: '0.85rem',
  flex: 1,
  minWidth: 0,
};

const iconButtonStyle = {
  background: 'transparent',
  border: 'none',
  color: '#ff8a80',
  cursor: 'pointer',
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.8,
  transition: 'opacity 0.2s',
};

export const StatsBuilder = ({ value, onChange }) => {
  const stats = value || {};

  const handleAdd = () => {
    onChange({ ...stats, sanity: 0 });
  };

  const handleRemove = (key) => {
    const newStats = { ...stats };
    delete newStats[key];
    onChange(Object.keys(newStats).length > 0 ? newStats : undefined);
  };

  const handleChange = (oldKey, newKey, newVal) => {
    const newStats = { ...stats };
    if (oldKey !== newKey) {
      delete newStats[oldKey];
    }
    newStats[newKey] = parseInt(newVal, 10) || 0;
    onChange(newStats);
  };

  return (
    <div style={containerStyle}>
      {Object.entries(stats).map(([stat, val]) => (
        <div key={stat} style={rowStyle}>
          <TrendingUp size={16} color='#a38c6d' />
          <select
            value={stat}
            onChange={(e) => handleChange(stat, e.target.value, val)}
            style={inputStyle}>
            <option value='sanity'>Sanity</option>
            <option value='health'>Health</option>
            <option value='stamina'>Stamina</option>
            <option value='morality'>Morality</option>
          </select>
          <input
            type='number'
            value={val}
            onChange={(e) => handleChange(stat, stat, e.target.value)}
            style={{ ...inputStyle, maxWidth: '80px', textAlign: 'right' }}
          />
          <button
            style={iconButtonStyle}
            onClick={() => handleRemove(stat)}
            title='Remove Stat'>
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        className='themed-button secondary small'
        onClick={handleAdd}
        style={{ alignSelf: 'flex-start' }}>
        <Plus size={14} /> Add Stat Modifier
      </button>
    </div>
  );
};

export const InventoryBuilder = ({ value, onChange, mode = 'add' }) => {
  const items = Array.isArray(value) ? value : value ? [value] : [];

  const update = (newItems) => {
    if (newItems.length === 0) onChange(undefined);
    else if (newItems.length === 1 && mode === 'add')
      onChange(newItems[0]); // Keep backward compat for single string 'add'
    else onChange(newItems);
  };

  const handleAdd = () => update([...items, '']);
  const handleRemove = (idx) => update(items.filter((_, i) => i !== idx));
  const handleChange = (idx, val) => {
    const newItems = [...items];
    newItems[idx] = val;
    update(newItems);
  };

  return (
    <div style={containerStyle}>
      {items.map((item, i) => (
        <div key={i} style={rowStyle}>
          <Box size={16} color='#a38c6d' />
          <input
            type='text'
            value={item}
            onChange={(e) => handleChange(i, e.target.value)}
            placeholder='Item ID (e.g. rusty_key)'
            style={inputStyle}
          />
          <button
            style={iconButtonStyle}
            onClick={() => handleRemove(i)}
            title='Remove Item'>
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        className='themed-button secondary small'
        onClick={handleAdd}
        style={{ alignSelf: 'flex-start' }}>
        <Plus size={14} /> {mode === 'add' ? 'Add Item' : 'Add Check'}
      </button>
    </div>
  );
};

export const FlagsBuilder = ({ value, onChange }) => {
  const isEffect = value && !Array.isArray(value) && value.set;
  const flags = isEffect
    ? Array.isArray(value.set)
      ? value.set
      : [value.set]
    : Array.isArray(value)
      ? value
      : [];

  const update = (newFlags) => {
    if (newFlags.length === 0) onChange(undefined);
    else if (isEffect) onChange({ set: newFlags });
    else onChange(newFlags);
  };

  const handleAdd = () => update([...flags, '']);
  const handleRemove = (idx) => update(flags.filter((_, i) => i !== idx));
  const handleChange = (idx, val) => {
    const newFlags = [...flags];
    newFlags[idx] = val;
    update(newFlags);
  };

  return (
    <div style={containerStyle}>
      {flags.map((flag, i) => (
        <div key={i} style={rowStyle}>
          <Flag size={16} color='#a38c6d' />
          <input
            type='text'
            value={flag}
            onChange={(e) => handleChange(i, e.target.value)}
            placeholder='Flag ID (e.g. met_npc)'
            style={inputStyle}
          />
          <button
            style={iconButtonStyle}
            onClick={() => handleRemove(i)}
            title='Remove Flag'>
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        className='themed-button secondary small'
        onClick={handleAdd}
        style={{ alignSelf: 'flex-start' }}>
        <Plus size={14} /> Add Flag
      </button>
    </div>
  );
};
