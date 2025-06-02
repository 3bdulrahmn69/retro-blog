import { createTheme } from '@mui/material/styles';

// Define retro color palette
const retroColors = {
  amber: {
    50: '#fffbf0',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  yellow: {
    50: '#fffdf0',
    100: '#fefce8',
    200: '#fef9c3',
    300: '#fef08a',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
};

export const retroTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: retroColors.amber[600],
      light: retroColors.amber[400],
      dark: retroColors.amber[800],
      contrastText: '#ffffff',
    },
    secondary: {
      main: retroColors.yellow[400],
      light: retroColors.yellow[300],
      dark: retroColors.yellow[600],
      contrastText: retroColors.amber[900],
    },
    background: {
      default: retroColors.amber[50],
      paper: '#ffffff',
    },
    text: {
      primary: retroColors.amber[800],
      secondary: retroColors.amber[600],
    },
    warning: {
      main: retroColors.yellow[500],
    },
    error: {
      main: '#dc2626',
      dark: '#991b1b',
    },
  },
  typography: {
    fontFamily: '"Courier New", monospace',
    h1: {
      fontFamily: '"Courier New", monospace',
      fontWeight: 700,
      letterSpacing: '0.1em',
    },
    h2: {
      fontFamily: '"Courier New", monospace',
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
    h3: {
      fontFamily: '"Courier New", monospace',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    h4: {
      fontFamily: '"Courier New", monospace',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Courier New", monospace',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Courier New", monospace',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Courier New", monospace',
      fontWeight: 700,
      letterSpacing: '0.1em',
    },
    body1: {
      fontFamily: '"Courier New", monospace',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"Courier New", monospace',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 0, // Sharp corners for retro look
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          fontWeight: 700,
          letterSpacing: '0.1em',
          border: '4px solid',
          boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translate(2px, 2px)',
            boxShadow: '6px 6px 0px 0px rgba(180,83,9)',
          },
          '&:active': {
            transform: 'translate(8px, 8px)',
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: retroColors.amber[600],
          borderColor: retroColors.amber[700],
          color: '#ffffff',
          '&:hover': {
            backgroundColor: retroColors.amber[700],
          },
        },
        outlinedPrimary: {
          backgroundColor: '#ffffff',
          borderColor: retroColors.amber[700],
          color: retroColors.amber[800],
          '&:hover': {
            backgroundColor: retroColors.amber[50],
          },
        },
        containedSecondary: {
          backgroundColor: retroColors.yellow[400],
          borderColor: retroColors.amber[700],
          color: retroColors.amber[900],
          '&:hover': {
            backgroundColor: retroColors.yellow[500],
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '4px solid',
          borderColor: retroColors.amber[700],
          boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '4px solid',
          borderColor: retroColors.amber[700],
          boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
          transition: 'all 0.5s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            backgroundColor: '#ffffff',
            '& fieldset': {
              borderColor: retroColors.amber[600],
              borderWidth: '3px',
            },
            '&:hover fieldset': {
              borderColor: retroColors.amber[700],
            },
            '&.Mui-focused fieldset': {
              borderColor: retroColors.amber[800],
              borderWidth: '4px',
            },
          },
          '& .MuiInputLabel-root': {
            color: retroColors.amber[700],
            fontFamily: '"Courier New", monospace',
            fontWeight: 600,
          },
          '& .MuiInputBase-input': {
            fontFamily: '"Courier New", monospace',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          border: '4px solid',
          borderColor: retroColors.amber[700],
          boxShadow: '16px 16px 0px 0px rgba(180,83,9)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          borderBottom: '4px solid',
          borderColor: retroColors.amber[700],
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export default retroTheme;
