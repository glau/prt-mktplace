import React from 'react';
import { describe, it, expect, screen, render, fireEvent } from '@/test';
import { vi } from 'vitest';
import { menuItems } from '../../config/navigation';

const toggleSpy = vi.fn();
vi.mock('../../app/providers/ColorModeProvider', () => ({
  useColorMode: () => ({ mode: 'light', toggleColorMode: toggleSpy }),
}));

const MobileNavDrawer = (await import('../nav/MobileNavDrawer')).default;

describe('MobileNavDrawer', () => {
  it('renders mobile-visible items from config', () => {
    render(<MobileNavDrawer open onClose={() => {}} items={menuItems} />);
    expect(screen.getByText('Comprar')).toBeInTheDocument();
    expect(screen.getByText('Vender')).toBeInTheDocument();
    expect(screen.getByText('Serviços')).toBeInTheDocument();
    expect(screen.getByText('Notícias')).toBeInTheDocument();
  });

  it('triggers color mode toggle', () => {
    render(<MobileNavDrawer open onClose={() => {}} items={menuItems} />);
    fireEvent.click(screen.getByRole('button', { name: /alternar tema/i }));
    expect(toggleSpy).toHaveBeenCalled();
  });
});
