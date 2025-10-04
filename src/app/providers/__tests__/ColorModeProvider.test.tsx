import { renderHook, act, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import ColorModeProvider, { useColorMode } from '../ColorModeProvider';

declare global {
  interface Window {
    matchMedia: (query: string) => MediaQueryList;
  }
}

describe('ColorModeProvider', () => {
  type MediaQueryListener = (this: MediaQueryList, event: MediaQueryListEvent) => void;
  let matchMediaListeners: MediaQueryListener[] = [];
  let matchMediaObjects: MediaQueryList[] = [];
  let prefersDark = false;

  const updateSystemPreference = (value: boolean) => {
    prefersDark = value;
    matchMediaObjects.forEach((mediaQueryList) => {
      Object.defineProperty(mediaQueryList, 'matches', { value, configurable: true });
      const event = { matches: value } as MediaQueryListEvent;
      matchMediaListeners.forEach((listener) => listener.call(mediaQueryList, event));
    });
  };

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => {
        matchMediaObjects = matchMediaObjects.filter((item) => item.media !== query);

        const listeners: MediaQueryListener[] = [];

        const add = (listener: MediaQueryListener) => {
          listeners.push(listener);
          matchMediaListeners.push(listener);
        };

        const remove = (listener: MediaQueryListener) => {
          matchMediaListeners = matchMediaListeners.filter((cb) => cb !== listener);
          const index = listeners.indexOf(listener);
          if (index > -1) listeners.splice(index, 1);
        };

        const mediaQueryList = {
          matches: prefersDark,
          media: query,
          onchange: null,
          addEventListener: (_event: 'change', listener: MediaQueryListener) => add(listener),
          removeEventListener: (_event: 'change', listener: MediaQueryListener) => remove(listener),
          addListener: (listener: MediaQueryListener) => add(listener),
          removeListener: (listener: MediaQueryListener) => remove(listener),
          dispatchEvent: (event: Event) => {
            listeners.forEach((listener) => listener.call(mediaQueryList as MediaQueryList, event as MediaQueryListEvent));
            return true;
          },
        } as MediaQueryList;

        matchMediaObjects.push(mediaQueryList);
        return mediaQueryList;
      }),
    });
  });

  beforeEach(() => {
    prefersDark = false;
    matchMediaListeners = [];
    matchMediaObjects = [];
    window.localStorage.clear();
  });

  it('provides light mode by default', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ColorModeProvider>{children}</ColorModeProvider>;
    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(result.current.mode).toBe('light');
  });

  it('respects stored preference in localStorage', () => {
    window.localStorage.setItem('color-mode', 'dark');
    const wrapper = ({ children }: { children: React.ReactNode }) => <ColorModeProvider>{children}</ColorModeProvider>;
    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(result.current.mode).toBe('dark');
  });

  it('toggles between light and dark mode and persists preference', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ColorModeProvider>{children}</ColorModeProvider>;
    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(result.current.mode).toBe('light');

    await act(async () => {
      result.current.toggleColorMode();
    });

    await waitFor(() => {
      expect(result.current.mode).toBe('dark');
    });
    expect(window.localStorage.getItem('color-mode')).toBe('dark');

    await act(async () => {
      result.current.toggleColorMode();
    });

    await waitFor(() => {
      expect(result.current.mode).toBe('light');
    });
    expect(window.localStorage.getItem('color-mode')).toBe('light');
  });

  it('allows setting mode explicitly through setMode', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ColorModeProvider>{children}</ColorModeProvider>;
    const { result } = renderHook(() => useColorMode(), { wrapper });

    await act(async () => {
      result.current.setMode('dark');
    });

    await waitFor(() => {
      expect(result.current.mode).toBe('dark');
    });
    expect(window.localStorage.getItem('color-mode')).toBe('dark');
  });

  it('reacts to system preference changes when in system mode', async () => {
    window.localStorage.setItem('color-mode', 'system');
    prefersDark = false;

    const wrapper = ({ children }: { children: React.ReactNode }) => <ColorModeProvider>{children}</ColorModeProvider>;
    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(result.current.mode).toBe('light');

    updateSystemPreference(true);

    await waitFor(() => {
      expect(result.current.mode).toBe('dark');
    });
  });

  it('throws an error when useColorMode is used outside provider', () => {
    expect(() => renderHook(() => useColorMode())).toThrowError('useColorMode must be used within ColorModeProvider');
  });
});
