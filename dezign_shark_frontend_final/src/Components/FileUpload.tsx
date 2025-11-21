import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { toast } from 'react-toastify';
import { FileUpload } from '../api/services';

interface FileUploadContainerProps {
  onFileSelect: (url: string | null) => void;
  existingFile?: string | null;
  onDelete: () => void;
}

const FileUploadContainer: React.FC<FileUploadContainerProps> = ({
  onFileSelect,
  existingFile,
  onDelete,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error'
  >('idle');

  useEffect(() => {
    if (existingFile) {
      // Use backend base for serving local uploads during testing
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8084/';
      const fullUrl = `${apiBase}${existingFile}`;
      setPreview(fullUrl);
    }
  }, [existingFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': [],
      'image/png': [],
      'image/jpeg': [],
      'image/svg+xml': [],
      'image/webp': [],
    },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setUploadStatus('uploading');

      try {
        const response = await FileUpload(file);
        const uploadedUrl: string = response?.data?.file?.url;

        if (uploadedUrl) {
          // ✅ Strip '/uploads' prefix if present
          const cleanedUrl = uploadedUrl.replace(/^\/uploads/, '');
          onFileSelect(cleanedUrl);
          setUploadStatus('success');
        } else {
          throw new Error('Upload response missing file URL');
        }
      } catch (error) {
        console.error('Upload failed:', error);
        toast.error('Upload failed. Please try again.');
        onFileSelect(null);
        setUploadStatus('error');
      }
    },
  });

  const handleRemove = () => {
    setPreview(null);
    onDelete();
    onFileSelect(null);
  };

  const borderColor =
    uploadStatus === 'success'
      ? '#4CAF50'
      : uploadStatus === 'error'
      ? '#F44336'
      : isDragActive
      ? '#2196f3'
      : '#24272C90';

  return (
    <Box
      {...getRootProps()}
      sx={{
        height: '110px',
        border: `2px dashed ${borderColor}`,
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        textAlign: 'center',
        backgroundColor: 'transparent',
      }}
    >
      <input {...getInputProps()} />
      {uploadStatus === 'uploading' ? (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : preview ? (
        <Box
          sx={{
            position: 'relative',
            width: 'auto',
            height: '100px',
            maxWidth: '100%',
          }}
        >
          {preview.endsWith('.pdf') ? (
            <Typography variant="body2" sx={{ color: '#fff', mt: 4 }}>
              PDF Uploaded
            </Typography>
          ) : (
            <img
              src={preview}
              alt="Selected file"
              style={{
                width: '95%',
                height: '95%',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
          )}
          <IconButton
            onClick={handleRemove}
            sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: '40px', color: '#6563FF' }} />
          <Typography variant="caption" sx={{ color: '#6563FF' }}>
            Drag & drop a file here, or click to select
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadContainer;
