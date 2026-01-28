import React from 'react';
import { motion } from 'framer-motion';
import { Languages, X } from 'lucide-react';

export const VoicePackPrompt = ({ message, onClose }) => {
  return (
    <motion.div
      className='voice-pack-prompt'
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
      <Languages size={24} style={{ flexShrink: 0 }} />
      <p>{message}</p>
      <button onClick={onClose} aria-label='Dismiss'>
        <X size={20} />
      </button>
    </motion.div>
  );
};
