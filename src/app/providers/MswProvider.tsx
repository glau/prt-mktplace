'use client';
import React from 'react';
import { initMocks } from '../../mocks/initMocks';

interface MswProviderProps {
  children: React.ReactNode;
}

export default function MswProvider({ children }: MswProviderProps) {
  const isDev = process.env.NODE_ENV === 'development';
  const enableMsw =
    (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_ENABLE_MSW === 'true') ||
    (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_ENABLE_MSW === '1');
  const isProd = process.env.NODE_ENV === 'production';
  const shouldEnable = isDev || enableMsw || isProd;
  // If MSW is not enabled, we are ready immediately. If it is, wait until worker starts.
  const [isReady, setIsReady] = React.useState(!shouldEnable);

  React.useEffect(() => {
    if (!shouldEnable) return;

    let active = true;

    initMocks()
      .catch((error) => {
        console.error('MSW initialization failed', error);
      })
      .finally(() => {
        try {
          // Ensure the page is controlled by the SW on first load in production.
          const flag = 'msw:first-controlled-reload';
          const hasReloaded = typeof sessionStorage !== 'undefined' && sessionStorage.getItem(flag) === '1';
          const isControlled = typeof navigator !== 'undefined' && !!navigator.serviceWorker?.controller;
          if (!isControlled && !hasReloaded) {
            sessionStorage?.setItem(flag, '1');
            // Hard reload once so the newly installed SW takes control.
            window.location.reload();
            return;
          }
        } catch {}
        try {
          (window as Window & { __MSW_READY?: boolean }).__MSW_READY = true;
        } catch {}
        if (active) setIsReady(true);
      });

    return () => {
      active = false;
    };
  }, [shouldEnable]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
