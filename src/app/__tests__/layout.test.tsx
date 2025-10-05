import React from 'react';
import { describe, it, expect, screen, render } from '@/test';
import { vi } from 'vitest';

// Mock providers to simple pass-throughs
vi.mock('@mui/material-nextjs/v15-appRouter', () => ({
  AppRouterCacheProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock('../providers/ColorModeProvider', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock('../providers/MswProvider', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const { default: RootLayout, metadata } = await import('../layout');

describe('RootLayout', () => {
  it('renders children inside html/body and providers', () => {
    render(
      <RootLayout>
        <span data-testid="child">Child</span>
      </RootLayout>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    // Ensure base structure exists
    expect(document.querySelector('html')).not.toBeNull();
    expect(document.querySelector('body')).not.toBeNull();
  });

  it('exports proper metadata', () => {
    expect(metadata.title).toBe('B2Blue Marketplace');
    expect(metadata.description).toBe('Marketplace para gestão de resíduos');
  });
});
