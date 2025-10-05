import React from 'react';
import { describe, it, expect, screen, fireEvent, renderWithColorMode } from '@/test';
import AppLayout from '../AppLayout';

describe('AppLayout', () => {
  it('renders children content', () => {
    renderWithColorMode(
      <AppLayout>
        <div data-testid="content">Hello</div>
      </AppLayout>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('shows app bar by default and can open mobile drawer', () => {
    renderWithColorMode(
      <AppLayout>
        <div>content</div>
      </AppLayout>
    );

    const menuBtn = screen.getByLabelText('Abrir menu');
    fireEvent.click(menuBtn);

    expect(screen.getByText('Navegação')).toBeInTheDocument();
  });

  it('can hide app bar when showAppBar=false', () => {
    renderWithColorMode(
      <AppLayout showAppBar={false}>
        <div>content</div>
      </AppLayout>
    );

    expect(screen.queryByLabelText('Abrir menu')).not.toBeInTheDocument();
  });
});
