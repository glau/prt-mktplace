'use client';

import React from 'react';

export type AuthUser = { email: string } | null;

interface Credentials {
  email: string;
  password: string;
}

interface UserContextValue {
  user: AuthUser;
  token: string | null;
  isLoading: boolean;
  login: (creds: Credentials) => Promise<void>;
  register: (creds: Credentials) => Promise<void>;
  logout: () => void;
}

const UserContext = React.createContext<UserContextValue | undefined>(undefined);

const TOKEN_KEY = 'auth:token';

async function apiPost<T>(path: string, body: any): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

async function apiGet<T>(path: string, token?: string | null): Promise<T> {
  const res = await fetch(path, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // Hydrate session on mount
  React.useEffect(() => {
    let active = true;
    const stored = typeof window !== 'undefined' ? window.sessionStorage.getItem(TOKEN_KEY) : null;
    if (stored) setToken(stored);

    (async () => {
      if (!stored) {
        if (active) setIsLoading(false);
        return;
      }
      try {
        const data = await apiGet<{ user: { email: string } }>("/api/auth/session", stored);
        if (!active) return;
        setUser({ email: data.user.email });
      } catch {
        if (typeof window !== 'undefined') window.sessionStorage.removeItem(TOKEN_KEY);
        if (!active) return;
        setToken(null);
        setUser(null);
      } finally {
        if (active) setIsLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const login = React.useCallback(async ({ email, password }: Credentials) => {
    setIsLoading(true);
    try {
      const data = await apiPost<{ user: { email: string }; token: string }>("/api/auth/login", { email, password });
      setUser({ email: data.user.email });
      setToken(data.token);
      if (typeof window !== 'undefined') window.sessionStorage.setItem(TOKEN_KEY, data.token);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = React.useCallback(async ({ email, password }: Credentials) => {
    setIsLoading(true);
    try {
      const data = await apiPost<{ user: { email: string }; token: string }>("/api/auth/register", { email, password });
      setUser({ email: data.user.email });
      setToken(data.token);
      if (typeof window !== 'undefined') window.sessionStorage.setItem(TOKEN_KEY, data.token);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') window.sessionStorage.removeItem(TOKEN_KEY);
  }, []);

  const value = React.useMemo<UserContextValue>(
    () => ({ user, token, isLoading, login, register, logout }),
    [user, token, isLoading, login, register, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = React.useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
