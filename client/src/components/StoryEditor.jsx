import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Edit,
  Settings as SettingsIcon,
  Zap,
  MessageSquare,
  ListTree,
  Palette,
  Code,
  Users,
  Box,
  Undo2,
  BookCopy,
  Library,
  FileText,
  Clock,
  Skull,
  Volume2,
  PanelLeft,
  PanelRight,
  Globe,
  GripVertical,
  Download,
  FileUp,
  AlertTriangle,
  BookOpen,
  Timer,
  Eye,
  Heart,
  StickyNote,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { TemplateModal } from './TemplateModal.jsx';
import { templates } from '../data/editorTemplates.js';
import { AssetUploader } from './AssetUploader.jsx';
import {
  StatsBuilder,
  InventoryBuilder,
  FlagsBuilder,
  RelationshipBuilder,
  RequirementsBuilder,
  AmbientSfxBuilder,
  TextEffectsBuilder,
} from './LogicEditors.jsx';

const API_URL = import.meta.env.VITE_API_URL || '';

const VISUAL_EFFECT_OPTIONS = [
  'rumble',
  'glitch',
  'flash',
  'shake',
  'blur',
  'darken',
  'sepia',
  'grayscale',
  'invert',
  'blur-pulse',
  'red-tint',
  'static-overlay',
];

// Helper for JsonEditor component
const JsonEditor = ({
  value,
  onChange,
  placeholder,
  disabled,
  height = '80px',
}) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const formatted = value ? JSON.stringify(value, null, 2) : '';
      if (text !== formatted) setText(formatted);
    } catch (e) {}
  }, [value]);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    if (newText.trim() === '') {
      setError(null);
      onChange(null);
      return;
    }
    try {
      const parsed = JSON.parse(newText);
      setError(null);
      onChange(parsed);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <textarea
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        disabled={disabled}
        style={{
          fontFamily: 'Courier New, Courier, monospace',
          fontSize: '0.85rem',
          backgroundColor: '#0c0a08',
          borderColor: error ? 'var(--error-color)' : '#3a2a1a',
          color: error ? '#ff8a80' : '#f2c97d',
          lineHeight: 1.5,
          whiteSpace: 'pre',
          tabSize: 2,
          minHeight: height,
        }}
      />
      {error && (
        <small style={{ color: 'var(--error-color)', fontSize: '0.7rem' }}>
          {error}
        </small>
      )}
    </div>
  );
};

const CollapsibleChoice = ({
  choice,
  index,
  updateChoice,
  deleteChoice,
  story,
  activeChapterKey,
  charKeys,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Safe access to nodes for the dropdown
  const availableNodes = useMemo(() => {
    if (
      !story ||
      !story.storyData ||
      !activeChapterKey ||
      !story.storyData[activeChapterKey]
    ) {
      return [];
    }
    return Object.keys(story.storyData[activeChapterKey]);
  }, [story, activeChapterKey]);

  return (
    <div className='choice-builder'>
      <div
        className='choice-builder-header'
        style={{ cursor: 'pointer', marginBottom: '0' }}
        onClick={() => setIsOpen(!isOpen)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <h6
            style={{
              margin: 0,
              color: '#e0d1b9',
              display: 'flex',
              gap: '1rem',
            }}>
            Choice {index + 1}:{' '}
            <span style={{ fontWeight: 'normal', color: '#a38c6d' }}>
              {choice.text || '...'}
            </span>
          </h6>
        </div>
        <button
          className='btn-icon danger'
          onClick={(e) => {
            e.stopPropagation();
            deleteChoice(index);
          }}>
          <Trash2 size={14} />
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            marginTop: '1rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}>
          <div className='field-group' style={{ gridColumn: '1 / -1' }}>
            <label>Label</label>
            <input
              placeholder='Label'
              value={choice.text}
              onChange={(e) => updateChoice(index, 'text', e.target.value)}
            />
          </div>
          <div className='field-group'>
            <label>Destination</label>
            <select
              value={choice.next || ''}
              onChange={(e) => updateChoice(index, 'next', e.target.value)}>
              <option value=''>(End Chapter)</option>
              <option value='END_STORY'>(End Story)</option>
              {availableNodes.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div className='field-group'>
            <label>
              <Eye size={12} /> Visibility
            </label>
            <select
              value={choice.visibilityCondition || 'always'}
              onChange={(e) =>
                updateChoice(index, 'visibilityCondition', e.target.value)
              }>
              <option value='always'>Always Visible</option>
              <option value='hide_if_unmet'>Hide if requirements unmet</option>
              <option value='hide_if_met'>Hide if requirements met</option>
            </select>
          </div>
          <div className='field-group' style={{ gridColumn: '1 / -1' }}>
            <label>Requirement Logic</label>
            <RequirementsBuilder
              value={choice.requires}
              characters={charKeys}
              onChange={(v) => updateChoice(index, 'requires', v)}
            />
          </div>

          <div
            className='field-group'
            style={{
              gridColumn: '1 / -1',
              marginTop: '0.5rem',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '0.5rem',
            }}>
            <label style={{ fontSize: '0.7rem', color: '#a38c6d' }}>
              Choice Effects
            </label>
            <div style={{ fontSize: '0.7rem' }}>Stats:</div>
            <StatsBuilder
              value={choice.effects?.stats}
              onChange={(v) =>
                updateChoice(index, 'effects', { ...choice.effects, stats: v })
              }
            />
            <div style={{ fontSize: '0.7rem' }}>Inventory Add:</div>
            <InventoryBuilder
              value={choice.effects?.inventory?.add}
              onChange={(v) =>
                updateChoice(index, 'effects', {
                  ...choice.effects,
                  inventory: { ...choice.effects?.inventory, add: v },
                })
              }
            />
            <div style={{ fontSize: '0.7rem' }}>Inventory Remove:</div>
            <InventoryBuilder
              value={choice.effects?.inventory?.remove}
              mode='remove'
              onChange={(v) =>
                updateChoice(index, 'effects', {
                  ...choice.effects,
                  inventory: { ...choice.effects?.inventory, remove: v },
                })
              }
            />
            <div style={{ fontSize: '0.7rem' }}>Flags:</div>
            <FlagsBuilder
              value={choice.effects?.flags}
              onChange={(v) =>
                updateChoice(index, 'effects', { ...choice.effects, flags: v })
              }
            />
            <div style={{ fontSize: '0.7rem' }}>Relationships:</div>
            <RelationshipBuilder
              value={choice.effects?.relationships}
              characters={charKeys}
              onChange={(v) =>
                updateChoice(index, 'effects', {
                  ...choice.effects,
                  relationships: v,
                })
              }
            />
          </div>

          <div className='field-group' style={{ gridColumn: '1 / -1' }}>
            <label>Ending (JSON if End Story)</label>
            <JsonEditor
              value={choice.ending}
              onChange={(v) => updateChoice(index, 'ending', v)}
              placeholder='{"key":"end1","title":"The End","description":"..."}'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const StoryEditor = ({
  storyToEdit,
  onBack,
  onSave,
  gameData,
  showAlert,
  systemVoices,
}) => {
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeChapterKey, setActiveChapterKey] = useState('');
  const [activeNodeKey, setActiveNodeKey] = useState('');
  const [activeView, setActiveView] = useState('chapters');
  const [activeStorySubTab, setActiveStorySubTab] = useState('settings');
  const [activeNodeSubTab, setActiveNodeSubTab] = useState('dialogue');
  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [originalStory, setOriginalStory] = useState('');
  const [mobileView, setMobileView] = useState('sidebar');

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      let data;

      if (storyToEdit) {
        // If story exists but data is missing (common with list-view objects), fetch full detail
        if (!storyToEdit.storyData && storyToEdit.id) {
          try {
            const token = localStorage.getItem('storyteller_token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const res = await fetch(
              `${API_URL}/api/stories/${storyToEdit.id}`,
              { headers },
            );
            if (!res.ok) throw new Error('Failed to load story details');
            data = await res.json();
          } catch (e) {
            console.error(e);
            showAlert('Failed to load story content.', 'error');
            setIsLoading(false);
            return;
          }
        } else {
          // Already have full data (e.g. newly created story not yet saved to DB but passed around)
          data = JSON.parse(JSON.stringify(storyToEdit));
        }
      } else {
        // New Story Default State
        data = {
          title: 'Unnamed Manuscript',
          id: `story_${Date.now()}`,
          published: false,
          thumbnail: '',
          description: '',
          accentColor: '#ffffff',
          storyData: {
            chapter1: { start: { text: 'The ink begins to flow...' } },
          },
          storyDetails: {
            title: 'New Story',
            chapters: {
              chapter1: { title: 'Chapter 1', number: 1, flavorText: '' },
            },
          },
          characters: { player: { name: 'You', sprite: '' } },
          items: {},
          voices: {},
          cautionScreen: {
            enabled: false,
            title: 'WARNING',
            text: 'Disturbing content ahead.',
          },
        };
      }

      // Ensure critical structures exist to prevent crashes
      if (!data.storyData) data.storyData = {};
      if (!data.storyDetails)
        data.storyDetails = { title: data.title || 'Story', chapters: {} };
      if (!data.storyDetails.chapters) data.storyDetails.chapters = {};
      if (!data.characters) data.characters = {};
      if (!data.items) data.items = {};

      setStory(data);
      setOriginalStory(JSON.stringify(data));

      // Auto-Select First Chapter
      let firstCh = '';
      if (data.storyDetails && data.storyDetails.chapters) {
        // Sort by number to find the "first" logical chapter
        const sortedChapters = Object.entries(data.storyDetails.chapters).sort(
          (a, b) => (a[1].number || 0) - (b[1].number || 0),
        );
        if (sortedChapters.length > 0) firstCh = sortedChapters[0][0];
      }

      // Fallback if detail keys mismatch data keys
      if (!firstCh && data.storyData) {
        firstCh = Object.keys(data.storyData)[0];
      }

      setActiveChapterKey(firstCh || '');

      // Auto-Select Node
      if (firstCh && data.storyData[firstCh]) {
        const nodes = Object.keys(data.storyData[firstCh]);
        const nextNode = nodes.includes('start') ? 'start' : nodes[0] || '';
        setActiveNodeKey(nextNode);
      } else {
        setActiveNodeKey('');
      }

      setIsLoading(false);
    };

    initialize();
  }, [storyToEdit]);

  const updateStory = (updater) => {
    setStory((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (JSON.stringify(next) !== originalStory) setIsDirty(true);
      return next;
    });
  };

  const updateNodeField = (field, value) => {
    updateStory((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      // Guard against missing path
      if (
        next.storyData &&
        next.storyData[activeChapterKey] &&
        next.storyData[activeChapterKey][activeNodeKey]
      ) {
        if (value === undefined || value === null || value === '')
          delete next.storyData[activeChapterKey][activeNodeKey][field];
        else next.storyData[activeChapterKey][activeNodeKey][field] = value;
      }
      return next;
    });
  };

  const deleteChapter = (chapterKey) => {
    if (Object.keys(story.storyDetails.chapters).length <= 1) {
      showAlert('Cannot delete the only chapter.', 'error');
      return;
    }
    showAlert(
      `Delete ${story.storyDetails.chapters[chapterKey].title}? This action is irreversible.`,
      'error',
      'Confirm',
      () => {
        updateStory((prev) => {
          const next = JSON.parse(JSON.stringify(prev));
          delete next.storyDetails.chapters[chapterKey];
          delete next.storyData[chapterKey];
          return next;
        });
        if (activeChapterKey === chapterKey) {
          const remaining = Object.keys(story.storyDetails.chapters).filter(
            (k) => k !== chapterKey,
          );
          setActiveChapterKey(remaining[0] || '');
        }
      },
    );
  };

  const addChapter = () => {
    const k = `ch_${Date.now()}`;
    updateStory((p) => ({
      ...p,
      storyDetails: {
        ...p.storyDetails,
        chapters: {
          ...p.storyDetails.chapters,
          [k]: {
            title: 'New Chapter',
            number: Object.keys(p.storyDetails.chapters).length + 1,
          },
        },
      },
      storyData: {
        ...p.storyData,
        [k]: { start: { text: 'Start writing...' } },
      },
    }));
    setActiveChapterKey(k);
    setActiveNodeKey('start');
  };

  const handleSave = async () => {
    const success = await onSave(story);
    if (success) {
      setOriginalStory(JSON.stringify(story));
      setIsDirty(false);
      showAlert('Manuscript successfully bound.', 'success', 'Bound');
    }
  };

  const exportJSON = (data, label) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${label}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (target) => {
    showAlert(
      `Paste valid JSON for ${target}:`,
      'default',
      'Import JSON',
      (input) => {
        if (!input) return;
        try {
          const parsed = JSON.parse(input);
          updateStory((prev) => {
            const next = JSON.parse(JSON.stringify(prev));
            if (target === 'node')
              next.storyData[activeChapterKey][activeNodeKey] = parsed;
            else if (target === 'chapter')
              next.storyData[activeChapterKey] = parsed;
            else if (target === 'story') return parsed;
            return next;
          });
          showAlert('Import successful.', 'success');
        } catch (e) {
          showAlert('Critical failure: Invalid JSON format.', 'error');
        }
      },
      null,
      { label: 'JSON Data', initialValue: '' },
    );
  };

  const handleAddTemplate = (templateKey) => {
    const template = templates.nodes[templateKey];
    if (!template) return;
    updateStory((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      Object.assign(
        next.storyData[activeChapterKey],
        JSON.parse(JSON.stringify(template.nodes)),
      );
      return next;
    });
    setIsTemplateModalVisible(false);
    showAlert(`Template "${templateKey}" integrated.`, 'success');
  };

  const addNode = () => {
    showAlert(
      'Enter Node ID:',
      'default',
      'New Node',
      (k) => {
        if (k) {
          updateStory((p) => ({
            ...p,
            storyData: {
              ...p.storyData,
              [activeChapterKey]: {
                ...p.storyData[activeChapterKey],
                [k]: { text: '...' },
              },
            },
          }));
          setActiveNodeKey(k);
        }
      },
      null,
      { label: 'Node ID' },
    );
  };

  const currentNode = story?.storyData?.[activeChapterKey]?.[activeNodeKey];
  const charKeys = useMemo(
    () => (story ? Object.keys(story.characters || {}) : []),
    [story],
  );

  const chapters = story?.storyDetails?.chapters || {};

  if (isLoading || !story)
    return (
      <div className='editor-container'>
        <div className='loading-title'>Gathering Ink...</div>
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
            flex: 1,
          }}>
          <button
            onClick={() =>
              isDirty
                ? showAlert(
                    'Unsaved progress will be lost.',
                    'default',
                    'Exit Editor?',
                    onBack,
                  )
                : onBack()
            }
            className='themed-button secondary'>
            <ArrowLeft size={18} /> <span>Back</span>
          </button>
          <input
            className='editor-title-input'
            value={story.title}
            onChange={(e) => updateStory({ ...story, title: e.target.value })}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className='themed-button secondary mobile-only'
            onClick={() =>
              setMobileView((v) => (v === 'sidebar' ? 'editor' : 'sidebar'))
            }>
            <PanelRight size={18} />
          </button>
          <button onClick={handleSave} className='themed-button primary'>
            <Save size={18} /> <span>Save</span>
          </button>
        </div>
      </header>

      <main className={`editor-layout mobile-view-${mobileView}`}>
        <aside className='editor-sidebar'>
          <div className='sidebar-content'>
            <div className='sidebar-section'>
              <h4 className='sidebar-section-title'>Select Chapter</h4>
              <select
                className='sidebar-select'
                style={{ width: '100%', marginBottom: '1rem' }}
                value={activeChapterKey}
                onChange={(e) => {
                  const newChapter = e.target.value;
                  setActiveChapterKey(newChapter);

                  // Auto-select the first node of the new chapter
                  if (story.storyData && story.storyData[newChapter]) {
                    const nodes = Object.keys(story.storyData[newChapter]);
                    // Prefer 'start', otherwise take the first key, otherwise empty
                    const nextNode = nodes.includes('start')
                      ? 'start'
                      : nodes[0] || '';
                    setActiveNodeKey(nextNode);
                  } else {
                    setActiveNodeKey('');
                  }
                }}>
                {Object.keys(chapters).map((k) => (
                  <option key={k} value={k}>
                    {chapters[k].title}
                  </option>
                ))}
              </select>
            </div>

            <div
              className='sidebar-section'
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h4 className='sidebar-section-title'>
                Nodes
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => setIsTemplateModalVisible(true)}
                    className='themed-button secondary small'
                    title='Inject Template'>
                    <Zap size={12} />
                  </button>
                  <button
                    onClick={() => importJSON('chapter')}
                    className='themed-button secondary small'
                    title='Import Chapter JSON'>
                    <FileUp size={12} />
                  </button>
                  <button
                    onClick={addNode}
                    className='themed-button secondary small'>
                    <Plus size={12} />
                  </button>
                </div>
              </h4>
              <div className='node-list'>
                {/* Safe access to storyData with fallback */}
                {Object.keys(
                  (story.storyData || {})[activeChapterKey] || {},
                ).map((k) => (
                  <div
                    key={k}
                    className={`list-item ${activeNodeKey === k ? 'active' : ''}`}
                    onClick={() => {
                      setActiveNodeKey(k);
                      setMobileView('editor');
                    }}>
                    <span
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                      {k}
                    </span>
                    <div className='list-item-actions'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          exportJSON(story.storyData[activeChapterKey][k], k);
                        }}>
                        <Download size={12} />
                      </button>
                      <button
                        className='danger'
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStory((p) => {
                            const n = JSON.parse(JSON.stringify(p));
                            delete n.storyData[activeChapterKey][k];
                            return n;
                          });
                        }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className='editor-main'>
          <div className='editor-canvas'>
            <div className='tab-group'>
              {[
                { id: 'chapters', label: 'Chapters', icon: BookOpen },
                { id: 'story', label: 'Story', icon: Library },
                { id: 'nodes', label: 'Nodes', icon: FileText },
              ].map((t) => (
                <button
                  key={t.id}
                  className={`editor-tab ${activeView === t.id ? 'active' : ''}`}
                  onClick={() => setActiveView(t.id)}>
                  {React.createElement(t.icon, { size: 16 })} {t.label}
                </button>
              ))}
            </div>

            {activeView === 'chapters' && (
              <div className='editor-card'>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <h5
                    className='card-title'
                    style={{ border: 'none', margin: 0 }}>
                    Chapter Management
                  </h5>
                  <button
                    onClick={addChapter}
                    className='themed-button secondary small'>
                    <Plus size={14} /> Add Chapter
                  </button>
                </div>
                {Object.entries(chapters).map(([key, chapter]) => (
                  <div
                    key={key}
                    className='choice-builder'
                    style={{
                      marginBottom: '1rem',
                      border: '1px solid #4a3a2a',
                    }}>
                    <div
                      className='choice-builder-header'
                      style={{ marginBottom: '0.5rem' }}>
                      <h6
                        style={{
                          color:
                            activeChapterKey === key
                              ? 'var(--accent-color)'
                              : '#a38c6d',
                        }}>
                        {chapter.title}{' '}
                        <span style={{ opacity: 0.5 }}>({key})</span>
                      </h6>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {activeChapterKey !== key && (
                          <button
                            className='themed-button secondary small'
                            onClick={() => {
                              setActiveChapterKey(key);
                              setActiveNodeKey('start');
                            }}>
                            Edit Nodes
                          </button>
                        )}
                        <button
                          className='btn-icon danger'
                          onClick={() => deleteChapter(key)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className='field-row'>
                      <div className='field-group'>
                        <label>Title</label>
                        <input
                          value={chapter.title}
                          onChange={(e) =>
                            updateStory((p) => {
                              const n = JSON.parse(JSON.stringify(p));
                              if (
                                n.storyDetails &&
                                n.storyDetails.chapters &&
                                n.storyDetails.chapters[key]
                              ) {
                                n.storyDetails.chapters[key].title =
                                  e.target.value;
                              }
                              return n;
                            })
                          }
                        />
                      </div>
                      <div className='field-group'>
                        <label>Order Number</label>
                        <input
                          type='number'
                          value={chapter.number}
                          onChange={(e) =>
                            updateStory((p) => {
                              const n = JSON.parse(JSON.stringify(p));
                              if (
                                n.storyDetails &&
                                n.storyDetails.chapters &&
                                n.storyDetails.chapters[key]
                              ) {
                                n.storyDetails.chapters[key].number = parseInt(
                                  e.target.value,
                                );
                              }
                              return n;
                            })
                          }
                        />
                      </div>
                    </div>
                    <div
                      className='field-group'
                      style={{ marginTop: '0.5rem' }}>
                      <label>Flavor Text (Description)</label>
                      <textarea
                        value={chapter.flavorText}
                        onChange={(e) =>
                          updateStory((p) => {
                            const n = JSON.parse(JSON.stringify(p));
                            if (
                              n.storyDetails &&
                              n.storyDetails.chapters &&
                              n.storyDetails.chapters[key]
                            ) {
                              n.storyDetails.chapters[key].flavorText =
                                e.target.value;
                            }
                            return n;
                          })
                        }
                        style={{ minHeight: '60px' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeView === 'story' && (
              <>
                <div className='tab-group'>
                  {[
                    { id: 'settings', label: 'Global', icon: SettingsIcon },
                    { id: 'cast', label: 'Cast', icon: Users },
                    { id: 'db', label: 'Items', icon: Box },
                    { id: 'warn', label: 'Caution', icon: AlertTriangle },
                  ].map((t) => (
                    <button
                      key={t.id}
                      className={`editor-tab small ${activeStorySubTab === t.id ? 'active' : ''}`}
                      onClick={() => setActiveStorySubTab(t.id)}>
                      {React.createElement(t.icon, { size: 14 })} {t.label}
                    </button>
                  ))}
                </div>
                {activeStorySubTab === 'settings' && (
                  <div className='editor-card'>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <h5 className='card-title' style={{ border: 'none' }}>
                        Metadata
                      </h5>
                      <button
                        className='themed-button secondary small'
                        onClick={() => importJSON('story')}>
                        <FileUp size={14} /> Full Import
                      </button>
                    </div>
                    <div className='field-group'>
                      <label>Manuscript Title</label>
                      <input
                        value={story.title}
                        onChange={(e) =>
                          updateStory({ ...story, title: e.target.value })
                        }
                      />
                    </div>
                    <div className='field-group'>
                      <label>Library Description</label>
                      <textarea
                        value={story.description}
                        onChange={(e) =>
                          updateStory({ ...story, description: e.target.value })
                        }
                      />
                    </div>
                    <div
                      className='field-row'
                      style={{ gridTemplateColumns: '1fr 4fr' }}>
                      <div className='field-group'>
                        <label>Accent Color</label>
                        <input
                          style={{ height: '100%', padding: '0.3rem' }}
                          type='color'
                          value={story.accentColor || '#ffffff'}
                          onChange={(e) =>
                            updateStory({
                              ...story,
                              accentColor: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className='field-group'>
                        <label>Cover Image</label>
                        <div
                          style={{
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center',
                          }}>
                          <input
                            value={story.thumbnail}
                            onChange={(e) =>
                              updateStory({
                                ...story,
                                thumbnail: e.target.value,
                              })
                            }
                            style={{ flex: 1 }}
                          />
                          <AssetUploader
                            type='image'
                            onUploadComplete={(url) =>
                              updateStory({ ...story, thumbnail: url })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      className='themed-button secondary small'
                      onClick={() => exportJSON(story, story.title)}>
                      <Download size={14} /> Full Export JSON
                    </button>
                  </div>
                )}
                {activeStorySubTab === 'warn' && (
                  <div className='editor-card'>
                    <h5 className='card-title'>Initial Warning Screen</h5>
                    <label className='switch-label'>
                      Enable Warning{' '}
                      <input
                        type='checkbox'
                        checked={story.cautionScreen.enabled}
                        onChange={(e) =>
                          updateStory((p) => ({
                            ...p,
                            cautionScreen: {
                              ...p.cautionScreen,
                              enabled: e.target.checked,
                            },
                          }))
                        }
                      />
                    </label>
                    <div className='field-group'>
                      <label>Header</label>
                      <input
                        value={story.cautionScreen.title}
                        onChange={(e) =>
                          updateStory((p) => ({
                            ...p,
                            cautionScreen: {
                              ...p.cautionScreen,
                              title: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className='field-group'>
                      <label>Message</label>
                      <textarea
                        value={story.cautionScreen.text}
                        onChange={(e) =>
                          updateStory((p) => ({
                            ...p,
                            cautionScreen: {
                              ...p.cautionScreen,
                              text: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                )}
                {activeStorySubTab === 'cast' && (
                  <div className='editor-card'>
                    <h5 className='card-title'>
                      The Cast{' '}
                      <button
                        className='themed-button secondary small'
                        onClick={() => {
                          showAlert(
                            'Enter Character Key:',
                            'default',
                            'New Character',
                            (k) =>
                              k &&
                              updateStory((p) => ({
                                ...p,
                                characters: {
                                  ...p.characters,
                                  [k]: {
                                    name: 'Unnamed NPC',
                                    sprite: '',
                                    lore: '',
                                  },
                                },
                              })),
                            null,
                            { label: 'Character ID' },
                          );
                        }}>
                        <Plus size={14} />
                      </button>
                    </h5>
                    {Object.entries(story.characters || {}).map(([k, c]) => (
                      <div key={k} className='choice-builder'>
                        <div className='field-row'>
                          <div className='field-group'>
                            <label>ID: {k}</label>
                            <input
                              value={c.name}
                              onChange={(e) =>
                                updateStory((p) => {
                                  const n = JSON.parse(JSON.stringify(p));
                                  n.characters[k].name = e.target.value;
                                  return n;
                                })
                              }
                            />
                          </div>
                          <button
                            className='btn-icon danger'
                            onClick={() =>
                              updateStory((p) => {
                                const n = JSON.parse(JSON.stringify(p));
                                delete n.characters[k];
                                return n;
                              })
                            }>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className='field-group'>
                          <label>Sprite</label>
                          <div
                            style={{
                              display: 'flex',
                              gap: '0.5rem',
                              alignItems: 'center',
                            }}>
                            <input
                              value={c.sprite}
                              onChange={(e) =>
                                updateStory((p) => {
                                  const n = JSON.parse(JSON.stringify(p));
                                  n.characters[k].sprite = e.target.value;
                                  return n;
                                })
                              }
                              style={{ flex: 1 }}
                            />
                            <AssetUploader
                              type='image'
                              onUploadComplete={(url) =>
                                updateStory((p) => {
                                  const n = JSON.parse(JSON.stringify(p));
                                  n.characters[k].sprite = url;
                                  return n;
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className='field-group'>
                          <label>Journal Lore</label>
                          <textarea
                            value={c.lore}
                            onChange={(e) =>
                              updateStory((p) => {
                                const n = JSON.parse(JSON.stringify(p));
                                n.characters[k].lore = e.target.value;
                                return n;
                              })
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {activeStorySubTab === 'db' && (
                  <div className='editor-card'>
                    <h5 className='card-title'>
                      World Items{' '}
                      <button
                        className='themed-button secondary small'
                        onClick={() => {
                          showAlert(
                            'Enter Item ID:',
                            'default',
                            'New Item',
                            (k) =>
                              k &&
                              updateStory((p) => ({
                                ...p,
                                items: {
                                  ...p.items,
                                  [k]: {
                                    name: 'New Item',
                                    description: '',
                                    lore: { title: '', content: '' },
                                  },
                                },
                              })),
                            null,
                            { label: 'Item ID' },
                          );
                        }}>
                        <Plus size={14} />
                      </button>
                    </h5>
                    {Object.entries(story.items || {}).map(([k, it]) => (
                      <div key={k} className='choice-builder'>
                        <div className='field-row'>
                          <div className='field-group'>
                            <label>ID: {k}</label>
                            <input
                              value={it.name}
                              onChange={(e) =>
                                updateStory((p) => {
                                  const n = JSON.parse(JSON.stringify(p));
                                  n.items[k].name = e.target.value;
                                  return n;
                                })
                              }
                            />
                          </div>
                          <button
                            className='btn-icon danger'
                            onClick={() =>
                              updateStory((p) => {
                                const n = JSON.parse(JSON.stringify(p));
                                delete n.items[k];
                                return n;
                              })
                            }>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className='field-group'>
                          <label>Quick Description</label>
                          <input
                            value={it.description}
                            onChange={(e) =>
                              updateStory((p) => {
                                const n = JSON.parse(JSON.stringify(p));
                                n.items[k].description = e.target.value;
                                return n;
                              })
                            }
                          />
                        </div>
                        <div
                          className='field-group'
                          style={{
                            marginTop: '0.5rem',
                            padding: '0.6rem',
                            background: 'rgba(0,0,0,0.2)',
                            borderRadius: '4px',
                          }}>
                          <label
                            style={{ fontSize: '0.65rem', color: '#8e6a39' }}>
                            LORE BOOK ENTRY
                          </label>
                          <input
                            placeholder='Entry Title'
                            value={it.lore?.title}
                            onChange={(e) =>
                              updateStory((p) => {
                                const n = JSON.parse(JSON.stringify(p));
                                n.items[k].lore.title = e.target.value;
                                return n;
                              })
                            }
                            style={{ marginBottom: '0.5rem' }}
                          />
                          <textarea
                            placeholder='Entry Body'
                            value={it.lore?.content}
                            onChange={(e) =>
                              updateStory((p) => {
                                const n = JSON.parse(JSON.stringify(p));
                                n.items[k].lore.content = e.target.value;
                                return n;
                              })
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeView === 'nodes' && currentNode && (
              <>
                <div className='tab-group'>
                  {[
                    { id: 'dialogue', label: 'Dialogue', icon: MessageSquare },
                    { id: 'branching', label: 'Flow', icon: ListTree },
                    { id: 'effects', label: 'Engine', icon: Zap },
                    { id: 'visuals', label: 'Visuals', icon: Palette },
                  ].map((t) => (
                    <button
                      key={t.id}
                      className={`editor-tab small ${activeNodeSubTab === t.id ? 'active' : ''}`}
                      onClick={() => setActiveNodeSubTab(t.id)}>
                      {React.createElement(t.icon, { size: 14 })} {t.label}
                    </button>
                  ))}
                </div>

                {activeNodeSubTab === 'dialogue' && (
                  <div className='editor-card'>
                    <div className='field-row'>
                      <div className='field-group'>
                        <label>Speaker</label>
                        <select
                          value={currentNode.speaker || ''}
                          onChange={(e) =>
                            updateNodeField('speaker', e.target.value)
                          }>
                          <option value=''>Narrator</option>
                          {charKeys.map((k) => (
                            <option key={k} value={k}>
                              {k}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='field-group'>
                        <label>Node ID</label>
                        <input value={activeNodeKey} disabled />
                      </div>
                    </div>
                    <div className='field-group'>
                      <label>NPCs present (Sprites)</label>
                      <div className='npc-selector-grid'>
                        {charKeys.map((k) => {
                          const isSelected = (
                            Array.isArray(currentNode.npc)
                              ? currentNode.npc
                              : [currentNode.npc]
                          ).includes(k);
                          return (
                            <button
                              key={k}
                              className={`npc-toggle ${isSelected ? 'active' : ''}`}
                              onClick={() => {
                                const current = Array.isArray(currentNode.npc)
                                  ? currentNode.npc
                                  : currentNode.npc
                                    ? [currentNode.npc]
                                    : [];
                                const next = isSelected
                                  ? current.filter((c) => c !== k)
                                  : [...current, k];
                                updateNodeField('npc', next);
                              }}>
                              {k}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className='field-group'>
                      <label>Dialogue Text</label>
                      <textarea
                        value={currentNode.text}
                        onChange={(e) =>
                          updateNodeField('text', e.target.value)
                        }
                      />
                    </div>
                    <div className='field-group'>
                      <label>Revisit Text</label>
                      <textarea
                        value={currentNode.revisitText}
                        onChange={(e) =>
                          updateNodeField('revisitText', e.target.value)
                        }
                        placeholder='Text shown on subsequent visits...'
                      />
                    </div>
                    <div className='field-group'>
                      <label>Word-triggered SFX</label>
                      <AmbientSfxBuilder
                        value={currentNode.ambientSfx}
                        onChange={(v) => updateNodeField('ambientSfx', v)}
                        sfxOptions={gameData?.SFX}
                      />
                    </div>
                    <div className='field-group'>
                      <label>Text Effects</label>
                      <TextEffectsBuilder
                        value={currentNode.textEffects}
                        onChange={(v) => updateNodeField('textEffects', v)}
                      />
                    </div>
                  </div>
                )}

                {activeNodeSubTab === 'branching' && (
                  <div className='editor-card'>
                    <div
                      className='field-row'
                      style={{
                        paddingBottom: '1rem',
                        borderBottom: '1px solid #333',
                      }}>
                      <div className='field-group'>
                        <label>
                          <Timer size={12} /> Seconds
                        </label>
                        <input
                          type='number'
                          value={currentNode.timer || 0}
                          onChange={(e) =>
                            updateNodeField('timer', parseInt(e.target.value))
                          }
                        />
                      </div>
                      <div className='field-group'>
                        <label>Default Choice Index</label>
                        <input
                          type='number'
                          value={currentNode.defaultChoiceIndex || 0}
                          onChange={(e) =>
                            updateNodeField(
                              'defaultChoiceIndex',
                              parseInt(e.target.value),
                            )
                          }
                        />
                      </div>
                    </div>
                    <h5 className='card-title' style={{ border: 'none' }}>
                      Choices{' '}
                      <button
                        className='themed-button secondary small'
                        onClick={() =>
                          updateNodeField('choices', [
                            ...(currentNode.choices || []),
                            { text: 'New Path', next: '' },
                          ])
                        }>
                        <Plus size={14} />
                      </button>
                    </h5>
                    {(currentNode.choices || []).map((c, i) => (
                      <CollapsibleChoice
                        key={i}
                        choice={c}
                        index={i}
                        story={story}
                        activeChapterKey={activeChapterKey}
                        charKeys={charKeys}
                        updateChoice={(idx, field, val) => {
                          const n = [...currentNode.choices];
                          if (val === undefined) delete n[idx][field];
                          else n[idx][field] = val;
                          updateNodeField('choices', n);
                        }}
                        deleteChoice={(idx) =>
                          updateNodeField(
                            'choices',
                            currentNode.choices.filter((_, x) => x !== idx),
                          )
                        }
                      />
                    ))}
                  </div>
                )}

                {activeNodeSubTab === 'effects' && (
                  <div className='editor-card'>
                    <h5 className='card-title'>Node Properties</h5>
                    <div className='field-row'>
                      <label className='switch-label'>
                        <Skull size={14} /> Is Death Node{' '}
                        <input
                          type='checkbox'
                          checked={currentNode.isDeath}
                          onChange={(e) =>
                            updateNodeField('isDeath', e.target.checked)
                          }
                        />
                      </label>
                      <label className='switch-label'>
                        <Undo2 size={14} /> Set Checkpoint{' '}
                        <input
                          type='checkbox'
                          checked={currentNode.effects?.setCheckpoint}
                          onChange={(e) =>
                            updateNodeField('effects', {
                              ...currentNode.effects,
                              setCheckpoint: e.target.checked,
                            })
                          }
                        />
                      </label>
                    </div>
                    {currentNode.isDeath && (
                      <div className='field-group'>
                        <label>Redirect on "Continue"</label>
                        <select
                          value={currentNode.nextOnDeath || ''}
                          onChange={(e) =>
                            updateNodeField('nextOnDeath', e.target.value)
                          }>
                          <option value=''>(Restart Chapter)</option>
                          {Object.keys(story.storyData[activeChapterKey]).map(
                            (k) => (
                              <option key={k} value={k}>
                                {k}
                              </option>
                            ),
                          )}
                        </select>
                      </div>
                    )}
                    <h5
                      className='card-title'
                      style={{ border: 'none', marginTop: '1rem' }}>
                      On-Entry Effects
                    </h5>
                    <div className='logic-builder-container'>
                      <div className='logic-row'>
                        <label>Stats</label>
                        <StatsBuilder
                          value={currentNode.effects?.stats}
                          onChange={(v) =>
                            updateNodeField('effects', {
                              ...currentNode.effects,
                              stats: v,
                            })
                          }
                        />
                      </div>
                      <div className='logic-row'>
                        <label>Relations</label>
                        <RelationshipBuilder
                          value={currentNode.effects?.relationships}
                          characters={charKeys}
                          onChange={(v) =>
                            updateNodeField('effects', {
                              ...currentNode.effects,
                              relationships: v,
                            })
                          }
                        />
                      </div>
                      <div className='logic-row'>
                        <label>Add Item</label>
                        <InventoryBuilder
                          value={currentNode.effects?.inventory?.add}
                          onChange={(v) =>
                            updateNodeField('effects', {
                              ...currentNode.effects,
                              inventory: {
                                ...currentNode.effects?.inventory,
                                add: v,
                              },
                            })
                          }
                        />
                      </div>
                      <div className='logic-row'>
                        <label>Rem Item</label>
                        <InventoryBuilder
                          value={currentNode.effects?.inventory?.remove}
                          mode='remove'
                          onChange={(v) =>
                            updateNodeField('effects', {
                              ...currentNode.effects,
                              inventory: {
                                ...currentNode.effects?.inventory,
                                remove: v,
                              },
                            })
                          }
                        />
                      </div>
                      <div className='logic-row'>
                        <label>Set Flags</label>
                        <FlagsBuilder
                          value={currentNode.effects?.flags}
                          onChange={(v) =>
                            updateNodeField('effects', {
                              ...currentNode.effects,
                              flags: v,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeNodeSubTab === 'visuals' && (
                  <div className='editor-card'>
                    <h5 className='card-title'>Atmos & Scenery</h5>
                    <div className='field-group'>
                      <label>Background Image</label>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          alignItems: 'center',
                        }}>
                        <input
                          value={currentNode.background}
                          onChange={(e) =>
                            updateNodeField('background', e.target.value)
                          }
                          style={{ flex: 1 }}
                        />
                        <AssetUploader
                          type='image'
                          onUploadComplete={(url) =>
                            updateNodeField('background', url)
                          }
                        />
                      </div>
                    </div>
                    <div className='field-row'>
                      <div className='field-group'>
                        <label>BGM Key</label>
                        <div
                          style={{
                            display: 'flex',
                            gap: '0.5rem',
                            flexDirection: 'column',
                          }}>
                          <select
                            value={currentNode.bgm || ''}
                            onChange={(e) =>
                              updateNodeField('bgm', e.target.value)
                            }>
                            <option value=''>(None)</option>
                            {gameData?.BGM &&
                              Object.keys(gameData.BGM).map((k) => (
                                <option key={k} value={gameData.BGM[k]}>
                                  {k}
                                </option>
                              ))}
                          </select>
                          <div
                            style={{
                              display: 'flex',
                              gap: '0.5rem',
                              alignItems: 'center',
                            }}>
                            <input
                              value={currentNode.bgm}
                              onChange={(e) =>
                                updateNodeField('bgm', e.target.value)
                              }
                              placeholder='URL or Key'
                              style={{ flex: 1 }}
                            />
                            <AssetUploader
                              type='audio'
                              onUploadComplete={(url) =>
                                updateNodeField('bgm', url)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className='field-group'>
                        <label>SFX Key</label>
                        <div
                          style={{
                            display: 'flex',
                            gap: '0.5rem',
                            flexDirection: 'column',
                          }}>
                          <select
                            value={currentNode.sfx || ''}
                            onChange={(e) =>
                              updateNodeField('sfx', e.target.value)
                            }>
                            <option value=''>(None)</option>
                            {gameData?.SFX &&
                              Object.keys(gameData.SFX).map((k) => (
                                <option key={k} value={gameData.SFX[k]}>
                                  {k}
                                </option>
                              ))}
                          </select>
                          <div
                            style={{
                              display: 'flex',
                              gap: '0.5rem',
                              alignItems: 'center',
                            }}>
                            <input
                              value={currentNode.sfx}
                              onChange={(e) =>
                                updateNodeField('sfx', e.target.value)
                              }
                              placeholder='URL or Key'
                              style={{ flex: 1 }}
                            />
                            <AssetUploader
                              type='audio'
                              onUploadComplete={(url) =>
                                updateNodeField('sfx', url)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='field-group'>
                      <label>Visual Overlay</label>
                      <select
                        value={currentNode.visualEffect || ''}
                        onChange={(e) =>
                          updateNodeField('visualEffect', e.target.value)
                        }>
                        <option value=''>None</option>
                        {VISUAL_EFFECT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <h5
                      className='card-title'
                      style={{ border: 'none', marginTop: '1rem' }}>
                      Jumpscare suite
                    </h5>
                    <div className='field-group'>
                      <label>Type</label>
                      <select
                        value={currentNode.jumpscare?.type || ''}
                        onChange={(e) =>
                          updateNodeField('jumpscare', {
                            ...currentNode.jumpscare,
                            type: e.target.value,
                          })
                        }>
                        <option value=''>None</option>
                        <option value='image'>Image URL</option>
                        <option value='sprite'>NPC Sprite</option>
                        <option value='text'>Flash Text</option>
                        <option value='glitch'>Full Glitch</option>
                      </select>
                    </div>
                    {currentNode.jumpscare?.type === 'image' && (
                      <div className='field-group'>
                        <label>URL</label>
                        <input
                          value={currentNode.jumpscare.image}
                          onChange={(e) =>
                            updateNodeField('jumpscare', {
                              ...currentNode.jumpscare,
                              image: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                    {currentNode.jumpscare?.type === 'text' && (
                      <div className='field-group'>
                        <label>Flash Text</label>
                        <input
                          value={currentNode.jumpscare.text}
                          onChange={(e) =>
                            updateNodeField('jumpscare', {
                              ...currentNode.jumpscare,
                              text: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                    {currentNode.jumpscare?.type === 'sprite' && (
                      <div className='field-group'>
                        <label>NPC</label>
                        <select
                          value={currentNode.jumpscare.character}
                          onChange={(e) =>
                            updateNodeField('jumpscare', {
                              ...currentNode.jumpscare,
                              character: e.target.value,
                            })
                          }>
                          {charKeys.map((k) => (
                            <option key={k} value={k}>
                              {k}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {currentNode.jumpscare?.type && (
                      <div className='field-group'>
                        <label>SFX Key</label>
                        <input
                          value={currentNode.jumpscare.sfx}
                          onChange={(e) =>
                            updateNodeField('jumpscare', {
                              ...currentNode.jumpscare,
                              sfx: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      {isTemplateModalVisible && (
        <TemplateModal
          templates={templates}
          onSelect={handleAddTemplate}
          onClose={() => setIsTemplateModalVisible(false)}
        />
      )}
    </div>
  );
};
