import React from 'react';

const JournalEntry = ({ entry }) => (
  <li className='journal-entry'>
    <h3 className='journal-entry-title'>{entry.title}</h3>
    <p className='journal-entry-content'>{entry.content}</p>
  </li>
);

export const JournalModal = ({
  isVisible,
  onClose,
  discoveredLore,
  itemDefs,
}) => {
  if (!isVisible) return null;

  const loreEntries = discoveredLore
    .map((key) => itemDefs[key]?.lore)
    .filter(Boolean);

  return (
    <div className='settings-modal-overlay' onClick={onClose}>
      <div
        className='settings-panel journal-panel'
        onClick={(e) => e.stopPropagation()}>
        <h2>Journal</h2>
        {loreEntries.length > 0 ? (
          <ul className='journal-entry-list'>
            {loreEntries.map((entry, index) => (
              <JournalEntry key={index} entry={entry} />
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', color: '#888' }}>
            No entries yet. Keep exploring.
          </p>
        )}
      </div>
    </div>
  );
};
