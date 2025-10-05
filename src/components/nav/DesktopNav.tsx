"use client";

import React from 'react';
import { Box, Button } from '@mui/material';
import type { MenuItem } from '../../config/navigation';

export interface DesktopNavProps {
  items: MenuItem[];
}

export default function DesktopNav({ items }: DesktopNavProps) {
  const desktopItems = React.useMemo(() => items.filter(i => i.visibleDesktop), [items]);

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
      {desktopItems.map(item => (
        <Button
          key={item.label}
          color="inherit"
          sx={{ textTransform: 'none', fontWeight: item.label === 'Comprar' ? 600 : 500 }}
          endIcon={item.label === 'Comprar' ? undefined : undefined}
          href={item.href}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
}
