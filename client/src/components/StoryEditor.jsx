import React, { useState, useEffect, useRef } from 'react';
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
  AlertTriangle,
  Clock,
  Skull,
} from 'lucide-react';
import { TemplateModal } from './TemplateModal.jsx';
import { templates } from '../data/editorTemplates.js';

const NEW_STORY_TEMPLATE = {
  id: `custom_${Date.now()}`,
  title: 'My First Story',
  description: 'A short tutorial story created in the Storyteller editor.',
  accentColor: '#FFFFFF',
  published: false,
  thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
  cautionScreen: {
    enabled: false,
    title: 'WARNING',
    text: 'This story contains content that may be disturbing. Player discretion is advised.',
  },
  storyDetails: {
    title: 'My First Story',
    chapters: {
      chapter1: {
        title: 'The Beginning',
        number: 1,
        flavorText: 'A short tutorial chapter.',
      },
    },
  },
  storyData: {
    chapter1: {
      start: {
        speaker: 'Narrator',
        text: 'Welcome to the Storyteller editor! This is your first node. You can edit this text in the "Dialogue" tab. Let\'s make a choice.',
        choices: [{ text: 'Continue...', next: 'choice_node' }],
      },
      choice_node: {
        speaker: 'Narrator',
        text: 'Choices lead to other nodes. This choice has an "effect" that will change your stats. Check the "Branching" tab to see how it\'s set up.',
        choices: [
          {
            text: 'Decrease my sanity by 10.',
            next: 'effect_node',
            effects: { stats: { sanity: -10 } },
          },
          { text: 'Just continue.', next: 'character_node' },
        ],
      },
      effect_node: {
        speaker: 'Narrator',
        text: "It worked! Your sanity would have decreased. Effects can change stats, give items, or set story flags. Next, let's meet a character.",
        choices: [{ text: 'Okay.', next: 'character_node' }],
      },
      character_node: {
        speaker: 'old_man',
        text: 'Hello there, traveler. To make me speak, my key "old_man" was put in the "Speaker Key". Go to the "Characters" tab to create your own characters!',
        choices: [{ text: 'Interesting!', next: 'item_node' }],
      },
      item_node: {
        speaker: 'Narrator',
        text: 'This node gives you a "key" for your inventory. You can see this effect in the "Effects" tab. The item itself is defined in the "Items" tab.',
        effects: { inventory: { add: 'tutorial_key' } },
        choices: [{ text: 'Get the key!', next: 'jumpscare_node' }],
      },
      jumpscare_node: {
        speaker: 'Narrator',
        text: 'This node has a jumpscare! Go to the "Visuals" tab to see how it\'s configured. Brace yourself...',
        jumpscare: { type: 'text', text: 'BOO!', sfx: 'jumpscare' },
        choices: [{ text: '...that was scary.', next: 'requirement_node' }],
      },
      requirement_node: {
        speaker: 'Narrator',
        text: 'Now you\'ve reached a locked door. One choice requires the "tutorial_key" to be in your inventory. You can see this "requirement" in the "Branching" tab.',
        choices: [
          {
            text: 'Use the key.',
            next: 'end_node',
            requires: { inventory: ['tutorial_key'] },
            effects: { inventory: { remove: 'tutorial_key' } },
          },
          {
            text: "This choice is disabled if you don't have the key.",
            next: 'end_node',
          },
        ],
      },
      end_node: {
        speaker: 'Narrator',
        text: 'You\'ve learned the basics! Explore the "Add Template" button to see more examples!',
        choices: [{ text: 'End the Tutorial Chapter.', next: null }],
      },
    },
  },
  characters: {
    player: { name: 'You', sprite: '/images/the_asylum/main_char_sprite.png' },
    old_man: {
      name: 'Old Man',
      sprite: 'https://i.imgur.com/8aZ5Y7r.png',
    },
    ally: {
      name: 'Ally',
      sprite: '',
    },
  },
  items: {
    tutorial_key: {
      name: 'Tutorial Key',
      description: 'A key used in the tutorial story.',
    },
    rusty_key: { name: 'Rusty Key', description: 'An old, rusty key.' },
    holy_relic: {
      name: 'Holy Relic',
      description: 'A sacred object that glows faintly.',
    },
  },
};

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
      if (text !== formatted) {
        setText(formatted);
      }
    } catch (e) {
      // This might happen if value is invalid, though it shouldn't be
    }
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

  const textareaStyle = {
    fontFamily: 'Courier New, Courier, monospace',
    fontSize: '0.85rem',
    backgroundColor: '#0c0a08',
    borderColor: error ? 'var(--error-color)' : '#3a2a1a',
    color: error ? '#ff8a80' : '#f2c97d',
    lineHeight: 1.5,
    whiteSpace: 'pre',
    tabSize: 2,
    minHeight: height,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <textarea
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        disabled={disabled}
        style={textareaStyle}
      />
      {error && (
        <small style={{ color: 'var(--error-color)', fontSize: '0.7rem' }}>
          {error}
        </small>
      )}
    </div>
  );
};

const TEXT_EFFECT_OPTIONS = [
  'red',
  'shake',
  'whisper',
  'shock',
  'anger',
  'fear',
  'tremble',
];
const JUMPSCARE_TYPES = ['image', 'sprite', 'text', 'glitch'];

export const StoryEditor = ({
  storyToEdit,
  onBack,
  onSave,
  gameData,
  showAlert,
}) => {
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeChapterKey, setActiveChapterKey] = useState('');
  const [activeNodeKey, setActiveNodeKey] = useState('');
  const [activeView, setActiveView] = useState('nodes'); // story, chapters, nodes
  const [activeStorySubTab, setActiveStorySubTab] = useState('settings');
  const [activeNodeSubTab, setActiveNodeSubTab] = useState('dialogue'); // dialogue, branching, etc.
  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [lastAddedTemplateKeys, setLastAddedTemplateKeys] = useState([]);
  const originalStory = useRef(null);

  useEffect(() => {
    const initializeStory = async () => {
      setIsLoading(true);
      let storyDataToSet;
      if (storyToEdit) {
        if (!storyToEdit.storyData) {
          try {
            const response = await fetch(`/api/stories/${storyToEdit.id}`);
            if (!response.ok)
              throw new Error('Failed to fetch full story data');
            storyDataToSet = await response.json();
          } catch (error) {
            console.error(error);
            showAlert(
              'Error loading story for editing.',
              'error',
              'Loading Error',
            );
            onBack();
            return;
          }
        } else {
          storyDataToSet = JSON.parse(JSON.stringify(storyToEdit));
        }
      } else {
        storyDataToSet = { ...NEW_STORY_TEMPLATE, id: `custom_${Date.now()}` };
      }

      setStory(storyDataToSet);
      originalStory.current = JSON.stringify(storyDataToSet); // For dirty check
      setIsDirty(false);

      const firstChapterKey =
        Object.keys(storyDataToSet.storyData || {})[0] || '';
      setActiveChapterKey(firstChapterKey);

      if (firstChapterKey) {
        const firstNodeKey =
          Object.keys(storyDataToSet.storyData[firstChapterKey] || {})[0] || '';
        setActiveNodeKey(firstNodeKey);
      } else {
        setActiveNodeKey('');
      }

      setIsLoading(false);
    };

    initializeStory();
  }, [storyToEdit, onBack]);

  const updateStory = (updater) => {
    setStory((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (JSON.stringify(next) !== originalStory.current) {
        setIsDirty(true);
      }
      return next;
    });
  };

  const handleSaveAndExit = async () => {
    const success = await onSave(story);
    if (success) {
      originalStory.current = JSON.stringify(story);
      setIsDirty(false);
      onBack();
    }
  };

  const handleAttemptBack = () => {
    if (isDirty) {
      showAlert(
        'Your manuscript has been altered, but the changes have not yet been committed to the archives. Will you save your work for posterity, or cast it into the void?',
        'default',
        "A Scribe's Dilemma",
        null,
        [
          { text: 'Just Exit', action: onBack, class: 'danger' },
          { text: 'Save & Exit', action: handleSaveAndExit, class: 'primary' },
        ],
      );
    } else {
      onBack();
    }
  };

  const currentNode = story?.storyData?.[activeChapterKey]?.[activeNodeKey];

  const handleAddTemplate = (templateKey) => {
    if (!templates.nodes[templateKey]) return;

    const timestamp = Date.now();
    const template = templates.nodes[templateKey];
    const newNodes = {};
    const keyMap = {}; // Maps old keys to new unique keys

    for (const oldKey in template.nodes) {
      const newKey = `${oldKey}_${timestamp}`;
      keyMap[oldKey] = newKey;
      newNodes[newKey] = { ...template.nodes[oldKey] };
    }

    for (const newKey in newNodes) {
      if (newNodes[newKey].choices) {
        newNodes[newKey].choices = newNodes[newKey].choices.map((choice) => {
          if (choice.next && keyMap[choice.next]) {
            return { ...choice, next: keyMap[choice.next] };
          }
          return choice;
        });
      }
    }

    updateStory((prev) => {
      const nextStory = JSON.parse(JSON.stringify(prev));
      if (!nextStory.storyData[activeChapterKey]) {
        nextStory.storyData[activeChapterKey] = {};
      }
      Object.assign(nextStory.storyData[activeChapterKey], newNodes);
      return nextStory;
    });

    const addedKeys = Object.values(keyMap);
    setLastAddedTemplateKeys(addedKeys);

    const firstTemplateNodeKey = Object.keys(keyMap)[0];
    if (firstTemplateNodeKey) {
      setActiveNodeKey(keyMap[firstTemplateNodeKey]);
    }

    setIsTemplateModalVisible(false);
  };

  const handleRemoveLastTemplate = () => {
    if (lastAddedTemplateKeys.length === 0) return;

    updateStory((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const chapter = next.storyData[activeChapterKey];

      lastAddedTemplateKeys.forEach((key) => {
        delete chapter[key];
      });

      Object.values(chapter).forEach((node) => {
        if (node.choices) {
          node.choices = node.choices.filter(
            (c) => !lastAddedTemplateKeys.includes(c.next),
          );
        }
      });

      return next;
    });

    setLastAddedTemplateKeys([]);
    if (lastAddedTemplateKeys.includes(activeNodeKey)) {
      setActiveNodeKey('start');
    }
  };

  const addChapter = () => {
    showAlert(
      'Enter a unique key for the new chapter (e.g., chapter2).',
      'default',
      'New Chapter',
      (key) => {
        if (!key || story.storyData[key]) {
          showAlert('Invalid or duplicate chapter key.', 'error', 'Error');
          return;
        }
        updateStory((prev) => {
          const next = JSON.parse(JSON.stringify(prev));
          const newNum = Object.keys(next.storyDetails.chapters).length + 1;
          next.storyDetails.chapters[key] = {
            title: `New Chapter`,
            number: newNum,
            flavorText: '',
          };
          next.storyData[key] = {
            start: {
              speaker: 'Narrator',
              text: 'New chapter begins.',
              choices: [],
            },
          };
          return next;
        });
        setActiveChapterKey(key);
        setActiveNodeKey('start');
      },
      null,
      { label: 'Chapter Key' },
    );
  };

  const deleteChapter = (key) => {
    showAlert(
      `Are you sure you want to delete chapter "${key}"? This cannot be undone.`,
      'error',
      'Confirm Deletion',
      () => {
        updateStory((prev) => {
          const next = JSON.parse(JSON.stringify(prev));
          delete next.storyDetails.chapters[key];
          delete next.storyData[key];
          return next;
        });
        if (activeChapterKey === key)
          setActiveChapterKey(Object.keys(story.storyData)[0] || '');
      },
    );
  };

  const handleChapterUpdate = (key, field, value) => {
    updateStory((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (field === 'number') {
        next.storyDetails.chapters[key][field] = parseInt(value, 10) || 0;
      } else {
        next.storyDetails.chapters[key][field] = value;
      }
      return next;
    });
  };

  const addNode = () => {
    showAlert(
      'Enter a unique ID for the new node:',
      'default',
      'New Node',
      (key) => {
        if (!key || story.storyData[activeChapterKey][key]) {
          showAlert('Invalid or duplicate node ID.', 'error', 'Error');
          return;
        }
        updateStory((prev) => {
          const next = JSON.parse(JSON.stringify(prev));
          next.storyData[activeChapterKey][key] = {
            speaker: 'Narrator',
            text: '',
            choices: [],
          };
          return next;
        });
        setActiveNodeKey(key);
      },
      null,
      { label: 'Node ID' },
    );
  };

  const deleteNode = (key) => {
    showAlert(
      `Are you sure you want to delete node "${key}"?`,
      'error',
      'Confirm Deletion',
      () => {
        updateStory((prev) => {
          const next = JSON.parse(JSON.stringify(prev));
          delete next.storyData[activeChapterKey][key];
          Object.values(next.storyData[activeChapterKey]).forEach((node) => {
            if (node.choices)
              node.choices = node.choices.filter((c) => c.next !== key);
          });
          return next;
        });
        if (activeNodeKey === key) setActiveNodeKey('start');
      },
    );
  };

  const renameNode = (oldKey) => {
    showAlert(
      'Enter new unique ID for this node:',
      'default',
      'Rename Node',
      (newKey) => {
        if (
          !newKey ||
          newKey === oldKey ||
          story.storyData[activeChapterKey][newKey]
        ) {
          showAlert('Invalid or duplicate node ID.', 'error', 'Error');
          return;
        }
        updateStory((prev) => {
          const next = JSON.parse(JSON.stringify(prev));
          const nodeData = next.storyData[activeChapterKey][oldKey];
          delete next.storyData[activeChapterKey][oldKey];
          next.storyData[activeChapterKey][newKey] = nodeData;
          Object.values(next.storyData[activeChapterKey]).forEach((node) => {
            if (node.choices) {
              node.choices.forEach((c) => {
                if (c.next === oldKey) c.next = newKey;
              });
            }
          });
          return next;
        });
        setActiveNodeKey(newKey);
      },
      null,
      { label: 'New Node ID', initialValue: oldKey },
    );
  };

  const updateNodeField = (field, value) => {
    updateStory((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.storyData[activeChapterKey][activeNodeKey]) return prev;

      const updatedValue =
        value === null ||
        value === '' ||
        (value === 0 &&
          (field === 'timer' ||
            field === 'jumpscare' ||
            field === 'effects' ||
            field.includes('requires') ||
            field === 'nextOnDeath'))
          ? undefined
          : value;
      if (updatedValue === undefined) {
        delete next.storyData[activeChapterKey][activeNodeKey][field];
      } else {
        next.storyData[activeChapterKey][activeNodeKey][field] = updatedValue;
      }

      return next;
    });
  };

  const addChoice = () =>
    updateNodeField('choices', [
      ...(currentNode.choices || []),
      { text: 'New Choice', next: '' },
    ]);
  const updateChoice = (index, field, value) => {
    const newChoices = [...(currentNode.choices || [])];
    const updatedValue = value === null ? undefined : value;
    if (updatedValue === undefined) {
      delete newChoices[index][field];
    } else {
      newChoices[index] = { ...newChoices[index], [field]: value };
    }
    updateNodeField('choices', newChoices);
  };
  const deleteChoice = (index) =>
    updateNodeField(
      'choices',
      (currentNode.choices || []).filter((_, i) => i !== index),
    );

  const addTextEffect = () =>
    updateNodeField('textEffects', [
      ...(currentNode.textEffects || []),
      { word: '', effect: '' },
    ]);
  const updateTextEffect = (index, field, value) => {
    const newEffects = [...(currentNode.textEffects || [])];
    newEffects[index] = { ...newEffects[index], [field]: value };
    updateNodeField('textEffects', newEffects);
  };
  const deleteTextEffect = (index) =>
    updateNodeField(
      'textEffects',
      (currentNode.textEffects || []).filter((_, i) => i !== index),
    );

  const addAmbientSfx = () =>
    updateNodeField('ambientSfx', [
      ...(currentNode.ambientSfx || []),
      { triggerWord: '', sfx: '' },
    ]);
  const updateAmbientSfx = (index, field, value) => {
    const newSfx = [...(currentNode.ambientSfx || [])];
    newSfx[index] = { ...newSfx[index], [field]: value };
    updateNodeField('ambientSfx', newSfx);
  };
  const deleteAmbientSfx = (index) =>
    updateNodeField(
      'ambientSfx',
      (currentNode.ambientSfx || []).filter((_, i) => i !== index),
    );

  const addCharacter = () => {
    showAlert(
      'Enter a unique key for the new character (e.g., new_char).',
      'default',
      'New Character',
      (key) => {
        if (!key || story.characters[key]) {
          showAlert('Invalid or duplicate character key.', 'error', 'Error');
          return;
        }
        updateStory((prev) => {
          const next = JSON.parse(JSON.stringify(prev));
          next.characters[key] = { name: 'New Character', sprite: '' };
          return next;
        });
      },
      null,
      { label: 'Character Key' },
    );
  };

  const updateCharacter = (key, field, value) => {
    updateStory((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.characters[key][field] = value;
      return next;
    });
  };

  const deleteCharacter = (key) => {
    if (key === 'player') {
      showAlert(
        'The "player" character is essential and cannot be deleted.',
        'info',
        'Action Blocked',
      );
      return;
    }
    showAlert(
      `Are you sure you want to delete character "${key}"?`,
      'error',
      'Confirm Deletion',
      () => {
        updateStory((prev) => {
          const next = JSON.parse(JSON.stringify(prev));
          delete next.characters[key];
          return next;
        });
      },
    );
  };

  const addItem = () => {
    showAlert(
      'Enter a unique key for the new item (e.g., new_item).',
      'default',
      'New Item',
      (key) => {
        if (!key || story.items[key]) {
          showAlert('Invalid or duplicate item key.', 'error', 'Error');
          return;
        }
        updateStory((prev) => {
          const next = JSON.parse(JSON.stringify(prev));
          next.items[key] = {
            name: 'New Item',
            description: '',
            lore: { title: '', content: '' },
          };
          return next;
        });
      },
      null,
      { label: 'Item Key' },
    );
  };

  const updateItem = (key, field, value, isLore = false) => {
    updateStory((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (isLore) {
        if (!next.items[key].lore) next.items[key].lore = {};
        next.items[key].lore[field] = value;
      } else {
        next.items[key][field] = value;
      }
      return next;
    });
  };

  const deleteItem = (key) => {
    showAlert(
      `Are you sure you want to delete item "${key}"?`,
      'error',
      'Confirm Deletion',
      () => {
        updateStory((prev) => {
          const next = JSON.parse(JSON.stringify(prev));
          delete next.items[key];
          return next;
        });
      },
    );
  };

  if (isLoading || !story) {
    return (
      <div
        className='editor-container'
        style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ fontFamily: 'var(--title-font)', fontSize: '1.5rem' }}>
          Loading Story Editor...
        </p>
      </div>
    );
  }

  return (
    <div className='editor-container'>
      <header className='editor-header'>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={handleAttemptBack}
            className='themed-button secondary'>
            <ArrowLeft size={18} /> Back
          </button>
          <input
            className='editor-title-input'
            value={story.title}
            onChange={(e) =>
              updateStory({
                ...story,
                title: e.target.value,
                storyDetails: { ...story.storyDetails, title: e.target.value },
              })
            }
          />
        </div>
        <button onClick={handleSaveAndExit} className='themed-button primary'>
          <Save size={18} /> Save & Exit
        </button>
      </header>
      <main className='editor-layout'>
        <aside className='editor-sidebar'>
          <div className='sidebar-content'>
            <div className='sidebar-section'>
              <h4 className='sidebar-section-title'>Active Chapter</h4>
              <div className='field-group' style={{ marginBottom: '0' }}>
                <select
                  value={activeChapterKey}
                  onChange={(e) => {
                    setActiveChapterKey(e.target.value);
                    setActiveNodeKey('start');
                  }}>
                  {Object.keys(story.storyDetails.chapters).map((key) => (
                    <option key={key} value={key}>
                      {story.storyDetails.chapters[key].title || key}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              className='sidebar-section'
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h4 className='sidebar-section-title'>
                Nodes
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {lastAddedTemplateKeys.length > 0 && (
                    <button
                      onClick={handleRemoveLastTemplate}
                      className='themed-button secondary small'
                      title='Undo Last Template'>
                      <Undo2 size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsTemplateModalVisible(true);
                      setActiveView('nodes');
                    }}
                    className='themed-button secondary small'
                    title='Add from Template'>
                    <Code size={14} />
                  </button>
                  <button
                    onClick={() => {
                      addNode();
                      setActiveView('nodes');
                    }}
                    className='themed-button secondary small'
                    title='Add Blank Node'>
                    <Plus size={14} />
                  </button>
                </div>
              </h4>
              <div className='node-list' style={{ flex: 1, overflowY: 'auto' }}>
                {Object.keys(story.storyData[activeChapterKey] || {}).map(
                  (key) => (
                    <div
                      key={key}
                      className={`list-item ${activeNodeKey === key ? 'active' : ''}`}
                      onClick={() => {
                        setActiveNodeKey(key);
                        setActiveView('nodes');
                      }}>
                      <span>{key}</span>
                      <div className='list-item-actions'>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            renameNode(key);
                          }}>
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNode(key);
                          }}
                          className='danger'>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </aside>
        <section className='editor-main'>
          <div className='editor-canvas'>
            <div className='tab-group'>
              {[
                { id: 'story', label: 'Story', icon: Library },
                { id: 'chapters', label: 'Chapters', icon: BookCopy },
                { id: 'nodes', label: 'Nodes', icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`editor-tab ${activeView === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveView(tab.id)}>
                  {React.createElement(tab.icon, { size: 16 })} {tab.label}
                </button>
              ))}
            </div>

            {activeView === 'story' && (
              <>
                <div className='tab-group'>
                  {[
                    { id: 'settings', label: 'Settings', icon: SettingsIcon },
                    { id: 'characters', label: 'Characters', icon: Users },
                    { id: 'items', label: 'Items', icon: Box },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`editor-tab small ${activeStorySubTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveStorySubTab(tab.id)}>
                      {React.createElement(tab.icon, { size: 14 })} {tab.label}
                    </button>
                  ))}
                </div>
                {activeStorySubTab === 'settings' && (
                  <div className='editor-card'>
                    <h5 className='card-title'>Story Settings</h5>
                    <div className='field-group'>
                      <label>Story Title</label>
                      <input
                        value={story.title}
                        onChange={(e) =>
                          updateStory({
                            ...story,
                            title: e.target.value,
                            storyDetails: {
                              ...story.storyDetails,
                              title: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className='field-group'>
                      <label>Description</label>
                      <textarea
                        value={story.description}
                        onChange={(e) =>
                          updateStory({ ...story, description: e.target.value })
                        }
                      />
                    </div>
                    <div className='field-group'>
                      <label>Thumbnail URL</label>
                      <input
                        value={story.thumbnail}
                        onChange={(e) =>
                          updateStory({ ...story, thumbnail: e.target.value })
                        }
                      />
                    </div>
                    <div className='field-group'>
                      <label>Accent Color</label>
                      <div className='color-picker-container'>
                        <div className='color-swatch-wrapper'>
                          <div
                            className='color-swatch'
                            style={{
                              backgroundColor: story.accentColor || '#FFFFFF',
                            }}></div>
                          <input
                            type='color'
                            className='color-picker-input'
                            value={story.accentColor || '#FFFFFF'}
                            onChange={(e) =>
                              updateStory({
                                ...story,
                                accentColor: e.target.value,
                              })
                            }
                          />
                        </div>
                        <input
                          type='text'
                          value={story.accentColor || '#FFFFFF'}
                          onChange={(e) =>
                            updateStory({
                              ...story,
                              accentColor: e.target.value,
                            })
                          }
                          placeholder='#FFFFFF'
                          style={{ flex: 1 }}
                        />
                      </div>
                    </div>
                    <div className='field-group'>
                      <label
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: '0.5rem',
                          textTransform: 'none',
                          opacity: 1,
                        }}>
                        <input
                          type='checkbox'
                          checked={story.cautionScreen?.enabled || false}
                          onChange={(e) =>
                            updateStory((prev) => ({
                              ...prev,
                              cautionScreen: {
                                ...prev.cautionScreen,
                                enabled: e.target.checked,
                              },
                            }))
                          }
                        />{' '}
                        Enable Caution Screen
                      </label>
                    </div>
                    {story.cautionScreen?.enabled && (
                      <div
                        style={{
                          borderLeft: '2px solid #ffab40',
                          paddingLeft: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1.5rem',
                        }}>
                        <div className='field-group'>
                          <label>Caution Screen Title</label>
                          <input
                            value={story.cautionScreen.title || ''}
                            onChange={(e) =>
                              updateStory((prev) => ({
                                ...prev,
                                cautionScreen: {
                                  ...prev.cautionScreen,
                                  title: e.target.value,
                                },
                              }))
                            }
                          />
                        </div>
                        <div className='field-group'>
                          <label>Caution Screen Text</label>
                          <textarea
                            value={story.cautionScreen.text || ''}
                            onChange={(e) =>
                              updateStory((prev) => ({
                                ...prev,
                                cautionScreen: {
                                  ...prev.cautionScreen,
                                  text: e.target.value,
                                },
                              }))
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeStorySubTab === 'characters' && (
                  <div className='editor-card'>
                    <div
                      className='choices-header'
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                      }}>
                      <h5
                        className='card-title'
                        style={{ margin: 0, border: 'none' }}>
                        Characters
                      </h5>
                      <button
                        onClick={addCharacter}
                        className='themed-button secondary small'>
                        <Plus size={14} /> Add Character
                      </button>
                    </div>
                    {Object.entries(story.characters || {}).map(
                      ([key, char]) => (
                        <div key={key} className='choice-builder'>
                          <div className='choice-builder-header'>
                            <h6>{key}</h6>
                            <button
                              className='btn-danger'
                              onClick={() => deleteCharacter(key)}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className='field-row'>
                            <div className='field-group'>
                              <label>Name</label>
                              <input
                                value={char.name}
                                onChange={(e) =>
                                  updateCharacter(key, 'name', e.target.value)
                                }
                              />
                            </div>
                            <div className='field-group'>
                              <label>Sprite URL</label>
                              <input
                                value={char.sprite}
                                onChange={(e) =>
                                  updateCharacter(key, 'sprite', e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                )}
                {activeStorySubTab === 'items' && (
                  <div className='editor-card'>
                    <div
                      className='choices-header'
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                      }}>
                      <h5
                        className='card-title'
                        style={{ margin: 0, border: 'none' }}>
                        Items & Lore
                      </h5>
                      <button
                        onClick={addItem}
                        className='themed-button secondary small'>
                        <Plus size={14} /> Add Item
                      </button>
                    </div>
                    {Object.entries(story.items || {}).map(([key, item]) => (
                      <div key={key} className='choice-builder'>
                        <div className='choice-builder-header'>
                          <h6>{key}</h6>
                          <button
                            className='btn-danger'
                            onClick={() => deleteItem(key)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className='field-group'>
                          <label>Name</label>
                          <input
                            value={item.name}
                            onChange={(e) =>
                              updateItem(key, 'name', e.target.value)
                            }
                          />
                        </div>
                        <div className='field-group'>
                          <label>Description</label>
                          <textarea
                            value={item.description}
                            onChange={(e) =>
                              updateItem(key, 'description', e.target.value)
                            }
                          />
                        </div>
                        <div className='field-row'>
                          <div className='field-group'>
                            <label>Lore Title (Optional)</label>
                            <input
                              value={item.lore?.title || ''}
                              onChange={(e) =>
                                updateItem(key, 'title', e.target.value, true)
                              }
                            />
                          </div>
                          <div className='field-group'>
                            <label>Lore Content (Optional)</label>
                            <textarea
                              value={item.lore?.content || ''}
                              onChange={(e) =>
                                updateItem(key, 'content', e.target.value, true)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeView === 'chapters' && (
              <div className='editor-card'>
                <div
                  className='choices-header'
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}>
                  <h5
                    className='card-title'
                    style={{ margin: 0, border: 'none' }}>
                    Manage Chapters
                  </h5>
                  <button
                    onClick={addChapter}
                    className='themed-button secondary small'>
                    <Plus size={14} /> Add Chapter
                  </button>
                </div>
                {Object.entries(story.storyDetails.chapters || {})
                  .sort(([, a], [, b]) => a.number - b.number)
                  .map(([key, chap]) => (
                    <div key={key} className='choice-builder'>
                      <div className='choice-builder-header'>
                        <h6>{key}</h6>
                        <button
                          className='btn-danger'
                          onClick={() => deleteChapter(key)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className='field-row'>
                        <div className='field-group'>
                          <label>Title</label>
                          <input
                            value={chap.title}
                            onChange={(e) =>
                              handleChapterUpdate(key, 'title', e.target.value)
                            }
                          />
                        </div>
                        <div
                          className='field-group'
                          style={{ maxWidth: '100px' }}>
                          <label>Number</label>
                          <input
                            type='number'
                            value={chap.number}
                            onChange={(e) =>
                              handleChapterUpdate(key, 'number', e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className='field-group'>
                        <label>Flavor Text (for chapter select screen)</label>
                        <textarea
                          value={chap.flavorText}
                          onChange={(e) =>
                            handleChapterUpdate(
                              key,
                              'flavorText',
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {activeView === 'nodes' && (
              <>
                {!activeNodeKey || !currentNode ? (
                  <div
                    className='editor-card'
                    style={{ textAlign: 'center', padding: '4rem' }}>
                    Select a node from the sidebar to begin editing.
                  </div>
                ) : (
                  <>
                    <div className='tab-group'>
                      {[
                        {
                          id: 'dialogue',
                          label: 'Dialogue',
                          icon: MessageSquare,
                        },
                        { id: 'branching', label: 'Branching', icon: ListTree },
                        { id: 'effects', label: 'Effects', icon: Zap },
                        { id: 'visuals', label: 'Visuals', icon: Palette },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          className={`editor-tab small ${activeNodeSubTab === tab.id ? 'active' : ''}`}
                          onClick={() => setActiveNodeSubTab(tab.id)}>
                          {React.createElement(tab.icon, { size: 14 })}{' '}
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {activeNodeSubTab === 'dialogue' && (
                      <>
                        <div className='editor-card'>
                          <h5 className='card-title'>Dialogue</h5>
                          <div className='field-group'>
                            <label>Speaker Key</label>
                            <select
                              value={currentNode.speaker || ''}
                              onChange={(e) =>
                                updateNodeField('speaker', e.target.value)
                              }>
                              <option value=''>Narrator</option>
                              {Object.keys(story.characters || {}).map((k) => (
                                <option key={k} value={k}>
                                  {k}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className='field-group'>
                            <label>Dialogue Text</label>
                            <textarea
                              value={currentNode.text || ''}
                              onChange={(e) =>
                                updateNodeField('text', e.target.value)
                              }
                            />
                          </div>
                          <div className='field-group'>
                            <label>Revisit Text (Optional)</label>
                            <textarea
                              value={currentNode.revisitText || ''}
                              placeholder='Alternate text for when player re-enters this node.'
                              onChange={(e) =>
                                updateNodeField('revisitText', e.target.value)
                              }
                            />
                          </div>
                          <div className='field-group'>
                            <label>Revisit Speaker Key (Optional)</label>
                            <select
                              value={currentNode.revisitSpeaker || ''}
                              onChange={(e) =>
                                updateNodeField(
                                  'revisitSpeaker',
                                  e.target.value,
                                )
                              }>
                              <option value=''>(Same as original)</option>
                              {Object.keys(story.characters || {}).map((k) => (
                                <option key={k} value={k}>
                                  {k}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className='editor-card'>
                          <div
                            className='choices-header'
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <h5
                              className='card-title'
                              style={{ margin: 0, border: 'none' }}>
                              Text Effects
                            </h5>
                            <button
                              onClick={addTextEffect}
                              className='themed-button secondary small'>
                              <Plus size={14} /> Add
                            </button>
                          </div>
                          {(currentNode.textEffects || []).map((fx, i) => (
                            <div key={i} className='choice-builder'>
                              <div className='field-row'>
                                <div className='field-group'>
                                  <label>Word/Phrase</label>
                                  <input
                                    value={fx.word}
                                    onChange={(e) =>
                                      updateTextEffect(
                                        i,
                                        'word',
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div className='field-group'>
                                  <label>Effect</label>
                                  <select
                                    value={fx.effect}
                                    onChange={(e) =>
                                      updateTextEffect(
                                        i,
                                        'effect',
                                        e.target.value,
                                      )
                                    }>
                                    {TEXT_EFFECT_OPTIONS.map((opt) => (
                                      <option key={opt} value={opt}>
                                        {opt}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <button
                                className='btn-danger'
                                onClick={() => deleteTextEffect(i)}
                                style={{ alignSelf: 'flex-end' }}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {activeNodeSubTab === 'branching' && (
                      <div className='editor-card'>
                        <div
                          className='choices-header'
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                          }}>
                          <h5
                            className='card-title'
                            style={{ margin: 0, border: 'none' }}>
                            Choices
                          </h5>
                          <button
                            onClick={addChoice}
                            className='themed-button secondary small'>
                            <Plus size={14} /> Add Choice
                          </button>
                        </div>
                        <div
                          className='editor-card'
                          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                          <h5
                            className='card-title'
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                            }}>
                            <Clock size={16} /> Timed Event
                          </h5>
                          <div className='field-row'>
                            <div className='field-group'>
                              <label>Timer (seconds)</label>
                              <input
                                type='number'
                                min='0'
                                value={currentNode.timer || ''}
                                placeholder='0'
                                onChange={(e) =>
                                  updateNodeField(
                                    'timer',
                                    e.target.value
                                      ? parseInt(e.target.value, 10)
                                      : undefined,
                                  )
                                }
                              />
                              <small
                                style={{
                                  color: '#6a5a4a',
                                  fontSize: '0.7rem',
                                }}>
                                Set to 0 to disable. If time runs out, the
                                default choice is made.
                              </small>
                            </div>
                            <div className='field-group'>
                              <label>Default Choice Index</label>
                              <input
                                type='number'
                                min='0'
                                value={currentNode.defaultChoiceIndex || ''}
                                placeholder='0'
                                onChange={(e) =>
                                  updateNodeField(
                                    'defaultChoiceIndex',
                                    e.target.value
                                      ? parseInt(e.target.value, 10)
                                      : undefined,
                                  )
                                }
                              />
                              <small
                                style={{
                                  color: '#6a5a4a',
                                  fontSize: '0.7rem',
                                }}>
                                0 for 1st choice, 1 for 2nd, etc.
                              </small>
                            </div>
                          </div>
                        </div>
                        {(currentNode.choices || []).map((choice, i) => (
                          <div key={i} className='choice-builder'>
                            <div className='choice-builder-header'>
                              <h6>Choice {i + 1}</h6>
                              <button
                                className='btn-danger'
                                onClick={() => deleteChoice(i)}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className='field-group'>
                              <label>Choice Text</label>
                              <input
                                value={choice.text}
                                onChange={(e) =>
                                  updateChoice(i, 'text', e.target.value)
                                }
                              />
                            </div>
                            <div className='field-group'>
                              <label>Next Node Key</label>
                              <select
                                value={choice.next || ''}
                                onChange={(e) =>
                                  updateChoice(i, 'next', e.target.value)
                                }>
                                <option value=''>(End Chapter)</option>
                                <option value='END_STORY'>(End Story)</option>
                                {Object.keys(
                                  story.storyData[activeChapterKey] || {},
                                ).map((k) => (
                                  <option key={k} value={k}>
                                    {k}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className='field-row'>
                              <div className='field-group'>
                                <label>Requirements (JSON)</label>
                                <JsonEditor
                                  value={choice.requires}
                                  onChange={(val) =>
                                    updateChoice(i, 'requires', val)
                                  }
                                  placeholder='{ "stats": {"sanity": 50}, "inventory": ["key"] }'
                                />
                              </div>
                              <div className='field-group'>
                                <label>Effects (JSON)</label>
                                <JsonEditor
                                  value={choice.effects}
                                  onChange={(val) =>
                                    updateChoice(i, 'effects', val)
                                  }
                                  placeholder='{ "stats": {"sanity": -10}, "flags": {"set": "did_a_thing"} }'
                                />
                              </div>
                            </div>
                            <div className='field-group'>
                              <label>Ending (JSON, if next is END_STORY)</label>
                              <JsonEditor
                                value={choice.ending}
                                onChange={(val) =>
                                  updateChoice(i, 'ending', val)
                                }
                                placeholder='{ "key": "good_end", "title": "Freedom", "description": "You escaped.", "thumbnail": "/url/to/image.png" }'
                                disabled={choice.next !== 'END_STORY'}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeNodeSubTab === 'effects' && (
                      <>
                        <div className='editor-card'>
                          <h5 className='card-title'>On-Enter Effects</h5>
                          <div className='field-group'>
                            <label>Effects (JSON)</label>
                            <JsonEditor
                              value={currentNode.effects}
                              onChange={(val) =>
                                updateNodeField('effects', val)
                              }
                              placeholder='{ "stats": {"sanity": -5}, "inventory": {"add": "clue"} }'
                              height='120px'
                            />
                          </div>
                        </div>
                        <div
                          className='editor-card'
                          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                          <h5
                            className='card-title'
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                            }}>
                            <Skull size={16} /> Node Behavior
                          </h5>
                          <div className='field-group'>
                            <label
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '0.5rem',
                                textTransform: 'none',
                                opacity: 1,
                              }}>
                              <input
                                type='checkbox'
                                checked={!!currentNode.isDeath}
                                onChange={(e) =>
                                  updateNodeField(
                                    'isDeath',
                                    e.target.checked ? true : undefined,
                                  )
                                }
                              />{' '}
                              This is a Death Node (Ends the game)
                            </label>
                          </div>
                          {currentNode.isDeath && (
                            <div className='field-group'>
                              <label>Node on "Continue" (Optional)</label>
                              <select
                                value={currentNode.nextOnDeath || ''}
                                onChange={(e) =>
                                  updateNodeField('nextOnDeath', e.target.value)
                                }>
                                <option value=''>
                                  (Restart from checkpoint)
                                </option>
                                {Object.keys(
                                  story.storyData[activeChapterKey] || {},
                                ).map((k) => (
                                  <option key={k} value={k}>
                                    {k}
                                  </option>
                                ))}
                              </select>
                              <small
                                style={{
                                  color: '#6a5a4a',
                                  fontSize: '0.7rem',
                                }}>
                                If set, player will go to this node instead of
                                reloading after death.
                              </small>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {activeNodeSubTab === 'visuals' && (
                      <>
                        <div className='editor-card'>
                          <h5 className='card-title'>Scene</h5>
                          <div className='field-group'>
                            <label>Background URL</label>
                            <input
                              value={currentNode.background || ''}
                              onChange={(e) =>
                                updateNodeField('background', e.target.value)
                              }
                            />
                          </div>
                          <div className='field-row'>
                            <div className='field-group'>
                              <label>BGM</label>
                              <select
                                value={currentNode.bgm || ''}
                                onChange={(e) =>
                                  updateNodeField('bgm', e.target.value)
                                }>
                                <option value=''>(None)</option>
                                {gameData &&
                                  Object.keys(gameData.BGM)
                                    .sort()
                                    .map((bgmKey) => (
                                      <option
                                        key={bgmKey}
                                        value={gameData.BGM[bgmKey]}>
                                        {bgmKey}
                                      </option>
                                    ))}
                              </select>
                            </div>
                            <div className='field-group'>
                              <label>SFX (One-Shot)</label>
                              <select
                                value={currentNode.sfx || ''}
                                onChange={(e) =>
                                  updateNodeField('sfx', e.target.value)
                                }>
                                <option value=''>(None)</option>
                                {gameData &&
                                  Object.keys(gameData.SFX)
                                    .sort()
                                    .map((sfxKey) => (
                                      <option
                                        key={sfxKey}
                                        value={gameData.SFX[sfxKey]}>
                                        {sfxKey}
                                      </option>
                                    ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className='editor-card'>
                          <div
                            className='choices-header'
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <h5
                              className='card-title'
                              style={{ margin: 0, border: 'none' }}>
                              Ambient SFX
                            </h5>
                            <button
                              onClick={addAmbientSfx}
                              className='themed-button secondary small'>
                              <Plus size={14} /> Add
                            </button>
                          </div>
                          {(currentNode.ambientSfx || []).map((sfx, i) => (
                            <div key={i} className='choice-builder'>
                              <div className='field-row'>
                                <div className='field-group'>
                                  <label>Trigger Word/Phrase</label>
                                  <input
                                    value={sfx.triggerWord}
                                    onChange={(e) =>
                                      updateAmbientSfx(
                                        i,
                                        'triggerWord',
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div className='field-group'>
                                  <label>SFX</label>
                                  <select
                                    value={sfx.sfx}
                                    onChange={(e) =>
                                      updateAmbientSfx(i, 'sfx', e.target.value)
                                    }>
                                    <option value=''>Select SFX...</option>
                                    {gameData &&
                                      Object.keys(gameData.SFX)
                                        .sort()
                                        .map((sfxKey) => (
                                          <option
                                            key={sfxKey}
                                            value={gameData.SFX[sfxKey]}>
                                            {sfxKey}
                                          </option>
                                        ))}
                                  </select>
                                </div>
                              </div>
                              <button
                                className='btn-danger'
                                onClick={() => deleteAmbientSfx(i)}
                                style={{ alignSelf: 'flex-end' }}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className='editor-card'>
                          <h5 className='card-title'>Jumpscare</h5>
                          <div
                            className='field-group'
                            style={{ justifyContent: 'center' }}>
                            <label
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                              }}>
                              <input
                                type='checkbox'
                                checked={!!currentNode.jumpscare}
                                onChange={(e) =>
                                  updateNodeField(
                                    'jumpscare',
                                    e.target.checked
                                      ? { type: 'glitch', sfx: '' }
                                      : null,
                                  )
                                }
                              />{' '}
                              Enable Jumpscare
                            </label>
                          </div>
                          {currentNode.jumpscare && (
                            <div className='jumpscare-config-panel'>
                              <div className='field-group'>
                                <label>Type</label>
                                <select
                                  value={currentNode.jumpscare.type || 'glitch'}
                                  onChange={(e) =>
                                    updateNodeField('jumpscare', {
                                      ...currentNode.jumpscare,
                                      type: e.target.value,
                                    })
                                  }>
                                  {JUMPSCARE_TYPES.map((t) => (
                                    <option key={t} value={t}>
                                      {t}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              {currentNode.jumpscare.type === 'image' && (
                                <div className='field-group'>
                                  <label>Image URL</label>
                                  <input
                                    value={currentNode.jumpscare.image || ''}
                                    onChange={(e) =>
                                      updateNodeField('jumpscare', {
                                        ...currentNode.jumpscare,
                                        image: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              )}
                              {currentNode.jumpscare.type === 'sprite' && (
                                <div className='field-group'>
                                  <label>Character Key</label>
                                  <select
                                    value={
                                      currentNode.jumpscare.character || ''
                                    }
                                    onChange={(e) =>
                                      updateNodeField('jumpscare', {
                                        ...currentNode.jumpscare,
                                        character: e.target.value,
                                      })
                                    }>
                                    <option value=''>
                                      Select Character...
                                    </option>
                                    {Object.keys(story.characters || {}).map(
                                      (k) => (
                                        <option key={k} value={k}>
                                          {k}
                                        </option>
                                      ),
                                    )}
                                  </select>
                                </div>
                              )}
                              {currentNode.jumpscare.type === 'text' && (
                                <div className='field-group'>
                                  <label>Text</label>
                                  <input
                                    value={currentNode.jumpscare.text || ''}
                                    onChange={(e) =>
                                      updateNodeField('jumpscare', {
                                        ...currentNode.jumpscare,
                                        text: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              )}
                              <div className='field-group'>
                                <label>SFX Key</label>
                                <select
                                  value={currentNode.jumpscare.sfx || ''}
                                  onChange={(e) =>
                                    updateNodeField('jumpscare', {
                                      ...currentNode.jumpscare,
                                      sfx: e.target.value,
                                    })
                                  }>
                                  <option value=''>Select SFX...</option>
                                  {gameData &&
                                    Object.keys(gameData.SFX)
                                      .sort()
                                      .map((sfxKey) => (
                                        <option key={sfxKey} value={sfxKey}>
                                          {sfxKey}
                                        </option>
                                      ))}
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
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
