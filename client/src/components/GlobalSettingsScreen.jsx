import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  Plus,
  Trash2,
  Save,
  Music,
  Volume2,
  Mic,
  Play,
  Pause,
  Search,
} from 'lucide-react';
import { AssetUploader } from './AssetUploader.jsx';

const API_URL = import.meta.env.VITE_API_URL || '';

export const GlobalSettingsScreen = ({ onBack, showAlert, authToken }) => {
  const [activeTab, setActiveTab] = useState('bgm');
  const [data, setData] = useState({ BGM: {}, SFX: {}, voiceMap: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/gamedata`);
      if (!res.ok) throw new Error('Failed to fetch game data');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      showAlert('Failed to load global assets.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/gamedata`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to save changes');
      showAlert('Global assets updated successfully!', 'success');
    } catch (err) {
      console.error(err);
      showAlert('Failed to save changes.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAudioUpdate = (category, key, value) => {
    setData((prev) => ({
      ...prev,
      [category]: { ...prev[category], [key]: value },
    }));
  };

  const handleVoiceUpdate = (key, field, value) => {
    setData((prev) => ({
      ...prev,
      voiceMap: {
        ...prev.voiceMap,
        [key]: {
          ...prev.voiceMap[key],
          [field]:
            field === 'pitch' || field === 'rate' ? parseFloat(value) : value,
        },
      },
    }));
  };

  const addItem = (category) => {
    const baseKey = category === 'voiceMap' ? 'new_voice' : 'new_sound';
    let newKey = baseKey;
    let counter = 1;
    while (data[category][newKey]) {
      newKey = `${baseKey}_${counter}`;
      counter++;
    }

    const newValue =
      category === 'voiceMap'
        ? { names: '', pitch: 1, rate: 1, lang: 'en-US' }
        : '';

    setData((prev) => ({
      ...prev,
      [category]: { ...prev[category], [newKey]: newValue },
    }));
  };

  const deleteItem = (category, key) => {
    showAlert(
      `Delete "${key}"? This might break stories using it.`,
      'error',
      'Confirm Delete',
      () => {
        const newData = { ...data[category] };
        delete newData[key];
        setData((prev) => ({ ...prev, [category]: newData }));
      },
    );
  };

  const renameItem = (category, oldKey, newKey) => {
    if (!newKey || data[category][newKey]) return;
    const newData = { ...data[category] };
    const value = newData[oldKey];
    delete newData[oldKey];
    newData[newKey] = value;
    setData((prev) => ({ ...prev, [category]: newData }));
  };

  const togglePreview = (url) => {
    if (playingAudio) {
      playingAudio.pause();
      setPlayingAudio(null);
    }
    if (url) {
      const audio = new Audio(url);
      audio.play().catch((e) => console.warn(e));
      audio.onended = () => setPlayingAudio(null);
      setPlayingAudio(audio);
    }
  };

  const filteredKeys = (obj) => {
    return Object.keys(obj).filter((k) =>
      k.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  if (isLoading)
    return (
      <div className='editor-container'>
        <div className='loading-title'>Loading Assets...</div>
      </div>
    );

  return (
    <div className='editor-container'>
      <header className='editor-header'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            overflow: 'hidden',
          }}>
          <button
            className='themed-button secondary mobile-icon-only'
            onClick={onBack}>
            <ChevronLeft size={16} /> <span>Back</span>
          </button>
          <h2
            className='selection-screen-title'
            style={{
              margin: 0,
              fontSize: '1.2rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            Asset Manager
          </h2>
        </div>
        <button
          className='themed-button primary mobile-icon-only'
          onClick={handleSave}
          disabled={isSaving}>
          <Save size={16} /> <span>{isSaving ? 'Saving...' : 'Save'}</span>
        </button>
      </header>

      <main className='editor-layout' style={{ flexDirection: 'column' }}>
        <div className='tab-group' style={{ padding: '1rem 1rem 0' }}>
          <button
            className={`editor-tab ${activeTab === 'bgm' ? 'active' : ''}`}
            onClick={() => setActiveTab('bgm')}>
            <Music size={16} /> BGM
          </button>
          <button
            className={`editor-tab ${activeTab === 'sfx' ? 'active' : ''}`}
            onClick={() => setActiveTab('sfx')}>
            <Volume2 size={16} /> SFX
          </button>
          <button
            className={`editor-tab ${activeTab === 'voice' ? 'active' : ''}`}
            onClick={() => setActiveTab('voice')}>
            <Mic size={16} /> Voices
          </button>
        </div>

        <div className='editor-main asset-manager-content'>
          <div className='search-bar-container' style={{ width: '100%' }}>
            <div className='search-input-group'>
              <Search size={16} color='#a38c6d' />
              <input
                placeholder='Filter items...'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>

          {/* AUDIO LIST (BGM & SFX) */}
          {(activeTab === 'bgm' || activeTab === 'sfx') && (
            <div
              className='editor-card'
              style={{ width: '100%', boxSizing: 'border-box' }}>
              <div
                className='choices-header'
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}>
                <h5
                  className='card-title'
                  style={{ border: 'none', margin: 0 }}>
                  {activeTab === 'bgm' ? 'Background Music' : 'Sound Effects'}
                </h5>
                <button
                  className='themed-button secondary small'
                  onClick={() => addItem(activeTab === 'bgm' ? 'BGM' : 'SFX')}>
                  <Plus size={14} /> Add New
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}>
                {filteredKeys(data[activeTab === 'bgm' ? 'BGM' : 'SFX']).map(
                  (key) => {
                    const url = data[activeTab === 'bgm' ? 'BGM' : 'SFX'][key];
                    return (
                      <div key={key} className='choice-builder asset-row'>
                        <div className='asset-key-group'>
                          <label>ID</label>
                          <input
                            value={key}
                            onChange={(e) =>
                              renameItem(
                                activeTab === 'bgm' ? 'BGM' : 'SFX',
                                key,
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className='asset-value-group'>
                          <label>URL</label>
                          <div className='asset-input-wrapper'>
                            <input
                              value={url}
                              onChange={(e) =>
                                handleAudioUpdate(
                                  activeTab === 'bgm' ? 'BGM' : 'SFX',
                                  key,
                                  e.target.value,
                                )
                              }
                            />
                            <AssetUploader
                              type='audio'
                              onUploadComplete={(newUrl) =>
                                handleAudioUpdate(
                                  activeTab === 'bgm' ? 'BGM' : 'SFX',
                                  key,
                                  newUrl,
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className='asset-actions'>
                          <button
                            className='themed-button secondary small'
                            onClick={() => togglePreview(url)}>
                            {playingAudio && playingAudio.src === url ? (
                              <Pause size={14} />
                            ) : (
                              <Play size={14} />
                            )}
                          </button>
                          <button
                            className='btn-danger'
                            onClick={() =>
                              deleteItem(
                                activeTab === 'bgm' ? 'BGM' : 'SFX',
                                key,
                              )
                            }>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}

          {/* VOICES LIST */}
          {activeTab === 'voice' && (
            <div
              className='editor-card'
              style={{ width: '100%', boxSizing: 'border-box' }}>
              <div
                className='choices-header'
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}>
                <h5
                  className='card-title'
                  style={{ border: 'none', margin: 0 }}>
                  Voice Profiles
                </h5>
                <button
                  className='themed-button secondary small'
                  onClick={() => addItem('voiceMap')}>
                  <Plus size={14} /> Add Profile
                </button>
              </div>

              <div className='voice-grid'>
                {filteredKeys(data.voiceMap).map((key) => {
                  const profile = data.voiceMap[key];
                  return (
                    <div key={key} className='choice-builder'>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '0.5rem',
                        }}>
                        <input
                          value={key}
                          onChange={(e) =>
                            renameItem('voiceMap', key, e.target.value)
                          }
                          style={{ width: '60%', fontWeight: 'bold' }}
                        />
                        <button
                          className='btn-danger'
                          onClick={() => deleteItem('voiceMap', key)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className='field-group'>
                        <label>System Voice Names</label>
                        <input
                          value={profile.names}
                          onChange={(e) =>
                            handleVoiceUpdate(key, 'names', e.target.value)
                          }
                          placeholder='Comma separated...'
                        />
                      </div>
                      <div
                        style={{
                          marginTop: '0.5rem',
                          display: 'flex',
                          gap: '1rem',
                          flexWrap: 'wrap',
                        }}>
                        <div
                          className='field-group'
                          style={{ flex: '1 1 100px' }}>
                          <label>Pitch ({profile.pitch})</label>
                          <input
                            type='range'
                            min='0.1'
                            max='2'
                            step='0.1'
                            value={profile.pitch}
                            onChange={(e) =>
                              handleVoiceUpdate(key, 'pitch', e.target.value)
                            }
                          />
                        </div>
                        <div
                          className='field-group'
                          style={{ flex: '1 1 100px' }}>
                          <label>Rate ({profile.rate})</label>
                          <input
                            type='range'
                            min='0.1'
                            max='2'
                            step='0.1'
                            value={profile.rate}
                            onChange={(e) =>
                              handleVoiceUpdate(key, 'rate', e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
