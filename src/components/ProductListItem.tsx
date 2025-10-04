'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Paper, Typography, Stack, Rating, IconButton } from '@mui/material';
import { LocationOn, Verified, Favorite, FavoriteBorder } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import type { Product } from '../data/products';
import { useFavorites } from '../hooks/useFavorites';
import { formatPrice } from '../utils/formatters';
import { textEllipsisStyles } from '../styles/commonStyles';

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const { isFavorite, toggleFavorite } = useFavorites({ productId: product.id });

  return (
    <Link href={`/produto/${product.id}`} style={{ textDecoration: 'none' }}>
      <Paper
        variant="outlined"
        sx={(theme) => ({
          p: 0,
          display: 'flex',
          gap: 0,
          alignItems: 'stretch',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          borderRadius: 3,
          overflow: 'hidden',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.08)}`,
          },
        })}
      >
        <Box
          sx={{
            position: 'relative',
            width: 240,
            display: 'flex',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={product.images[0]}
            alt={product.title}
            sx={{
              width: '100%',
              borderRadius: 0,
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          <IconButton
            size="small"
            onClick={toggleFavorite}
            sx={(theme) => ({
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              '&:hover': {
                backgroundColor: alpha(theme.palette.background.paper, 1),
              },
            })}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorite ? <Favorite fontSize="small" color="error" /> : <FavoriteBorder fontSize="small" />}
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1, p: 2.5 }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                lineHeight: 1.3,
                ...textEllipsisStyles(2),
              }}
            >
              {product.title}
            </Typography>

            {/* espaço reservado para alinhamento */}
            <Box sx={{ width: 40, height: 24 }} />
          </Stack>

          <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
            {formatPrice(product.price)}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {product.location}
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              ...textEllipsisStyles(3),
            }}
          >
            {product.description}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {product.seller.name}
              </Typography>
              {product.seller.verified ? (
                <Verified sx={{ fontSize: 18, color: 'primary.main' }} />
              ) : null}
            </Stack>

            <Rating
              value={product.seller.rating}
              precision={0.1}
              size="small"
              readOnly
              sx={{ ml: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              ({product.seller.rating})
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Link>
  );
}
