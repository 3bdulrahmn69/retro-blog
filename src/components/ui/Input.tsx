import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Button,
  FormLabel,
  OutlinedInput,
  FormHelperText,
  styled,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const RetroTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.primary.light,
    border: `2px solid ${theme.palette.primary.dark}`,
    boxShadow: '2px 2px 0px 0px rgba(180,83,9)',
    fontFamily: 'monospace',
    '&:hover': {
      border: `2px solid ${theme.palette.primary.dark}`,
    },
    '&.Mui-focused': {
      border: `2px solid ${theme.palette.primary.dark}`,
      boxShadow: `0 0 0 2px ${theme.palette.secondary.main}`,
    },
    '&.Mui-error': {
      border: `2px solid ${theme.palette.error.main}`,
      boxShadow: `0 0 0 2px ${theme.palette.error.light}`,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-input': {
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    color: theme.palette.primary.dark,
    '&::placeholder': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.primary.light,
  border: `2px solid ${theme.palette.primary.main}`,
  boxShadow: '2px 2px 0px 0px rgba(180,83,9)',
  '&:focus-within': {
    boxShadow: `0 0 0 2px ${theme.palette.secondary.main}`,
  },
}));

interface InputProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  sx?: any;
  variant?: 'default' | 'search';
  onSubmit?: () => void;
  submitButtonText?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  sx,
  variant = 'default',
  onSubmit,
  submitButtonText = 'SUBMIT',
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const isSearchField = variant === 'search';
  const inputType = isPasswordField && showPassword ? 'text' : type;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  // Search variant - inline with submit button
  if (isSearchField) {
    return (
      <Box sx={sx}>
        {label && (
          <FormLabel
            sx={{
              display: 'block',
              color: 'primary.dark',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.875rem',
              mb: 1,
              fontFamily: 'monospace',
            }}
          >
            {label}
            {required && (
              <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>
                *
              </Box>
            )}
          </FormLabel>
        )}
        <SearchContainer>
          <OutlinedInput
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            sx={{
              flex: 1,
              border: 'none',
              backgroundColor: 'transparent',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiInputBase-input': {
                color: 'primary.dark',
                '&::placeholder': {
                  color: 'primary.main',
                  opacity: 1,
                },
              },
            }}
          />
          {onSubmit && (
            <Button
              onClick={onSubmit}
              sx={{
                px: 2,
                py: 1,
                backgroundColor: 'primary.main',
                color: 'white',
                borderLeft: 2,
                borderColor: 'primary.dark',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                fontWeight: 700,
                borderRadius: 0,
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              {submitButtonText}
            </Button>
          )}
        </SearchContainer>
        {error && (
          <FormHelperText
            sx={{
              color: 'error.main',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
              backgroundColor: 'error.light',
              border: 1,
              borderColor: 'error.light',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              mt: 1,
              '&::before': {
                content: '">"',
                mr: 0.5,
              },
            }}
          >
            {error}
          </FormHelperText>
        )}
      </Box>
    );
  }

  // Default variant - standard form input
  return (
    <Box sx={{ ...sx }}>
      {label && (
        <FormLabel
          sx={{
            display: 'block',
            color: 'primary.dark',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.875rem',
            mb: 1,
            fontFamily: 'monospace',
          }}
        >
          {label}
          {required && (
            <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>
              *
            </Box>
          )}
        </FormLabel>
      )}
      <RetroTextField
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        error={!!error}
        fullWidth
        InputProps={{
          endAdornment: (
            <>
              {isPasswordField && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{
                      color: 'primary.main',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      '&:hover': {
                        color: 'primary.dark',
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
              {icon && !isPasswordField && (
                <InputAdornment position="end">
                  <Box sx={{ color: 'primary.main' }}>{icon}</Box>
                </InputAdornment>
              )}
            </>
          ),
        }}
      />
      {error && (
        <FormHelperText
          sx={{
            color: 'error.main',
            fontSize: '0.875rem',
            fontFamily: 'monospace',
            backgroundColor: 'error.light',
            border: 1,
            borderColor: 'error.light',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            mt: 1,
            '&::before': {
              content: '">"',
              mr: 0.5,
            },
          }}
        >
          {error}
        </FormHelperText>
      )}
    </Box>
  );
};

export default Input;
