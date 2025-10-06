'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  ArrowForward,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/app/providers/UserProvider';

export interface AuthPageProps {
  mode: 'login' | 'register';
}

export default function AuthPage({ mode }: AuthPageProps) {
  const router = useRouter();
  const { login, register, isLoading, user } = useUser();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    
    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({ email, password });
      }
      router.push('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Falha na autenticação');
    }
  }

  const isLogin = mode === 'login';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Left Side - Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 4, md: 6 },
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          {/* Logo/Brand */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '2rem' }} aria-label="Ir para a página inicial">
            <Image
              src="/assets/b2bluelogo.svg"
              alt="B2Blue Compra, Venda e Gerenciamento de Resíduos"
              width={120}
              height={48}
              priority
            />
          </Link>

          {/* Welcome Message */}
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {isLogin
              ? 'Insira suas credenciais para acessar sua conta'
              : 'Cadastre-se para começar a negociar materiais sustentáveis'}
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                autoFocus
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
                data-testid='auth-email'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'background.default',
                  },
                }}
              />

              <TextField
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                data-testid='auth-password'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'background.default',
                  },
                }}
              />

              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={() => router.back()}
                  sx={{
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isLoading}
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  {isLogin ? 'Entrar' : 'Cadastrar'}
                </Button>
              </Stack>
            </Stack>
          </form>

          {/* Social Login */}
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <IconButton
              sx={{
                border: 1,
                borderColor: 'divider',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              sx={{
                border: 1,
                borderColor: 'divider',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              <TwitterIcon />
            </IconButton>
          </Stack>

          {/* Toggle Mode */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
              <MuiLink
                component={Link}
                href={isLogin ? '/register' : '/login'}
                sx={{ fontWeight: 600, textDecoration: 'none' }}
              >
                {isLogin ? 'Cadastre-se' : 'Entrar'}
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Brand/Info */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A4F9E 0%, #0F6BD7 100%)',
          color: 'white',
          p: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 400,
            height: 400,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
          }}
        />

        {/* Content */}
        <Box sx={{ textAlign: 'center', zIndex: 1, maxWidth: 400 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            {isLogin ? 'Bem-vindo de volta!' : 'Novo por aqui?'}
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            {isLogin
              ? 'Continue sua jornada no comércio sustentável'
              : 'Cadastre-se e descubra um grande número de novas oportunidades!'}
          </Typography>
          {!isLogin && (
            <Button
              component={Link}
              href="/login"
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'white',
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Entrar
            </Button>
          )}
          {isLogin && (
            <Button
              component={Link}
              href="/register"
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'white',
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Cadastre-se
            </Button>
          )}
        </Box>
      </Box>

      {/* Mobile Bottom Section */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A4F9E 0%, #0F6BD7 100%)',
          color: 'white',
          p: 4,
          textAlign: 'center',
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {isLogin ? 'Novo por aqui?' : 'Já tem uma conta?'}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
            {isLogin
              ? 'Cadastre-se e descubra novas oportunidades!'
              : 'Faça login para continuar sua jornada'}
          </Typography>
          <Button
            component={Link}
            href={isLogin ? '/register' : '/login'}
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {isLogin ? 'Cadastre-se' : 'Entrar'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
