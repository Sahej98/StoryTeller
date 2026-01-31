import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  User,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  BookUser,
} from 'lucide-react';

const TOKEN_KEY = 'storyteller_token';
const API_URL = import.meta.env.VITE_API_URL || '';

const EditUserModal = ({ user, onClose, onSave, showAlert }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    username: user.username,
    email: user.email,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave(user._id, formData);
      onClose();
    } catch (err) {
      showAlert(err.message || 'Failed to update.', 'error', 'Update Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-panel' onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2>Edit User: @{user.username}</h2>
          <div className='field-group'>
            <label>Full Name</label>
            <div className='input-group'>
              <BookUser size={18} />
              <input
                type='text'
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='field-group'>
            <label>Username</label>
            <div className='input-group'>
              <User size={18} />
              <input
                type='text'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='field-group'>
            <label>Email</label>
            <div className='input-group'>
              <Mail size={18} />
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='modal-actions' style={{ marginTop: '2rem' }}>
            <button
              type='button'
              className='themed-button secondary'
              onClick={onClose}
              disabled={isLoading}>
              Cancel
            </button>
            <button
              type='submit'
              className='themed-button primary'
              disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const UserManagementScreen = ({ onBack, showAlert, currentUser }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError('');
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const response = await fetch(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateUser = async (userId, update, action) => {
    if (action === 'edit') {
      setEditingUser(users.find((u) => u._id === userId));
      return;
    }

    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(update),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Failed to update user');

      showAlert('User updated successfully.', 'success', 'Update Complete');
      await fetchUsers();
    } catch (err) {
      showAlert(`Error: ${err.message}`, 'error', 'Update Failed');
      throw err; // Re-throw to prevent modal from closing on failure
    }
  };

  const handleDeleteUser = (userId, username) => {
    showAlert(
      `Are you sure you want to permanently delete user @${username}? This action cannot be undone.`,
      'error',
      'Confirm Deletion',
      async () => {
        try {
          const token = localStorage.getItem(TOKEN_KEY);
          const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) throw new Error('Failed to delete user');
          showAlert(
            'User deleted successfully.',
            'success',
            'Deletion Complete',
          );
          fetchUsers();
        } catch (err) {
          showAlert(`Error: ${err.message}`, 'error', 'Deletion Failed');
        }
      },
    );
  };

  return (
    <>
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleUpdateUser}
          showAlert={showAlert}
        />
      )}
      <div className='editor-container'>
        <header className='editor-header'>
          <h1
            className='selection-screen-title'
            style={{ margin: 0, fontSize: '1.5rem' }}>
            User Management
          </h1>
          <button className='themed-button secondary' onClick={onBack}>
            <ChevronLeft size={16} /> Back to Menu
          </button>
        </header>
        <main className='editor-layout'>
          <div className='editor-main' style={{ alignItems: 'flex-start' }}>
            <div className='editor-canvas'>
              {isLoading && <p>Loading users...</p>}
              {error && <p className='error-text'>{error}</p>}
              {!isLoading && !error && (
                <table className='management-table'>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      const isCurrentUser = user._id === currentUser.id;
                      const joinDate = new Date(
                        user.createdAt,
                      ).toLocaleDateString();
                      return (
                        <tr
                          key={user._id}
                          className={user.disabled ? 'disabled' : ''}>
                          <td>
                            @{user.username}{' '}
                            {isCurrentUser && (
                              <span
                                style={{
                                  fontSize: '0.8rem',
                                  color: '#a38c6d',
                                  fontWeight: 'normal',
                                }}>
                                (You)
                              </span>
                            )}
                          </td>
                          <td>{user.fullName}</td>
                          <td>{user.email}</td>
                          <td>
                            <select
                              value={user.role}
                              onChange={(e) =>
                                handleUpdateUser(user._id, {
                                  role: e.target.value,
                                })
                              }
                              disabled={isCurrentUser}>
                              <option value='player'>Player</option>
                              <option value='admin'>Admin</option>
                            </select>
                          </td>
                          <td>
                            <div className='status-badges'>
                              <span
                                className={`user-file-status ${user.disabled ? 'disabled' : 'active'}`}>
                                {user.disabled ? 'Disabled' : 'Active'}
                              </span>
                              <span
                                className={`user-file-verified ${user.isVerified ? 'verified' : 'unverified'}`}>
                                {user.isVerified ? 'Verified' : 'Unverified'}
                              </span>
                            </div>
                          </td>
                          <td>{joinDate}</td>
                          <td className='actions-cell'>
                            <button
                              className={`themed-button small ${user.disabled ? 'secondary' : 'warning'}`}
                              onClick={() =>
                                handleUpdateUser(user._id, {
                                  disabled: !user.disabled,
                                })
                              }
                              disabled={isCurrentUser}
                              title={
                                user.disabled ? 'Enable User' : 'Disable User'
                              }>
                              {user.disabled ? (
                                <UserCheck size={16} />
                              ) : (
                                <UserX size={16} />
                              )}
                            </button>
                            <button
                              className='themed-button small secondary'
                              onClick={() =>
                                handleUpdateUser(user._id, null, 'edit')
                              }
                              title='Edit User'>
                              <Edit size={16} />
                            </button>
                            <button
                              className='themed-button small danger'
                              onClick={() =>
                                handleDeleteUser(user._id, user.username)
                              }
                              disabled={isCurrentUser}
                              title='Delete User'>
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
