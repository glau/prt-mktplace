import React from 'react';
import { describe, it, expect, screen, render, fireEvent, waitFor, act } from '@/test';

// We will import after the test env is ready to ensure MSW handlers are registered
const { UserProvider, useUser } = await import('../UserProvider');

function Harness() {
  const { user, login, register, logout, isLoading } = useUser();
  return (
    <div>
      <div data-testid="user-email">{user?.email ?? ''}</div>
      <div data-testid="loading">{isLoading ? '1' : '0'}</div>
      <button onClick={() => login({ email: 'teste@teste.com', password: '1234' })}>login-seed</button>
      <button onClick={() => register({ email: 'john@test.com', password: 'pw' })}>register-john</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

describe('UserProvider/useUser', () => {
  it('logs in with seeded user and populates state', async () => {
    render(
      <UserProvider>
        <Harness />
      </UserProvider>
    );

    fireEvent.click(screen.getByText('login-seed'));

    await waitFor(() => {
      expect(screen.getByTestId('user-email').textContent).toBe('teste@teste.com');
    });
  });

  it('registers a new user and hydrates session from token on remount', async () => {
    const email = `user${Math.random().toString(16).slice(2)}@test.com`;

    const RegHarness = () => {
      const { user, register } = useUser();
      return (
        <div>
          <div data-testid="user-email">{user?.email ?? ''}</div>
          <button onClick={() => register({ email, password: 'pw' })}>go</button>
        </div>
      );
    };

    const { unmount } = render(
      <UserProvider>
        <RegHarness />
      </UserProvider>
    );

    fireEvent.click(screen.getByText('go'));

    await waitFor(() => {
      expect(screen.getByTestId('user-email').textContent).toBe(email);
    });

    // Unmount/remount to test hydration via /api/auth/session
    unmount();

    render(
      <UserProvider>
        <Harness />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user-email').textContent).toBe(email);
    });
  });

  it('logout clears user', async () => {
    render(
      <UserProvider>
        <Harness />
      </UserProvider>
    );

    fireEvent.click(screen.getByText('login-seed'));
    await waitFor(() => expect(screen.getByTestId('user-email').textContent).toBe('teste@teste.com'));

    fireEvent.click(screen.getByText('logout'));
    await waitFor(() => expect(screen.getByTestId('user-email').textContent).toBe(''));
  });
});
