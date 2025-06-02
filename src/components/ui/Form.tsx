import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  title?: string;
  isSubmitting?: boolean;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  children,
  sx,
  title,
  isSubmitting = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSubmitting) {
      onSubmit(e);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        border: 4,
        borderColor: 'primary.dark',
        boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
        ...sx,
      }}
    >
      {title && (
        <Box
          sx={{
            background: 'linear-gradient(to right, #fbbf24, #d97706)',
            p: 2,
            color: 'primary.dark',
            fontWeight: 700,
            borderBottom: 4,
            borderColor: 'primary.dark',
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              letterSpacing: '0.1em',
              textAlign: 'center',
              fontFamily: 'monospace',
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>
        </Box>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
          {children}
        </Box>
      </Box>
    </Paper>
  );
};

export default Form;
