import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const formatStatName = (stat) => {
  return stat.charAt(0).toUpperCase() + stat.slice(1);
};

const indicatorVariants = {
  initial: { opacity: 0, y: 10, scale: 0.7 },
  animate: {
    opacity: 1,
    y: -25,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.8,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export const StatChangeIndicator = ({ id, stat, change, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(id);
    }, 1500); // Display duration before starting exit animation
    return () => clearTimeout(timer);
  }, [id, onComplete]);

  const isIncrease = change > 0;
  const text = `${isIncrease ? '+' : ''}${change} ${formatStatName(stat)}`;
  const className = `stat-change-indicator ${
    isIncrease ? 'increase' : 'decrease'
  }`;
  const Icon = isIncrease ? ArrowUpCircle : ArrowDownCircle;

  return (
    <motion.div
      layout
      variants={indicatorVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className={className}>
      <Icon size={18} />
      <span>{text}</span>
    </motion.div>
  );
};
