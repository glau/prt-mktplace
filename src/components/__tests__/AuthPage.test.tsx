import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from '@/components/AuthPage';
import { UserProvider } from '@/app/providers/UserProvider';

const mockPush = vi.fn();
const mockReplace = vi.fn();
const mockBack = vi.fn();

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: mockBack,
  }),
}));

// Mock UserProvider hooks
const mockLogin = vi.fn();
const mockRegister = vi.fn();

vi.mock('@/app/providers/UserProvider', async () => {
  const actual = await vi.importActual('@/app/providers/UserProvider');
  return {
    ...actual,
    useUser: () => ({
      user: null,
      token: null,
      isLoading: false,
      login: mockLogin,
      register: mockRegister,
      logout: vi.fn(),
    }),
  };
});

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          {ui}
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('AuthPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form by default', () => {
    renderWithProviders(<AuthPage mode="login" />);

    expect(screen.getByText('Bem-vindo de volta')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('renders register form when mode is register', () => {
    renderWithProviders(<AuthPage mode="register" />);

    expect(screen.getByText('Crie sua conta')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('calls login function with correct credentials', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce(undefined);

    renderWithProviders(<AuthPage mode="login" />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('calls register function with correct credentials', async () => {
    const user = userEvent.setup();
    mockRegister.mockResolvedValueOnce(undefined);

    renderWithProviders(<AuthPage mode="register" />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /cadastrar/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('displays error message on login failure', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Invalid credentials';
    mockLogin.mockRejectedValueOnce(new Error(errorMessage));

    renderWithProviders(<AuthPage mode="login" />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();

    renderWithProviders(<AuthPage mode="login" />);

    const passwordInput = screen.getByLabelText(/senha/i);
    const toggleButton = screen.getByTestId('VisibilityIcon').closest('button');

    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(toggleButton!);

    // After click, password should be visible
    expect(passwordInput).toHaveAttribute('type', 'text');

    const toggleButtonOff = screen.getByTestId('VisibilityOffIcon').closest('button');

    await user.click(toggleButtonOff!);

    // After second click, password should be hidden again
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('calls router.back when back button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AuthPage mode="login" />);

    const backButton = screen.getByLabelText(/voltar/i);
    await user.click(backButton);

    expect(mockBack).toHaveBeenCalled();
  });

  it('calls router.replace when toggling mode', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AuthPage mode="login" />);

    const toggleContainer = screen.getByText(/não tem uma conta\?/i);
    const toggleLink = toggleContainer.querySelector('a');

    await user.click(toggleLink!);

    expect(mockReplace).toHaveBeenCalledWith('/register');
  });
});
