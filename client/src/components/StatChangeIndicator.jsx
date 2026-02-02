import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

const formatStatName = (stat) => {
  return stat.charAt(0).toUpperCase() + stat.slice(1);
};

const indicatorVariants = {
  initial: { opacity: 0, x: -50, filter: 'blur(10px)' },
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
  exit: {
    opacity: 0,
    x: 20,
    filter: 'blur(10px)',
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

export const StatChangeIndicator = ({ id, stat, change, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, onComplete]);

  const isIncrease = change > 0;
  const colorClass = isIncrease ? 'stat-increase' : 'stat-decrease';
  const Icon = isIncrease ? ArrowUp : ArrowDown;

  return (
    <motion.div
      layout
      variants={indicatorVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className={`stat-change-indicator-sleek ${colorClass}`}>
      <div className='icon-wrapper'>
        <Icon size={16} strokeWidth={3} />
      </div>
      <div className='text-content'>
        <span className='stat-name'>{formatStatName(stat)}</span>
        <span className='stat-value'>
          {isIncrease ? '+' : ''}
          {change}
        </span>
      </div>
    </motion.div>
  );
};
