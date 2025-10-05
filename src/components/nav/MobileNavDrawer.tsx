"use client";

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import { useColorMode } from '../../app/providers/ColorModeProvider';
import type { MenuItem } from '../../config/navigation';

export interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  items: MenuItem[];
  footer?: React.ReactNode;
}

export default function MobileNavDrawer({ open, onClose, items, footer }: MobileNavDrawerProps) {
  const { mode, toggleColorMode } = useColorMode();
  const mobileItems = React.useMemo(() => items.filter(i => i.visibleMobile), [items]);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: { width: 320 } }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography variant="h6" fontWeight={600} sx={{ px: 2, py: 1.5 }}>
          Navegação
        </Typography>
        <Divider />
        <List sx={{ flexGrow: 1 }}>
          {mobileItems.map((item) => (
            <ListItemButton
              key={item.label}
              component={Link}
              href={item.href}
              onClick={onClose}
              sx={{ alignItems: 'flex-start', py: 1.5 }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <Stack spacing={1.5} sx={{ px: 2, py: 2.5 }}>
          {footer}
          <Button
            variant="text"
            color="inherit"
            onClick={toggleColorMode}
            sx={{ justifyContent: 'flex-start', textTransform: 'none', fontWeight: 600 }}
            aria-label="Alternar tema"
          >
            {mode === 'dark' ? 'Alternar tema' : 'Alternar tema'}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}

