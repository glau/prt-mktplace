'use client';
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Rating,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Verified,
  LocationOn,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { Product } from '../data/products';
import Link from 'next/link';
import { useFavorites } from '../hooks/useFavorites';
import { formatPrice } from '../utils/formatters';
import { cardHoverStyle, textEllipsisStyles } from '../styles/commonStyles';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites({ productId: product.id });

  return (
    <Link href={`/produto/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          ...cardHoverStyle,
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={product.images[0]}
            alt={product.title}
            sx={{ objectFit: 'cover' }}
          />
          <IconButton
            sx={(theme) => ({
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: alpha(theme.palette.background.paper, 1),
              },
            })}
            onClick={toggleFavorite}
          >
            {isFavorite ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              mb: 1,
              lineHeight: 1.3,
              ...textEllipsisStyles(2),
            }}
          >
            {product.title}
          </Typography>

          <Typography
            variant="h5"
            color="primary"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            {formatPrice(product.price)}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {product.location}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
                {product.seller.name}
              </Typography>
              {product.seller.verified && (
                <Verified sx={{ fontSize: 16, color: 'primary.main' }} />
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                value={product.seller.rating}
                precision={0.1}
                size="small"
                readOnly
                sx={{ mr: 0.5 }}
              />
              <Typography variant="body2" color="text.secondary">
                ({product.seller.rating})
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
