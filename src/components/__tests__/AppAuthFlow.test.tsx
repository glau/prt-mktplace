import React from 'react';
import { describe, it, expect, screen, render } from '@/test';
import AppLayout from '../AppLayout';

describe('App Authentication Flow', () => {
  it('renders a login link', () => {
    render(
      <AppLayout>
        <div>home</div>
      </AppLayout>
    );

    const loginLink = screen.getByRole('link', { name: /entrar/i });
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});

