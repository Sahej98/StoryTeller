import React from 'react';

const InventoryItem = ({ item, def }) => (
  <li className='inventory-item'>
    <h3 className='inventory-item-name'>{def.name}</h3>
    <p className='inventory-item-desc'>{def.description}</p>
  </li>
);

export const InventoryModal = ({
  isVisible,
  onClose,
  inventory,
  itemDefs,
  discoveredLoreCount,
  onOpenJournal,
}) => {
  if (!isVisible) return null;

  return (
    <div className='settings-modal-overlay' onClick={onClose}>
      <div className='settings-panel' onClick={(e) => e.stopPropagation()}>
        <h2>Inventory</h2>
        {discoveredLoreCount > 0 && (
          <button className='journal-button' onClick={onOpenJournal}>
            View Journal ({discoveredLoreCount}{' '}
            {discoveredLoreCount === 1 ? 'entry' : 'entries'})
          </button>
        )}
        {inventory.length > 0 ? (
          <ul className='inventory-modal-list'>
            {inventory.map((itemKey) =>
              itemDefs[itemKey] ? (
                <InventoryItem
                  key={itemKey}
                  item={itemKey}
                  def={itemDefs[itemKey]}
                />
              ) : null
            )}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', color: '#888' }}>
            Your pockets are empty.
          </p>
        )}
      </div>
    </div>
  );
};
