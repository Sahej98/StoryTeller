import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Lock,
  Ghost,
  UserPlus,
  LogIn,
  Mail,
  BookUser,
  Hash,
  KeyRound,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || '';

const OtpModal = ({ email, onVerified, onClose, showAlert }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/users/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Verification failed.');
      onVerified({ user: data.user, token: data.token });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-panel' onClick={(e) => e.stopPropagation()}>
        <h2>Verify Your Account</h2>
        <p
          style={{
            textAlign: 'center',
            color: '#a38c6d',
            marginTop: '-1rem',
            marginBottom: '2rem',
          }}>
          A 6-digit code was sent to (your server console for){' '}
          <strong>{email}</strong>.
        </p>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <Hash size={18} color='#9e8a71' />
            <input
              type='text'
              placeholder='Verification Code'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {error && <p className='auth-error'>{error}</p>}
          <button
            type='submit'
            className='themed-button primary'
            style={{ width: '100%' }}
            disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify & Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

const ForgotPasswordModal = ({ onClose, showAlert }) => {
  const [step, setStep] = useState(1); // 1: email, 2: otp/new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send code.');
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/users/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to reset password.');
      showAlert(
        'Password has been successfully reset. You can now log in.',
        'success',
        'Password Reset',
      );
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-panel' onClick={(e) => e.stopPropagation()}>
        {step === 1 ? (
          <>
            <h2>Reset Password</h2>
            <p
              style={{
                textAlign: 'center',
                color: '#a38c6d',
                marginTop: '-1rem',
                marginBottom: '2rem',
              }}>
              Enter your email to receive a password reset code.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <div className='input-group'>
                <Mail size={18} color='#9e8a71' />
                <input
                  type='email'
                  placeholder='Email Address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {error && <p className='auth-error'>{error}</p>}
              <button
                type='submit'
                className='themed-button primary'
                style={{ width: '100%' }}
                disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Code'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>Enter New Password</h2>
            <p
              style={{
                textAlign: 'center',
                color: '#a38c6d',
                marginTop: '-1rem',
                marginBottom: '2rem',
              }}>
              Check your server console for the reset code.
            </p>
            <form onSubmit={handleResetSubmit}>
              <div className='input-group'>
                <Hash size={18} color='#9e8a71' />
                <input
                  type='text'
                  placeholder='Reset Code'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className='input-group'>
                <Lock size={18} color='#9e8a71' />
                <input
                  type='password'
                  placeholder='New Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {error && <p className='auth-error'>{error}</p>}
              <button
                type='submit'
                className='themed-button primary'
                style={{ width: '100%' }}
                disabled={isLoading}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export const AuthScreen = ({ onAuthSuccess, showAlert }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [verifyingEmail, setVerifyingEmail] = useState(null);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [isForgotModalVisible, setIsForgotModalVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (isLogin) {
      if (!username || !password) {
        setError('Please fill in all fields.');
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/api/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
          onAuthSuccess({ user: data.user, token: data.token });
        } else {
          throw new Error(data.message || 'Login failed.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Registration
      if (!username || !password || !email || !fullName) {
        setError('Please fill in all fields.');
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/api/users/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, email, fullName }),
        });
        const data = await response.json();
        if (response.ok) {
          setVerifyingEmail(email);
          setIsOtpModalVisible(true);
        } else {
          throw new Error(data.message || 'Registration failed.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGuest = () => {
    onAuthSuccess({ user: { username: 'Guest', isGuest: true } });
  };

  return (
    <>
      <AnimatePresence>
        {isOtpModalVisible && (
          <OtpModal
            email={verifyingEmail}
            onVerified={onAuthSuccess}
            onClose={() => setIsOtpModalVisible(false)}
            showAlert={showAlert}
          />
        )}
        {isForgotModalVisible && (
          <ForgotPasswordModal
            onClose={() => setIsForgotModalVisible(false)}
            showAlert={showAlert}
          />
        )}
      </AnimatePresence>
      <div className='auth-screen-container'>
        <div className='auth-art-panel'></div>
        <div className='auth-form-panel'>
          <div className='auth-panel'>
            <h2 className='auth-form-title'>
              {isLogin ? 'Begin Your Tale' : 'Scribe Your Name'}
            </h2>

            <form onSubmit={handleSubmit} className='auth-form'>
              {!isLogin && (
                <>
                  <div className='input-group'>
                    <BookUser size={18} color='#9e8a71' />
                    <input
                      type='text'
                      placeholder='Full Name'
                      value={fullName}
                      autoComplete='name'
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className='input-group'>
                    <Mail size={18} color='#9e8a71' />
                    <input
                      type='email'
                      placeholder='Email Address'
                      value={email}
                      autoComplete='email'
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </>
              )}
              <div className='input-group'>
                <User size={18} color='#9e8a71' />
                <input
                  type='text'
                  placeholder='Username'
                  value={username}
                  autoComplete='username'
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className='input-group'>
                <Lock size={18} color='#9e8a71' />
                <input
                  type='password'
                  placeholder='Password'
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {isLogin && (
                <p
                  style={{
                    textAlign: 'right',
                    fontSize: '0.8rem',
                    marginTop: '-0.5rem',
                  }}>
                  <a
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsForgotModalVisible(true);
                    }}
                    style={{ color: '#a38c6d', textDecoration: 'none' }}>
                    Forgot Password?
                  </a>
                </p>
              )}

              {error && <p className='auth-error'>{error}</p>}

              <button
                type='submit'
                className='auth-submit'
                disabled={isLoading}>
                {isLoading ? (
                  '...'
                ) : isLogin ? (
                  <>
                    <LogIn size={18} /> Enter the Library
                  </>
                ) : (
                  <>
                    <UserPlus size={18} /> Join the Guild
                  </>
                )}
              </button>
            </form>

            <div
              style={{
                margin: '1.5rem 0',
                color: '#6a5a4a',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textAlign: 'center',
              }}>
              or
            </div>

            <button
              onClick={handleGuest}
              className='auth-guest'
              disabled={isLoading}>
              <Ghost size={16} /> Wander as a Spirit
            </button>

            <p
              className='auth-toggle'
              onClick={() => {
                if (!isLoading) {
                  setIsLogin(!isLogin);
                  setError('');
                }
              }}>
              {isLogin
                ? 'Need an account? Inscribe your name.'
                : 'Already a member? Enter the library.'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
