'use client';
import React from 'react';
import { initMocks } from '../../mocks/initMocks';

interface MswProviderProps {
  children: React.ReactNode;
}

export default function MswProvider({ children }: MswProviderProps) {
  const [isReady, setIsReady] = React.useState(process.env.NODE_ENV !== 'development');

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    let active = true;

    initMocks()
      .catch((error) => {
        console.error('MSW initialization failed', error);
      })
      .finally(() => {
        if (active) {
          setIsReady(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
