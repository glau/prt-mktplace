'use client';
import { createTheme, alpha } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'dark' ? '0 2px 8px rgba(0,0,0,0.6)' : '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: 8,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
          outlinedPrimary: {
            // Melhor contraste no dark mode para botões outlined
            color: '#1976d2',
            borderColor: alpha('#1976d2', mode === 'dark' ? 0.6 : 0.5),
            '&:hover': {
              backgroundColor: alpha('#1976d2', mode === 'dark' ? 0.16 : 0.08),
              borderColor: alpha('#1976d2', mode === 'dark' ? 0.8 : 0.7),
            },
          },
        },
      },
    },
  });

// Backward-compatible default theme (light)
const theme = createAppTheme('light');
export default theme;
