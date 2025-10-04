import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import MswProvider from '../MswProvider';

vi.mock('../../../mocks/initMocks', () => {
  return {
    initMocks: vi.fn(() => Promise.resolve()),
  };
});

const { initMocks } = await import('../../../mocks/initMocks');

describe('MswProvider', () => {
  const originalEnv = { ...process.env };
  let originalSessionStorage: Storage;
  let originalServiceWorker: typeof navigator.serviceWorker;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv, NODE_ENV: 'test' };
    delete process.env.NEXT_PUBLIC_ENABLE_MSW;

    originalSessionStorage = window.sessionStorage;
    const sessionStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: vi.fn((key: string) => store[key] ?? null),
        setItem: vi.fn((key: string, value: string) => {
          store[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
          delete store[key];
        }),
        clear: vi.fn(() => {
          store = {};
        }),
        key: vi.fn(() => null),
        length: 0,
      } as unknown as Storage;
    })();
    Object.defineProperty(window, 'sessionStorage', {
      value: sessionStorageMock,
      configurable: true,
    });

    originalServiceWorker = navigator.serviceWorker;
    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        controller: {},
      },
      configurable: true,
    });
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    Object.defineProperty(window, 'sessionStorage', {
      value: originalSessionStorage,
      configurable: true,
    });
    Object.defineProperty(navigator, 'serviceWorker', {
      value: originalServiceWorker,
      configurable: true,
    });
  });

  it('renders children immediately when MSW is disabled', () => {
    render(
      <MswProvider>
        <span>ready</span>
      </MswProvider>
    );

    expect(screen.getByText('ready')).toBeInTheDocument();
    expect(initMocks).not.toHaveBeenCalled();
  });

  it('initializes MSW and renders children once ready when enabled', async () => {
    process.env.NEXT_PUBLIC_ENABLE_MSW = 'true';

    render(
      <MswProvider>
        <span>ready</span>
      </MswProvider>
    );

    expect(screen.queryByText('ready')).not.toBeInTheDocument();
    expect(initMocks).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('ready')).toBeInTheDocument();
    });

    expect((window as Window & { __MSW_READY?: boolean }).__MSW_READY).toBe(true);
    expect(window.sessionStorage.setItem).not.toHaveBeenCalledWith('msw:first-controlled-reload', '1');
  });

  it('forces reload when service worker has not taken control yet', async () => {
    process.env.NEXT_PUBLIC_ENABLE_MSW = 'true';
    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        controller: undefined,
      },
      configurable: true,
    });

    render(
      <MswProvider>
        <span>ready</span>
      </MswProvider>
    );

    await waitFor(() => {
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith('msw:first-controlled-reload', '1');
    });
    expect(screen.queryByText('ready')).not.toBeInTheDocument();
  });

  it('does not set state after unmount if initialization resolves later', async () => {
    process.env.NEXT_PUBLIC_ENABLE_MSW = 'true';
    (initMocks as Mock).mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 10);
        })
    );

    const { unmount } = render(
      <MswProvider>
        <span>ready</span>
      </MswProvider>
    );

    unmount();

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
  });
});
