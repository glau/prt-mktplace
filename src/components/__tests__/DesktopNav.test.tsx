import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test';
import { menuItems } from '../../config/navigation';

const DesktopNav = (await import('../nav/DesktopNav')).default;

describe('DesktopNav', () => {
  it('renders desktop-visible menu items from config', () => {
    render(<DesktopNav items={menuItems} />);
    expect(screen.getByText('Comprar')).toBeInTheDocument();
    expect(screen.getByText('Vender')).toBeInTheDocument();
    expect(screen.getByText('Serviços')).toBeInTheDocument();
    expect(screen.getByText('Notícias')).toBeInTheDocument();
  });
});
