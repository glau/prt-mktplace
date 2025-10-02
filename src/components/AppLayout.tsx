'use client';

import React from 'react';
import { Box } from '@mui/material';
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
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {showAppBar ? <MarketplaceAppBar onMenuClick={onMenuClick} /> : null}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
    </Box>
  );
}
