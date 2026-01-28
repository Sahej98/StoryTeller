import React from 'react';
import { motion } from 'framer-motion';
import { Package, BookText } from 'lucide-react';

const InventoryItem = ({ def, itemKey, onViewLore }) => {
  const hasLore = def.lore && def.lore.title && def.lore.content;

  return (
    <li
      className={`inventory-item ${hasLore ? 'has-lore' : ''}`}
      onClick={hasLore ? () => onViewLore(itemKey) : undefined}
      title={hasLore ? 'Click to read lore' : ''}>
      <div className='item-image-wrapper'>
        {def.image ? (
          <img src={def.image} alt={def.name} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#333',
            }}>
            <Package size={24} />
          </div>
        )}
      </div>
      <div className='item-content-wrapper'>
        <h3 className='item-name'>{def.name}</h3>
        <p className='item-desc'>{def.description}</p>
      </div>
      {hasLore && <BookText className='lore-indicator-icon' size={16} />}
    </li>
  );
};

export const InventoryModal = ({
  onClose,
  inventory,
  itemDefs,
  onViewLore,
}) => {
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
                <InventoryItem
                  key={itemKey}
                  itemKey={itemKey}
                  def={itemDefs[itemKey]}
                  onViewLore={onViewLore}
                />
              ) : null,
            )}
          </ul>
        ) : (
          <p
            style={{
              textAlign: 'center',
              color: 'var(--secondary-text-color)',
              fontStyle: 'italic',
              padding: '2rem',
            }}>
            Your pockets are empty.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};
