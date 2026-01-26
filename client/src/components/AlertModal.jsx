import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, FileSignature } from 'lucide-react';

export const AlertModal = ({ alerts, setAlerts }) => {
  const currentAlert = alerts.length > 0 ? alerts[0] : null;
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (currentAlert?.prompt) {
      setInputValue(currentAlert.prompt.initialValue || '');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [currentAlert]);

  if (!currentAlert) {
    return null;
  }

  const handleClose = () => {
    setAlerts((prev) => prev.slice(1));
  };

  const handleConfirm = () => {
    if (currentAlert.onConfirm) {
      currentAlert.onConfirm(currentAlert.prompt ? inputValue : undefined);
    }
    handleClose();
  };

  const handleAction = (actionFn) => {
    if (actionFn) {
      actionFn();
    }
    handleClose();
  };

  const typeConfig = {
    error: {
      icon: <AlertTriangle size={24} />,
      class: 'error',
      stamp: 'WARNING',
    },
    info: { icon: <Info size={24} />, class: 'info', stamp: 'NOTICE' },
    success: {
      icon: <CheckCircle size={24} />,
      class: 'success',
      stamp: 'CONFIRMED',
    },
    default: {
      icon: <FileSignature size={24} />,
      class: 'default',
      stamp: 'SYSTEM',
    },
  };

  const config = typeConfig[currentAlert.type] || typeConfig.default;

  return (
    <AnimatePresence>
      {currentAlert && (
        <motion.div
          key={currentAlert.id}
          className='alert-modal-overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}>
          <motion.div
            className={`alert-modal-document type-${config.class}`}
            initial={{ scale: 0.8, y: -50, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, y: 50, opacity: 0, rotate: 5 }}
            transition={{ type: 'spring', damping: 18, stiffness: 250 }}
            onClick={(e) => e.stopPropagation()}>
            <div className='alert-document-header'>
              {config.icon}
              <h3>{currentAlert.title || 'System Alert'}</h3>
            </div>
            <div className='alert-document-body'>
              <p>{currentAlert.message}</p>
            </div>
            {currentAlert.prompt && (
              <div className='alert-prompt-input-wrapper'>
                <label>{currentAlert.prompt.label}</label>
                <input
                  ref={inputRef}
                  type='text'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleConfirm();
                    }
                  }}
                />
              </div>
            )}
            <div className='alert-document-footer'>
              <div className={`alert-stamp stamp-${config.class}`}>
                {config.stamp}
              </div>
              <div className='alert-document-actions'>
                {currentAlert.actions ? (
                  currentAlert.actions.map((action, index) => (
                    <button
                      key={index}
                      className={`themed-button ${action.class || 'secondary'} small`}
                      onClick={() => handleAction(action.action)}>
                      {action.text}
                    </button>
                  ))
                ) : currentAlert.onConfirm ? (
                  <>
                    <button
                      className='themed-button secondary small'
                      onClick={handleClose}>
                      Cancel
                    </button>
                    <button
                      className={`themed-button ${
                        currentAlert.type === 'error' ? 'danger' : 'primary'
                      } small`}
                      onClick={handleConfirm}>
                      Confirm
                    </button>
                  </>
                ) : (
                  <button
                    className='themed-button primary small'
                    onClick={handleClose}>
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
