import React from 'react';
import { motion } from 'framer-motion';
import { X, Code } from 'lucide-react';

export const TemplateModal = ({
  type = 'nodes',
  templates,
  onSelect,
  onClose,
}) => {
  const templatesToShow = templates[type] || {};
  const typeName =
    type.charAt(0).toUpperCase() +
    (type.endsWith('s') ? type.slice(1, -1) : type.slice(1));

  return (
    <motion.div
      className='modal-overlay settings-modal-overlay'
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <motion.div
        id='template-modal'
        className='modal-panel settings-modal-panel context-menu'
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 250 }}>
        <div className='settings-modal-header'>
          <h2>Add {typeName} Template</h2>
          <button
            className='settings-modal-close'
            onClick={onClose}
            aria-label='Close'>
            <X size={24} />
          </button>
        </div>
        <div className='settings-modal-content'>
          {Object.entries(templatesToShow).map(([key, { description }]) => (
            <button
              key={key}
              className='themed-button secondary'
              style={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                width: '100%',
                padding: '1rem',
                height: 'auto',
              }}
              onClick={() => onSelect(key)}>
              <Code size={20} style={{ flexShrink: 0, marginTop: '4px' }} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  lineHeight: '1.4',
                }}>
                <span style={{ fontWeight: 'bold', color: '#d4c0a1' }}>
                  {key.replace(/_/g, ' ')}
                </span>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: '#a38c6d',
                    fontWeight: 'normal',
                    whiteSpace: 'normal',
                  }}>
                  {description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
