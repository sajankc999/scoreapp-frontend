// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f172a', // bg-950
      paper: '#1e293b',   // bg-800 / bg-900
    },
    primary: {
      main: '#22c55e',    // green 500
      dark: '#16a34a',    // green 600
      light: '#4ade80',   // green 400
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a855f7',    // purple 500
      dark: '#9333ea',    // purple 600
      light: '#c084fc',   // purple 400
      contrastText: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#64748b', // gray-500
      disabled: '#475569',  // gray-600
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e293b', // default card bg
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;