import React from 'react';
import { describe, it, expect, screen, render, waitFor, within, beforeEach } from '@/test';
import userEvent from '@testing-library/user-event';
import AppLayout from '../AppLayout';

describe('App Authentication Flow (MSW)', () => {
  beforeEach(() => {
    // Clear session storage between tests
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear();
    }
  });

  it('opens auth dialog from AppBar and logs in with seeded user, showing "Minha Conta" after', async () => {
    const user = userEvent.setup();
    render(
      <AppLayout>
        <div>home</div>
      </AppLayout>
    );

    // Initially shows "Entrar"
    expect(screen.getByText('Entrar')).toBeInTheDocument();

    const entrar = screen.getByText('Entrar');
    await user.click(entrar);

    const dialog = await screen.findByRole('dialog');
    const email = within(dialog).getByTestId('auth-email');
    const senha = within(dialog).getByTestId('auth-password');

    await user.type(email, 'teste@teste.com');
    await user.type(senha, '1234');

    const submitButton = within(dialog).getByRole('button', { name: 'Entrar' });
    await user.click(submitButton);

    // Wait for login to complete - dialog closes and "Entrar" button disappears
    await waitFor(
      () => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        // The "Entrar" button in AppBar should be gone (replaced by "Minha Conta" or hidden)
        const entrarButtons = screen.queryAllByRole('button', { name: 'Entrar' });
        expect(entrarButtons.length).toBe(0);
      },
      { timeout: 3000 }
    );
  });

  it('allows logout via AppBar button (desktop)', async () => {
    const user = userEvent.setup();
    render(
      <AppLayout>
        <div>home</div>
      </AppLayout>
    );

    // Login first
    const entrar = screen.getByText('Entrar');
    await user.click(entrar);

    const dialog = await screen.findByRole('dialog');
    await user.type(within(dialog).getByTestId('auth-email'), 'teste@teste.com');
    await user.type(within(dialog).getByTestId('auth-password'), '1234');
    await user.click(within(dialog).getByRole('button', { name: 'Entrar' }));

    // Wait for login
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    // Find and click logout button in AppBar
    const sairButtons = screen.getAllByRole('button', { name: /sair/i });
    const appBarSairButton = sairButtons.find(btn => 
      btn.closest('[class*="MuiAppBar"]') !== null
    );
    
    expect(appBarSairButton).toBeInTheDocument();
    await user.click(appBarSairButton!);

    // Verify logged out - "Entrar" button should be back
    await waitFor(() => {
      expect(screen.getByText('Entrar')).toBeInTheDocument();
    });
  });

  it('allows logout via mobile drawer button', async () => {
    const user = userEvent.setup();
    render(
      <AppLayout>
        <div>home</div>
      </AppLayout>
    );

    // Login first
    const entrar = screen.getByText('Entrar');
    await user.click(entrar);

    const dialog = await screen.findByRole('dialog');
    await user.type(within(dialog).getByTestId('auth-email'), 'teste@teste.com');
    await user.type(within(dialog).getByTestId('auth-password'), '1234');
    await user.click(within(dialog).getByRole('button', { name: 'Entrar' }));

    // Wait for login
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    // Open mobile drawer
    const menuButton = screen.getByLabelText('Abrir menu');
    await user.click(menuButton);

    // Find and click logout button in drawer
    const drawerSairButton = await screen.findByRole('button', { name: /sair/i });
    await user.click(drawerSairButton);

    // Verify logged out - "Entrar na conta" should be back
    await waitFor(() => {
      expect(screen.getByText('Entrar na conta')).toBeInTheDocument();
    });
  });
});
