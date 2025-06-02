import React from 'react';
import { Box, ButtonGroup, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface AuthToggleProps {
  isLogin: boolean;
  onModeChange: (mode: string) => void;
  isInitialLoad: boolean;
}

const AuthToggleContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(8),
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  transition: 'all 0.5s ease',
}));

const AuthToggleGroup = styled(ButtonGroup)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `4px solid ${theme.palette.primary.dark}`,
  boxShadow: '4px 4px 0px 0px rgba(180,83,9)',
  '& .MuiButtonGroup-grouped': {
    border: 'none',
    borderRadius: 0,
    fontWeight: 'bold',
    fontSize: '0.875rem',
    padding: theme.spacing(1, 2),
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: 'transparent',
    },
  },
}));

const AuthToggleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  background: isActive
    ? `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
    : theme.palette.background.paper,
  color: isActive ? theme.palette.primary.dark : theme.palette.primary.main,
  '&:hover': {
    background: isActive
      ? `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
      : theme.palette.primary.light + '33',
  },
  '&::before': isActive
    ? {}
    : {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
        opacity: 0,
        transition: 'opacity 0.3s ease',
      },
  '&:hover::before': isActive
    ? {}
    : {
        opacity: 0.2,
      },
}));

const AuthToggle: React.FC<AuthToggleProps> = ({
  isLogin,
  onModeChange,
  isInitialLoad,
}) => {
  return (
    <AuthToggleContainer
      sx={{
        opacity: isInitialLoad ? 0 : 1,
        transform: isInitialLoad
          ? 'translateX(-50%) translateY(-16px)'
          : 'translateX(-50%) translateY(0)',
      }}
    >
      <AuthToggleGroup variant="contained" disableElevation>
        <AuthToggleButton
          isActive={isLogin}
          onClick={() => onModeChange('login')}
        >
          LOGIN
        </AuthToggleButton>
        <AuthToggleButton
          isActive={!isLogin}
          onClick={() => onModeChange('register')}
        >
          REGISTER
        </AuthToggleButton>
      </AuthToggleGroup>
    </AuthToggleContainer>
  );
};

export default AuthToggle;
