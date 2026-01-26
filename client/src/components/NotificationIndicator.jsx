import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, MinusCircle, BookOpen, Heart } from 'lucide-react';

const icons = {
  item_add: <PlusCircle size={18} />,
  item_remove: <MinusCircle size={18} />,
  journal_update: <BookOpen size={18} />,
  relationship: <Heart size={18} />,
};

const colors = {
  item_add: '#81c784', // green
  item_remove: '#e57373', // red
  journal_update: '#64b5f6', // blue
  relationship_increase: '#81c784',
  relationship_decrease: '#e57373',
};

export const NotificationIndicator = ({
  id,
  text,
  type,
  change,
  onComplete,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(id);
    }, 1000); // Duration
    return () => clearTimeout(timer);
  }, [id, onComplete]);

  let color = '#fff';
  if (type === 'relationship') {
    color =
      change > 0 ? colors.relationship_increase : colors.relationship_decrease;
  } else {
    color = colors[type];
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className='notification-indicator'
      style={{ color: color }}>
      {icons[type]}
      <span>{text}</span>
    </motion.div>
  );
};
