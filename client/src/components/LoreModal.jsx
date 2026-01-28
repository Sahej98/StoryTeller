import React from 'react';
import { motion } from 'framer-motion';
import { BookMarked } from 'lucide-react';

export const LoreModal = ({ lore, onClose }) => {
  if (!lore) {
    return null;
  }

  return (
    <motion.div
      className='alert-modal-overlay'
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <motion.div
        className='alert-modal-document type-default'
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, y: -50, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.8, y: 50, opacity: 0, rotate: 5 }}
        transition={{ type: 'spring', damping: 18, stiffness: 250 }}>
        <div className='alert-document-header'>
          <BookMarked size={24} />
          <h3>{lore.title || 'Lore Entry'}</h3>
        </div>
        <div className='alert-document-body'>
          <p style={{ whiteSpace: 'pre-wrap' }}>{lore.content}</p>
        </div>
        <div className='alert-document-footer'>
          <div className='alert-stamp'>ARCHIVE</div>
          <div className='alert-document-actions'>
            <button className='themed-button primary small' onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
