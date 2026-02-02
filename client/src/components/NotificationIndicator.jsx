import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, BookOpen, Heart } from 'lucide-react';

const icons = {
  item_add: <Plus size={16} />,
  item_remove: <Minus size={16} />,
  journal_update: <BookOpen size={16} />,
  relationship: <Heart size={16} />,
};

const typeClasses = {
  item_add: 'notif-item-add',
  item_remove: 'notif-item-remove',
  journal_update: 'notif-journal',
  relationship_increase: 'notif-rel-up',
  relationship_decrease: 'notif-rel-down',
};

const notificationVariants = {
  initial: { opacity: 0, y: 30, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  },
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
    }, 3500);
    return () => clearTimeout(timer);
  }, [id, onComplete]);

  let finalType = type;
  if (type === 'relationship') {
    finalType = change > 0 ? 'relationship_increase' : 'relationship_decrease';
  }

  const className = typeClasses[finalType] || 'notif-default';

  return (
    <motion.div
      layout
      variants={notificationVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className={`notification-indicator-sleek ${className}`}>
      <div className='notif-icon-box'>{icons[type]}</div>
      <span className='notif-text'>{text}</span>
    </motion.div>
  );
};
