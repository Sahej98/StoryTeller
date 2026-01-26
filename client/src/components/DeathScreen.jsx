import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Forward } from 'lucide-react';

export const DeathScreen = ({ onRestart, onContinue, deathInfo }) => {
  const hasContinueNode = deathInfo && deathInfo.next;
  const deathMessage =
    deathInfo && deathInfo.text
      ? deathInfo.text
      : 'Your story ends here... for now.';

  const handleAction = () => {
    if (hasContinueNode) {
      onContinue(deathInfo.next);
    } else {
      onRestart();
    }
  };

  return (
    <motion.div
      className='death-screen-container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}>
      <h1 className='death-screen-title'>YOU DIED</h1>
      <p className='death-screen-subtitle'>{deathMessage}</p>
      <button className='death-screen-button' onClick={handleAction}>
        {hasContinueNode ? (
          <>
            <Forward size={18} /> Continue
          </>
        ) : (
          <>
            <RotateCcw size={18} /> Try Again
          </>
        )}
      </button>
    </motion.div>
  );
};
