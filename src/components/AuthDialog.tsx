'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import { useUser } from '@/app/providers/UserProvider';

export interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

type Mode = 'login' | 'register';

export default function AuthDialog({ open, onClose }: AuthDialogProps) {
  const { login, register, isLoading } = useUser();
  const [mode, setMode] = React.useState<Mode>('login');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) {
      setEmail('');
      setPassword('');
      setError(null);
      setMode('login');
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({ email, password });
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Falha na autenticação');
    }
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="auth-dialog-title">
      <form onSubmit={handleSubmit}>
        <DialogTitle id="auth-dialog-title">{mode === 'login' ? 'Entrar' : 'Cadastrar'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              autoFocus
              required
              slotProps={{ input: { 'data-testid': 'auth-email' } as any }}
            />
            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              slotProps={{ input: { 'data-testid': 'auth-password' } as any }}
            />
            {error ? (
              <div role="alert" style={{ color: 'crimson', fontSize: 14 }}>{error}</div>
            ) : null}
            <MuiLink
              component="button"
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              sx={{ alignSelf: 'flex-start' }}
            >
              {mode === 'login' ? 'Não possui conta? Cadastre-se' : 'Já possui conta? Entrar'}
            </MuiLink>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
