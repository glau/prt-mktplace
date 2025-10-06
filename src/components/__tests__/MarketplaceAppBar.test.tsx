import React from 'react';
import { describe, it, expect, screen, render, fireEvent } from '@/test';
import { vi } from 'vitest';

const toggleSpy = vi.fn();
vi.mock('../../app/providers/ColorModeProvider', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useColorMode: () => ({ mode: 'light', toggleColorMode: toggleSpy }),
}));

const MarketplaceAppBar = (await import('../MarketplaceAppBar')).default;

describe('MarketplaceAppBar', () => {
  it('renders and calls onMenuClick when menu button is clicked', () => {
    const onMenuClick = vi.fn();
    render(<MarketplaceAppBar onMenuClick={onMenuClick} />);

    const menu = screen.getByLabelText('Abrir menu');
    fireEvent.click(menu);

    expect(onMenuClick).toHaveBeenCalled();
  });

  it('toggles theme on click', () => {
    const { unmount } = render(<MarketplaceAppBar />);

    const btn = screen.getByLabelText('Alternar tema');
    fireEvent.click(btn);

    expect(toggleSpy).toHaveBeenCalled();
    unmount();
  });

  it('hides auth buttons when showAuthButtons=false', () => {
    render(<MarketplaceAppBar showAuthButtons={false} />);

    expect(screen.queryByText('Entrar')).not.toBeInTheDocument();
  });
});

