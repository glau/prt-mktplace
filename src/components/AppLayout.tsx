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
  SubscriptionsOutlined,
  BuildCircleOutlined,
  ArticleOutlined,
  HelpOutlineOutlined,
  PersonOutline,
} from '@mui/icons-material';
import MarketplaceAppBar from './MarketplaceAppBar';

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

  const handleOpenMobileNav = React.useCallback(() => {
    setMobileNavOpen(true);
    onMenuClick?.();
  }, [onMenuClick]);

  const handleCloseMobileNav = React.useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  const mobileNavigationItems = React.useMemo(
    () => [
      {
        label: 'Comprar',
        href: '/#comprar',
        icon: <ShoppingBagOutlined fontSize="small" />,
        description: 'Explorar ofertas disponíveis',
      },
      {
        label: 'Vender',
        href: '/#vender',
        icon: <StorefrontOutlined fontSize="small" />,
        description: 'Anunciar materiais e resíduos',
      },
      {
        label: 'Assinar',
        href: '/#assinar',
        icon: <SubscriptionsOutlined fontSize="small" />,
        description: 'Serviços e planos personalizados',
      },
      {
        label: 'Serviços',
        href: '/#servicos',
        icon: <BuildCircleOutlined fontSize="small" />,
        description: 'Soluções logísticas e suporte',
      },
      {
        label: 'Notícias',
        href: '/#noticias',
        icon: <ArticleOutlined fontSize="small" />,
        description: 'Conteúdos e novidades do setor',
      },
      {
        label: 'Ajuda',
        href: '/#ajuda',
        icon: <HelpOutlineOutlined fontSize="small" />,
        description: 'Central de suporte e FAQs',
      },
    ],
    [],
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {showAppBar ? <MarketplaceAppBar onMenuClick={handleOpenMobileNav} /> : null}
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
                sx={{ alignItems: 'center', py: 1.5 }}
              >
                <ListItemIcon sx={{ minWidth: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </ListItemIcon>
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
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PersonOutline />}
              onClick={handleCloseMobileNav}
              sx={{ borderRadius: 999, textTransform: 'none', fontWeight: 600 }}
            >
              Entrar na conta
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
