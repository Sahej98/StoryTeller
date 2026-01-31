import {
  BookOpen,
  Edit3,
  LogOut,
  Settings,
  FolderOpen,
  Users,
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
              disabled={isMobile}
              title={
                isMobile
                  ? 'Story Editor is not available on mobile devices.'
                  : 'Create or edit a story'
              }>
              <Edit3 size={18} /> Create Story
            </button>
            <button
              className='start-menu-button'
              onClick={onUserManagementClick}>
              <Users size={18} /> User Management
            </button>
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
      </div>
    </div>
  </div>
);
