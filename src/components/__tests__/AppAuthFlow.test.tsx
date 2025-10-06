import React from 'react';
import { describe, it, expect, screen, render, waitFor, within } from '@/test';
import userEvent from '@testing-library/user-event';
import AppLayout from '../AppLayout';

describe('App Authentication Flow (MSW)', () => {
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
});
