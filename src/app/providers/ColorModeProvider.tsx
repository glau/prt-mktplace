'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { PaletteMode } from '@mui/material';
import { createAppTheme } from '../../theme';

export interface ColorModeContextProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
  setMode: (mode: PaletteMode) => void;
}

const ColorModeContext = React.createContext<ColorModeContextProps | undefined>(undefined);

function getInitialMode(): PaletteMode {
  if (typeof window === 'undefined') return 'light';
  const stored = getStoredPreference();
  if (stored === 'light' || stored === 'dark') return stored;
  try {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function getStoredPreference(): 'system' | PaletteMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = window.localStorage.getItem('color-mode');
    return stored === 'light' || stored === 'dark' ? stored : 'system';
  } catch {
    return 'system';
  }
}

export default function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = React.useState<PaletteMode>(getInitialMode);
  const [preference, setPreference] = React.useState<'system' | PaletteMode>(getStoredPreference);
  const [prefersDark, setPrefersDark] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setPrefersDark(event.matches);
    };

    handleChange(mediaQuery);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  React.useEffect(() => {
    if (preference === 'system') {
      setModeState(prefersDark ? 'dark' : 'light');
    } else {
      setModeState(preference);
    }
  }, [preference, prefersDark]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('color-mode', preference);
    } catch {}
  }, [preference]);

  const toggleColorMode = React.useCallback(() => {
    setPreference((prevPreference) => {
      const base = prevPreference === 'system' ? mode : prevPreference;
      return base === 'light' ? 'dark' : 'light';
    });
  }, [mode]);

  const handleSetMode = React.useCallback((nextMode: PaletteMode) => {
    setPreference(nextMode);
  }, []);

  const value = React.useMemo<ColorModeContextProps>(
    () => ({
      mode,
      toggleColorMode,
      setMode: handleSetMode,
    }),
    [handleSetMode, mode, toggleColorMode]
  );

  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorMode(): ColorModeContextProps {
  const ctx = React.useContext(ColorModeContext);
  if (!ctx) throw new Error('useColorMode must be used within ColorModeProvider');
  return ctx;
}
