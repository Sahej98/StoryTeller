import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export const ToBeContinuedScreen = ({ onMainMenu }) => (
  <motion.div
    className='tbc-screen-container'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}>
    <h2 className='tbc-screen-title'>To Be Continued...</h2>
    <button className='tbc-screen-button' onClick={onMainMenu}>
      <Home size={18} /> Return to Chapters
    </button>
  </motion.div>
);
