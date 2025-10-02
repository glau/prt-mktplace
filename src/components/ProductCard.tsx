'use client';
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Rating,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Verified,
  LocationOn,
} from '@mui/icons-material';
import { Product } from '../data/products';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/produto/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
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
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            }}
            onClick={handleFavoriteClick}
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
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.3,
            }}
          >
            {product.title}
          </Typography>

          <Typography
            variant="h5"
            color="primary"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            R$ {product.price.toFixed(2).replace('.', ',')}
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
