'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Stack,
  Button,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  ShoppingBagOutlined,
  StorefrontOutlined,
  BuildCircleOutlined,
  ArticleOutlined,
  PersonOutline,
} from '@mui/icons-material';
import MarketplaceAppBar from './MarketplaceAppBar';
import { coreNavItems } from '@/utils/navigation';
import AuthDialog from './AuthDialog';
import { useUser } from '@/app/providers/UserProvider';

export interface AppLayoutProps {
  children: React.ReactNode;
  showAppBar?: boolean;
  onMenuClick?: () => void;
}

export default function AppLayout({
  children,
  showAppBar = true,
  onMenuClick,
}: AppLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [authOpen, setAuthOpen] = React.useState(false);
  const { user } = useUser();

  const handleOpenMobileNav = React.useCallback(() => {
    setMobileNavOpen(true);
    onMenuClick?.();
  }, [onMenuClick]);

  const handleCloseMobileNav = React.useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  const mobileNavigationItems = React.useMemo(
    () =>
      coreNavItems.map((item) => {
        const icon =
          item.key === 'comprar' ? (
            <ShoppingBagOutlined fontSize="small" />
          ) : item.key === 'vender' ? (
            <StorefrontOutlined fontSize="small" />
          ) : item.key === 'servicos' ? (
            <BuildCircleOutlined fontSize="small" />
          ) : (
            <ArticleOutlined fontSize="small" />
          );
        const description =
          item.key === 'comprar'
            ? 'Explorar ofertas disponíveis'
            : item.key === 'vender'
            ? 'Anunciar materiais e resíduos'
            : item.key === 'servicos'
            ? 'Soluções logísticas e suporte'
            : 'Conteúdos e novidades do setor';
        return { ...item, icon, description };
      }),
    [],
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {showAppBar ? (
        <MarketplaceAppBar
          onMenuClick={handleOpenMobileNav}
          onAuthClick={() => setAuthOpen(true)}
        />
      ) : null}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
      <Drawer
        anchor="left"
        open={mobileNavOpen}
        onClose={handleCloseMobileNav}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: 320 } }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5 }}>
            <Typography variant="h6" fontWeight={600}>
              Navegação
            </Typography>
            <IconButton edge="end" onClick={handleCloseMobileNav} aria-label="Fechar menu">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          <List sx={{ flexGrow: 1 }}>
            {mobileNavigationItems.map((item) => (
              <ListItemButton
                key={item.label}
                component={Link}
                href={item.href}
                onClick={handleCloseMobileNav}
                sx={{ alignItems: 'flex-start', py: 1.5 }}
              >
                <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  secondary={item.description}
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <Stack spacing={1.5} sx={{ px: 2, py: 2.5 }}>
            {user ? (
              <Button
                variant="outlined"
                color="primary"
                sx={{ borderRadius: 999, textTransform: 'none', fontWeight: 600 }}
                onClick={handleCloseMobileNav}
              >
                Minha Conta
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<PersonOutline />}
                onClick={() => { setAuthOpen(true); handleCloseMobileNav(); }}
                sx={{ borderRadius: 999, textTransform: 'none', fontWeight: 600 }}
              >
                Entrar na conta
              </Button>
            )}
          </Stack>
        </Box>
      </Drawer>
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </Box>
  );
}


