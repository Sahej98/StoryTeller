import React, { useState } from 'react';
import { Upload, Check, AlertCircle, Loader } from 'lucide-react';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const AssetUploader = ({ type = 'image', onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setError('Cloudinary configuration missing in .env');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    // Resource type: 'image' or 'video' (audio is treated as video/raw in Cloudinary often, or auto)
    const resourceType = type === 'audio' ? 'video' : 'image';

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || 'Upload failed');
      }

      const data = await response.json();
      onUploadComplete(data.secure_url);
      setSuccess(true);

      // Reset success message after 3s
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Upload Error:', err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='asset-uploader'>
      <label
        className={`themed-button small secondary ${uploading ? 'disabled' : ''}`}
        style={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
        <input
          type='file'
          accept={type === 'image' ? 'image/*' : 'audio/*'}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          disabled={uploading}
        />
        {uploading ? (
          <Loader size={14} className='animate-spin' />
        ) : (
          <Upload size={14} />
        )}
        {uploading
          ? 'Uploading...'
          : `Upload ${type === 'image' ? 'Image' : 'Audio'}`}
      </label>

      {success && (
        <span
          style={{
            color: 'var(--success-color)',
            marginLeft: '0.5rem',
            display: 'inline-flex',
            alignItems: 'center',
          }}>
          <Check size={14} /> Done
        </span>
      )}
      {error && (
        <div
          style={{
            color: 'var(--error-color)',
            fontSize: '0.7rem',
            marginTop: '0.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}>
          <AlertCircle size={12} /> {error}
        </div>
      )}
    </div>
  );
};
