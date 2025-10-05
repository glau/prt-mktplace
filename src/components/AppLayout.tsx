'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Divider,
  Typography,
  Stack,
  Button,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  PersonOutline,
} from '@mui/icons-material';
import MarketplaceAppBar from './MarketplaceAppBar';
import { useColorMode } from '../app/providers/ColorModeProvider';
import MobileNavDrawer from './nav/MobileNavDrawer';
import { menuItems } from '../config/navigation';

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
  const { mode, toggleColorMode } = useColorMode();

  const handleOpenMobileNav = React.useCallback(() => {
    setMobileNavOpen(true);
    onMenuClick?.();
  }, [onMenuClick]);

  const handleCloseMobileNav = React.useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {showAppBar ? <MarketplaceAppBar onMenuClick={handleOpenMobileNav} /> : null}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
      <MobileNavDrawer
        open={mobileNavOpen}
        onClose={handleCloseMobileNav}
        items={menuItems}
        footer={
          <Button
            variant="outlined"
            color="primary"
            startIcon={<PersonOutline />}
            onClick={handleCloseMobileNav}
            sx={{ borderRadius: 999, textTransform: 'none', fontWeight: 600 }}
          >
            Entrar na conta
          </Button>
        }
      />
    </Box>
  );
}

