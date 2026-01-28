import React, { useState } from 'react';
import { motion } from 'framer-motion';

const JournalEntry = ({ entry }) => (
  <li className='journal-entry'>
    <div className='item-content-wrapper'>
      <h3 className='journal-title'>{entry.title}</h3>
      <p className='journal-content'>{entry.content}</p>
    </div>
  </li>
);

const CharacterEntry = ({ character, relationshipValue }) => {
  const getRelationshipText = (value) => {
    if (value > 50) return 'Devoted';
    if (value > 20) return 'Positive';
    if (value >= -20) return 'Neutral';
    if (value > -50) return 'Negative';
    return 'Hostile';
  };

  return (
    <li className='journal-entry' style={{ flexDirection: 'column' }}>
      <div className='journal-character-header'>
        <h3 className='journal-title' style={{ margin: 0 }}>
          {character.name}
        </h3>
        <span
          className='journal-relationship-status'
          data-status={getRelationshipText(relationshipValue).toLowerCase()}>
          {getRelationshipText(relationshipValue)}
        </span>
      </div>
      {character.lore && (
        <p
          className='journal-content'
          style={{
            marginTop: '0.5rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '0.5rem',
          }}>
          {character.lore}
        </p>
      )}
    </li>
  );
};

export const JournalModal = ({
  onClose,
  discoveredLore,
  discoveredCharacters,
  relationships,
  itemDefs,
  characterDefs,
}) => {
  const [activeTab, setActiveTab] = useState('lore');

  const loreEntries = (discoveredLore || [])
    .map((key) => itemDefs[key]?.lore)
    .filter(Boolean);

  const characterEntries = (discoveredCharacters || [])
    .map((key) => (characterDefs[key] ? { key, ...characterDefs[key] } : null))
    .filter((char) => char && char.name && char.key !== 'player');

  return (
    <motion.div
      className='modal-overlay'
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <motion.div
        className='modal-panel'
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 250 }}>
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

        {activeTab === 'lore' && (
          <ul className='journal-entry-list'>
            {loreEntries.length > 0 ? (
              loreEntries.map((entry, index) => (
                <JournalEntry key={index} entry={entry} />
              ))
            ) : (
              <p
                style={{
                  textAlign: 'center',
                  color: 'var(--secondary-text-color)',
                  fontStyle: 'italic',
                  padding: '2rem',
                }}>
                No lore entries yet. Keep exploring.
              </p>
            )}
          </ul>
        )}

        {activeTab === 'characters' && (
          <ul className='journal-entry-list'>
            {characterEntries.length > 0 ? (
              characterEntries.map((char) => (
                <CharacterEntry
                  key={char.key}
                  character={char}
                  relationshipValue={relationships?.[char.key] || 0}
                />
              ))
            ) : (
              <p
                style={{
                  textAlign: 'center',
                  color: 'var(--secondary-text-color)',
                  fontStyle: 'italic',
                  padding: '2rem',
                }}>
                You haven't met anyone yet.
              </p>
            )}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
};
