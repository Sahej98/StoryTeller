import {
  BookOpen,
  Edit3,
  LogOut,
  Settings,
  FolderOpen,
  Users,
  Database,
} from 'lucide-react';

export const StartScreen = ({
  onNewGame,
  onLoad,
  hasSaveData,
  onSettingsClick,
  onEditorClick,
  onLogout,
  isAdmin,
  onUserManagementClick,
  onGlobalAssetsClick,
  isMobile,
}) => (
  <div className='start-screen-container'>
    <div className='start-screen-branding'>
      <div className='start-screen-logo'>
        <img
          src='/images/logo.png'
          alt='Storyteller Logo'
          className='start-screen-main-logo'
        />
        <h1 className='start-screen-logo-title'>Storyteller</h1>
        <p className='start-screen-logo-subtitle'>Your Adventure Begins</p>
      </div>
    </div>
    <div className='start-screen-menu-panel'>
      <div className='start-screen-menu'>
        <button className='start-menu-button primary' onClick={onNewGame}>
          <BookOpen size={18} /> New Story
        </button>
        <button
          className='start-menu-button'
          onClick={onLoad}
          disabled={!hasSaveData}>
          <FolderOpen size={18} /> Continue
        </button>
        {isAdmin && (
          <>
            <button
              className='start-menu-button'
              onClick={onEditorClick}
              title='Create or edit a story'>
              <Edit3 size={18} /> Create Story
            </button>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className='start-menu-button secondary'
                onClick={onUserManagementClick}>
                <Users size={18} /> Users
              </button>
              <button
                className='start-menu-button secondary'
                onClick={onGlobalAssetsClick}>
                <Database size={18} /> Assets
              </button>
            </div>
          </>
        )}

        <div className='start-screen-divider'></div>

        <div className='start-screen-secondary-actions'>
          <button
            className='start-menu-button secondary'
            onClick={onSettingsClick}>
            <Settings size={18} /> Settings
          </button>
          <button className='start-menu-button secondary' onClick={onLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
        <div
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            opacity: 0.3,
            fontSize: '0.7rem',
            color: '#a38c6d',
          }}>
          v1.2 - The Asset Update
        </div>
      </div>
    </div>
  </div>
);
