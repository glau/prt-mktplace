'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Stack,
  Box,
  Typography,
  IconButton,
  Button,
  Badge,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExpandMore,
  FavoriteBorder,
  ShoppingCartOutlined,
  PersonOutline,
  Search as SearchIcon,
} from '@mui/icons-material';
import Image from 'next/image';

export interface MarketplaceAppBarProps {
  showAuthButtons?: boolean;
  onMenuClick?: () => void;
}

export default function MarketplaceAppBar({
  showAuthButtons = true,
  onMenuClick,
}: MarketplaceAppBarProps) {
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
      <Toolbar sx={{ gap: { xs: 2, md: 3 }, py: { xs: 1, md: 1.5 }, flexWrap: 'wrap' }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexShrink: 0 }}>
          <Image
            src="/assets/b2bluelogo.svg"
            alt="B2Blue Marketplace"
            width={120}
            height={48}
            priority
          />
        </Stack>

        <IconButton
          size="large"
          sx={{ display: { xs: 'inline-flex', md: 'none' }, ml: 'auto' }}
          color="inherit"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            flexGrow: 1,
            justifyContent: { xs: 'flex-start', md: 'center' },
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Button endIcon={<ExpandMore />} color="inherit" sx={{ textTransform: 'none', fontWeight: 600 }}>
            Comprar
          </Button>
          <Button color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
            Vender
          </Button>
          <Button color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
            Assinar
          </Button>
          <Button color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
            Serviços
          </Button>
          <Button color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
            Notícias
          </Button>
          <Button color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
            Ajuda
          </Button>
        </Stack>

        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexShrink: 0 }}>
          <IconButton color="inherit" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <Badge color="primary" variant="dot">
              <FavoriteBorder />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge color="primary" badgeContent={3} sx={{ '& .MuiBadge-badge': { fontSize: 10 } }}>
              <ShoppingCartOutlined />
            </Badge>
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
              <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main', display: { xs: 'inline-flex', sm: 'none' } }}>
                <PersonOutline fontSize="small" />
              </Avatar>
            </>
          ) : null}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
