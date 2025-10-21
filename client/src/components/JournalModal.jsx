import React, { useState } from 'react';

const JournalEntry = ({ entry }) => (
  <li className='journal-entry'>
    <h3 className='journal-title'>{entry.title}</h3>
    <p className='journal-content'>{entry.content}</p>
  </li>
);

const CharacterEntry = ({ character }) => (
  <li className='journal-entry'>
    <h3 className='journal-title'>{character.name}</h3>
    {/* We can add character descriptions to common.js later */}
  </li>
);

export const JournalModal = ({
  isVisible,
  onClose,
  discoveredLore,
  discoveredCharacters,
  itemDefs,
  characterDefs,
}) => {
  if (!isVisible) return null;

  const [activeTab, setActiveTab] = useState('lore');

  const loreEntries = discoveredLore
    .map((key) => itemDefs[key]?.lore)
    .filter(Boolean);
  const characterEntries = discoveredCharacters
    .map((key) => characterDefs[key])
    .filter(Boolean);

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-panel' onClick={(e) => e.stopPropagation()}>
        <h2>Journal</h2>
        <div className='journal-tabs'>
          <button
            className={`journal-tab ${activeTab === 'lore' ? 'active' : ''}`}
            onClick={() => setActiveTab('lore')}>
            Lore
          </button>
          <button
            className={`journal-tab ${
              activeTab === 'characters' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('characters')}>
            Characters
          </button>
        </div>

        {activeTab === 'lore' &&
          (loreEntries.length > 0 ? (
            <ul className='journal-entry-list'>
              {loreEntries.map((entry, index) => (
                <JournalEntry key={index} entry={entry} />
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: 'center', color: '#888' }}>
              No lore entries yet. Keep exploring.
            </p>
          ))}

        {activeTab === 'characters' &&
          (characterEntries.length > 0 ? (
            <ul className='journal-entry-list'>
              {characterEntries.map((char, index) => (
                <CharacterEntry key={index} character={char} />
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: 'center', color: '#888' }}>
              You haven't met anyone yet.
            </p>
          ))}
      </div>
    </div>
  );
};
