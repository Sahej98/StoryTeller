import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, List, Shield, Brain, Heart, Package, Users } from 'lucide-react';

export const ChapterEndScreen = ({ chapter, onNext, stats, inventoryCount, relationships, characterDefs, discoveredCharacters }) => {
  const getRelationshipStatus = (value) => {
    if (value > 50) return { text: 'Devoted', color: '#81c784' };
    if (value > 20) return { text: 'Positive', color: '#a5d6a7' };
    if (value >= -20) return { text: 'Neutral', color: '#a38c6d' };
    if (value > -50) return { text: 'Negative', color: '#ef9a9a' };
    return { text: 'Hostile', color: '#ff8a80' };
  };

  const encounteredKeys = (discoveredCharacters || []).filter(k => k !== 'player');

  return (
    <motion.div
      className='tbc-screen-container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}>
      <h3 style={{ color: 'var(--accent-color)', fontFamily: 'var(--title-font)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>
        Chapter Complete
      </h3>
      <h2 className='tbc-screen-title' style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
        {chapter?.title || 'Part Concluded'}
      </h2>
      
      <p style={{ color: 'var(--secondary-text-color)', fontStyle: 'italic', marginBottom: '3rem', maxWidth: '600px', lineHeight: '1.6' }}>
        {chapter?.flavorText || 'Your progress has been secured. The journey continues soon.'}
      </p>

      <div className="chapter-summary-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '2rem', 
        width: '100%', 
        maxWidth: '600px', 
        marginBottom: '4rem',
        padding: '2rem',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="summary-item">
          <Package size={20} color="var(--accent-color)" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '0.7rem', opacity: 0.6, textTransform: 'uppercase' }}>Items Found</div>
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--title-font)' }}>{inventoryCount}</div>
        </div>
        <div className="summary-item">
          <Heart size={20} color="#ff5252" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '0.7rem', opacity: 0.6, textTransform: 'uppercase' }}>Vitality</div>
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--title-font)' }}>{stats?.health || 0}%</div>
        </div>
        <div className="summary-item">
          <Brain size={20} color="#40c4ff" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '0.7rem', opacity: 0.6, textTransform: 'uppercase' }}>Sanity</div>
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--title-font)' }}>{stats?.sanity || 0}%</div>
        </div>
      </div>

      {encounteredKeys.length > 0 && (
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '3rem' }}>
          <h4 style={{ 
            fontFamily: 'var(--title-font)', 
            fontSize: '0.8rem', 
            color: '#a38c6d', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <Users size={14} /> Character Connections
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {encounteredKeys.map(key => {
              const def = characterDefs?.[key];
              const value = relationships?.[key] || 0;
              const status = getRelationshipStatus(value);
              return (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ color: '#d4c0a1', fontWeight: 'bold' }}>{def?.name || key}</span>
                  <span style={{ color: status.color, fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>{status.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className='tbc-screen-button' onClick={onNext}>
          <List size={18} /> Return to Chapters
        </button>
      </div>
    </motion.div>
  );
};