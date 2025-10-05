'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  PersonOutline,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import { useColorMode } from '../app/providers/ColorModeProvider';
import Image from 'next/image';
import Link from 'next/link';
import DesktopNav from './nav/DesktopNav';
import { menuItems } from '../config/navigation';

export interface MarketplaceAppBarProps {
  showAuthButtons?: boolean;
  onMenuClick?: () => void;
}

export default function MarketplaceAppBar({
  showAuthButtons = true,
  onMenuClick,
}: MarketplaceAppBarProps) {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar
        component="div"
        sx={{
          py: { xs: 1, md: 1.5 },
          width: '100%',
          maxWidth: { md: 1280 },
          mx: 'auto',
          px: { xs: 2, md: 3 },
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: '64px'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <IconButton
            size="large"
            sx={{ display: { xs: 'inline-flex', md: 'none' }, mr: 1 }}
            color="inherit"
            onClick={onMenuClick}
            aria-label="Abrir menu"
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center' }} aria-label="Ir para a página inicial">
            <Image
              src="/assets/b2bluelogo.svg"
              alt="B2Blue Compra, Venda e Gerenciamento de Resíduos"
              width={120}
              height={48}
              priority
            />
          </Link>
        </Box>

        <Box sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <DesktopNav items={menuItems} />
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexShrink: 0 }}>
          <IconButton color="inherit" onClick={toggleColorMode} aria-label="Alternar tema" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
          {showAuthButtons ? (
            <>
              <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, height: 28 }} />
              <Button
                variant="outlined"
                color="primary"
                startIcon={<PersonOutline />}
                sx={{
                  borderRadius: 999,
                  px: 3,
                  textTransform: 'none',
                  display: { xs: 'none', sm: 'inline-flex' },
                }}
              >
                Entrar
              </Button>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'transparent',
                  color: 'inherit',
                  display: { xs: 'inline-flex', sm: 'none' },
                }}
              >
                <PersonOutline fontSize="small" />
              </Avatar>
            </>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

