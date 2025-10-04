import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppLayout from '../AppLayout';
import ColorModeProvider from '../../app/providers/ColorModeProvider';

const renderWithProviders = (ui: React.ReactElement) =>
  render(<ColorModeProvider>{ui}</ColorModeProvider>);

describe('AppLayout', () => {
  it('renders children content', () => {
    renderWithProviders(
      <AppLayout>
        <div data-testid="content">Hello</div>
      </AppLayout>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('shows app bar by default and can open mobile drawer', () => {
    renderWithProviders(
      <AppLayout>
        <div>content</div>
      </AppLayout>
    );

    const menuBtn = screen.getByLabelText('Abrir menu');
    fireEvent.click(menuBtn);

    expect(screen.getByText('Navegação')).toBeInTheDocument();
  });

  it('can hide app bar when showAppBar=false', () => {
    renderWithProviders(
      <AppLayout showAppBar={false}>
        <div>content</div>
      </AppLayout>
    );

    expect(screen.queryByLabelText('Abrir menu')).not.toBeInTheDocument();
  });
});
