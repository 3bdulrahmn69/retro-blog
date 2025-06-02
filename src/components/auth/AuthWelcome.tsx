import React from 'react';
import { Box } from '@mui/material';

interface AuthWelcomeProps {
  children: React.ReactNode;
}

const AuthWelcome: React.FC<AuthWelcomeProps> = ({ children }) => {
  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '400px',
        transition: 'all 0.3s ease',
      }}
    >
      {children}
    </Box>
  );
};

export default AuthWelcome;
