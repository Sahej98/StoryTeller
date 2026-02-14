import React from 'react';
import {
  Plus,
  Trash2,
  TrendingUp,
  Box,
  Flag,
  Heart,
  Volume2,
  Sparkles,
} from 'lucide-react';

export const RequirementsBuilder = ({
  value = {},
  onChange,
  characters = [],
}) => {
  const update = (key, val) => {
    const next = { ...value, [key]: val };
    // Clean up empty keys
    if (
      !val ||
      (Array.isArray(val) && val.length === 0) ||
      (typeof val === 'object' && Object.keys(val).length === 0)
    ) {
      delete next[key];
    }
    onChange(next);
  };

  return (
    <div className='logic-builder-container'>
      <div className='logic-row'>
        <label>Stats</label>
        <StatsBuilder
          value={value.stats}
          onChange={(v) => update('stats', v)}
        />
      </div>
      <div className='logic-row'>
        <label>Items</label>
        <InventoryBuilder
          value={value.inventory}
          mode='check'
          onChange={(v) => update('inventory', v)}
        />
      </div>
      <div className='logic-row'>
        <label>Req Flags</label>
        <FlagsBuilder
          value={value.flags}
          onChange={(v) => update('flags', v)}
        />
      </div>
      <div className='logic-row'>
        <label>No Flags</label>
        <FlagsBuilder
          value={value.notFlags}
          onChange={(v) => update('notFlags', v)}
        />
      </div>
      <div className='logic-row'>
        <label>Relations</label>
        <RelationshipBuilder
          value={value.relationships}
          characters={characters}
          onChange={(v) => update('relationships', v)}
        />
      </div>
    </div>
  );
};

export const StatsBuilder = ({ value = {}, onChange }) => {
  const handleAdd = () => onChange({ ...value, sanity: 0 });
  const handleRemove = (key) => {
    const next = { ...value };
    delete next[key];
    onChange(Object.keys(next).length > 0 ? next : undefined);
  };
  const handleChange = (oldK, newK, val) => {
    const next = { ...value };
    if (oldK !== newK) delete next[oldK];
    next[newK] = parseInt(val, 10) || 0;
    onChange(next);
  };
  return (
    <div className='builder-list'>
      {Object.entries(value).map(([k, v]) => (
        <div key={k} className='builder-item'>
          <div className='icon'>
            <TrendingUp size={12} />
          </div>
          <select
            value={k}
            onChange={(e) => handleChange(k, e.target.value, v)}>
            <option value='sanity'>Sanity</option>
            <option value='health'>Health</option>
            <option value='stamina'>Stamina</option>
            <option value='morality'>Morality</option>
          </select>
          <input
            type='number'
            value={v}
            onChange={(e) => handleChange(k, k, e.target.value)}
          />
          <button className='btn-icon danger' onClick={() => handleRemove(k)}>
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <button className='btn-add' onClick={handleAdd}>
        <Plus size={10} /> Add Stat
      </button>
    </div>
  );
};

export const InventoryBuilder = ({ value, onChange, mode = 'add' }) => {
  const items = Array.isArray(value) ? value : value ? [value] : [];
  const handleAdd = () => onChange([...items, '']);
  const update = (i, val) => {
    const next = [...items];
    next[i] = val;
    onChange(next);
  };
  const remove = (i) => {
    const next = items.filter((_, idx) => idx !== i);
    onChange(next.length ? next : undefined);
  };
  return (
    <div className='builder-list'>
      {items.map((item, i) => (
        <div key={i} className='builder-item'>
          <div className='icon'>
            <Box size={12} />
          </div>
          <input
            value={item}
            placeholder='Item ID'
            onChange={(e) => update(i, e.target.value)}
          />
          <div></div> {/* Spacer for grid consistency */}
          <button className='btn-icon danger' onClick={() => remove(i)}>
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <button className='btn-add' onClick={handleAdd}>
        <Plus size={10} /> Add Item
      </button>
    </div>
  );
};

export const FlagsBuilder = ({ value, onChange }) => {
  const flags = Array.isArray(value) ? value : value?.set ? value.set : [];

  const handleAdd = () => {
    const newFlags = [...flags, ''];
    onChange(Array.isArray(value) ? newFlags : { set: newFlags });
  };

  const update = (i, val) => {
    const next = [...flags];
    next[i] = val;
    onChange(Array.isArray(value) ? next : { set: next });
  };

  const remove = (i) => {
    const next = flags.filter((_, idx) => idx !== i);
    const result = next.length ? next : undefined;
    onChange(
      Array.isArray(value) ? result : result ? { set: result } : undefined,
    );
  };

  return (
    <div className='builder-list'>
      {flags.map((flag, i) => (
        <div key={i} className='builder-item'>
          <div className='icon'>
            <Flag size={12} />
          </div>
          <input
            value={flag}
            placeholder='Flag ID'
            onChange={(e) => update(i, e.target.value)}
          />
          <div></div> {/* Spacer */}
          <button className='btn-icon danger' onClick={() => remove(i)}>
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <button className='btn-add' onClick={handleAdd}>
        <Plus size={10} /> Add Flag
      </button>
    </div>
  );
};

export const RelationshipBuilder = ({
  value = {},
  onChange,
  characters = [],
}) => {
  const handleAdd = () => onChange({ ...value, [characters[0] || 'npc']: 0 });
  const handleChange = (oldK, newK, val) => {
    const next = { ...value };
    if (oldK !== newK) delete next[oldK];
    next[newK] = parseInt(val, 10) || 0;
    onChange(next);
  };
  return (
    <div className='builder-list'>
      {Object.entries(value).map(([k, v]) => (
        <div key={k} className='builder-item'>
          <div className='icon'>
            <Heart size={12} />
          </div>
          <select
            value={k}
            onChange={(e) => handleChange(k, e.target.value, v)}>
            {characters.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            {!characters.includes(k) && <option value={k}>{k}</option>}
          </select>
          <input
            type='number'
            value={v}
            onChange={(e) => handleChange(k, k, e.target.value)}
          />
          <button
            className='btn-icon danger'
            onClick={() => {
              const n = { ...value };
              delete n[k];
              onChange(Object.keys(n).length ? n : undefined);
            }}>
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <button className='btn-add' onClick={handleAdd}>
        <Plus size={10} /> Add Relation
      </button>
    </div>
  );
};

export const AmbientSfxBuilder = ({ value = [], onChange, sfxOptions }) => {
  const handleAdd = () => onChange([...value, { triggerWord: '', sfx: '' }]);
  const update = (i, field, val) => {
    const next = [...value];
    next[i][field] = val;
    onChange(next);
  };
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
  return (
    <div className='builder-list'>
      {value.map((item, i) => (
        <div key={i} className='builder-item'>
          <div className='icon'>
            <Volume2 size={12} />
          </div>
          <input
            placeholder='Word'
            value={item.triggerWord}
            onChange={(e) => update(i, 'triggerWord', e.target.value)}
          />
          {sfxOptions ? (
            <select
              value={item.sfx || ''}
              onChange={(e) => update(i, 'sfx', e.target.value)}>
              <option value=''>SFX...</option>
              {Object.keys(sfxOptions).map((k) => (
                <option key={k} value={sfxOptions[k]}>
                  {k}
                </option>
              ))}
            </select>
          ) : (
            <input
              placeholder='SFX Key'
              value={item.sfx}
              onChange={(e) => update(i, 'sfx', e.target.value)}
            />
          )}
          <button className='btn-icon danger' onClick={() => remove(i)}>
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <button className='btn-add' onClick={handleAdd}>
        <Plus size={10} /> Add Effect
      </button>
    </div>
  );
};

export const TextEffectsBuilder = ({ value = [], onChange }) => {
  const handleAdd = () => onChange([...value, { word: '', effect: 'shake' }]);
  const update = (i, field, val) => {
    const next = [...value];
    next[i][field] = val;
    onChange(next);
  };
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));

  const OPTIONS = [
    'red',
    'blue',
    'green',
    'gold',
    'shake',
    'whisper',
    'shock',
    'anger',
    'fear',
    'tremble',
    'rainbow',
    'fire',
    'glitch',
    'ghostly',
    'blur',
    'wavy',
    'typewriter',
    'magic',
    'digital',
    'ice',
    'blood',
    'neon',
    'pixel',
    'corrupted',
    'divine',
    'void',
    'mirror',
    'upside-down',
    'fade-in-out',
    'scatter',
  ];

  return (
    <div className='builder-list'>
      {value.map((item, i) => (
        <div key={i} className='builder-item'>
          <div className='icon'>
            <Sparkles size={12} />
          </div>
          <input
            placeholder='Word'
            value={item.word}
            onChange={(e) => update(i, 'word', e.target.value)}
          />
          <select
            value={item.effect}
            onChange={(e) => update(i, 'effect', e.target.value)}>
            {OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <button className='btn-icon danger' onClick={() => remove(i)}>
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <button className='btn-add' onClick={handleAdd}>
        <Plus size={10} /> Add Effect
      </button>
    </div>
  );
};
