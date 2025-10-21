import React from 'react';

const InventoryItem = ({ def }) => (
  <li className='inventory-item'>
    <h3 className='item-name'>{def.name}</h3>
    <p className='item-desc'>{def.description}</p>
  </li>
);

export const InventoryModal = ({ isVisible, onClose, inventory, itemDefs }) => {
  if (!isVisible) return null;

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-panel' onClick={(e) => e.stopPropagation()}>
        <h2>Inventory</h2>
        {inventory && inventory.length > 0 ? (
          <ul className='inventory-modal-list'>
            {inventory.map((itemKey) =>
              itemDefs[itemKey] ? (
                <InventoryItem key={itemKey} def={itemDefs[itemKey]} />
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
