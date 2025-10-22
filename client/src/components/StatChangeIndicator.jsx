import React, { useEffect } from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const formatStatName = (stat) => {
  return stat.charAt(0).toUpperCase() + stat.slice(1);
};

export const StatChangeIndicator = ({ id, stat, change, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(id);
    }, 2400); // Should be slightly less than animation duration
    return () => clearTimeout(timer);
  }, [id, onComplete]);

  const isIncrease = change > 0;
  const text = `${isIncrease ? '+' : ''}${change} ${formatStatName(stat)}`;
  const className = `stat-change-indicator ${
    isIncrease ? 'increase' : 'decrease'
  }`;
  const Icon = isIncrease ? ArrowUpCircle : ArrowDownCircle;

  return (
    <div className={className}>
      <Icon size={18} />
      <span>{text}</span>
    </div>
  );
};
