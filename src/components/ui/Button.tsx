import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const RetroButton = styled(MuiButton, {
  shouldForwardProp: (prop) =>
    prop !== 'customVariant' && prop !== 'customSize',
})<{
  customVariant?: 'primary' | 'secondary' | 'outline' | 'danger';
  customSize?: 'sm' | 'md' | 'lg';
}>(({ theme, customVariant = 'primary', customSize = 'md' }) => {
  const sizeStyles = {
    sm: {
      padding: '8px 12px',
      fontSize: '0.75rem',
    },
    md: {
      padding: '8px 16px',
      fontSize: '0.875rem',
    },
    lg: {
      padding: '12px 24px',
      fontSize: '1rem',
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: theme.palette.secondary.main,
      borderColor: theme.palette.primary.dark,
      color: theme.palette.primary.dark,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
    secondary: {
      backgroundColor: '#fef3c7',
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.dark,
      '&:hover': {
        backgroundColor: '#fde68a',
      },
    },
    outline: {
      backgroundColor: '#ffffff',
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.dark,
      '&:hover': {
        backgroundColor: '#fffbf0',
      },
    },
    danger: {
      backgroundColor: '#dc2626',
      borderColor: '#991b1b',
      color: '#ffffff',
      boxShadow: '8px 8px 0px 0px rgba(153,27,27)',
      '&:hover': {
        backgroundColor: '#b91c1c',
        transform: 'translate(2px, 2px)',
        boxShadow: '6px 6px 0px 0px rgba(153,27,27)',
      },
      '&:active': {
        transform: 'translate(8px, 8px)',
        boxShadow: 'none',
      },
    },
  };

  return {
    ...sizeStyles[customSize],
    ...variantStyles[customVariant],
    fontFamily: '"Courier New", monospace',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    borderRadius: 0,
    border: '4px solid',
    transition: 'all 0.2s ease',
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
  };
});

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <RetroButton
      customVariant={variant}
      customSize={size}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </RetroButton>
  );
};

export default Button;
