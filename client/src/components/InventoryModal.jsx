import React from 'react';
import { motion } from 'framer-motion';

const InventoryItem = ({ def }) => (
  <li className='inventory-item'>
    <h3 className='item-name'>{def.name}</h3>
    <p className='item-desc'>{def.description}</p>
  </li>
);

export const InventoryModal = ({ onClose, inventory, itemDefs }) => {
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
        <h2>Inventory</h2>
        {inventory && inventory.length > 0 ? (
          <ul className='inventory-modal-list'>
            {inventory.map((itemKey) =>
              itemDefs[itemKey] ? (
                <InventoryItem key={itemKey} def={itemDefs[itemKey]} />
              ) : null,
            )}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', color: '#888' }}>
            Your pockets are empty.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};
