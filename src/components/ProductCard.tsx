'use client';
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { Product } from '../data/products';
import Link from 'next/link';
import { formatPrice } from '../utils/formatters';

// Placeholder images for each category (using reliable Unsplash images)
const categoryPlaceholders: Record<string, string> = {
  plastico: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
  borracha: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
  papel: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
  papelao: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
  vidro: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
  metais: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
  metal: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
  madeira: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?auto=format&fit=crop&w=800&q=80',
  organico: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
  reee: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  eletronico: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  quimicos: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
  oleo: 'https://images.unsplash.com/photo-1612825173281-9a193378527e?auto=format&fit=crop&w=800&q=80',
  tecido: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=800&q=80',
  sucata: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
  rcc: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  default: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = React.useState(false);
  
  // Determine badge type based on product (could be extended with actual product data)
  const badgeType = 'Venda'; // Could be 'Venda', 'Compra', 'Demanda', etc.

  // Get fallback image based on category
  const getFallbackImage = () => {
    const category = product.category?.toLowerCase() || 'default';
    return categoryPlaceholders[category] || categoryPlaceholders.default;
  };

  const imageUrl = imgError ? getFallbackImage() : (product.images[0] || getFallbackImage());

  return (
    <Link href={`/produto/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card
        elevation={0}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'grey.200',
          boxShadow: 'none',
          transition: 'transform 0.2s ease, border-color 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            borderColor: 'grey.300',
          },
        }}
      >
        {/* Image */}
        <CardMedia
          component="img"
          height="220"
          image={imageUrl}
          alt={product.title}
          onError={() => setImgError(true)}
          sx={{
            objectFit: 'cover',
          }}
        />

        {/* Content */}
        <CardContent sx={{ flexGrow: 1, p: 2.5, pt: 2 }}>
          {/* Title + Badge Row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 1,
              mb: 1.5,
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 600,
                lineHeight: 1.3,
                color: 'text.primary',
                flex: 1,
              }}
            >
              {product.title}
            </Typography>
            <Chip
              label={badgeType}
              size="small"
              sx={{
                bgcolor: '#E8F5E9',
                color: '#2E7D32',
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 28,
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
          </Box>

          {/* Price */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 1,
              fontSize: '1.25rem',
            }}
          >
            {formatPrice(product.price)}
            <Typography
              component="span"
              sx={{
                fontSize: '1rem',
                fontWeight: 500,
                color: 'text.secondary',
              }}
            >
              /{product.adDetails?.quantity?.unit || 'kg'}
            </Typography>
          </Typography>

          {/* Location */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn
              sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }}
            />
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', fontSize: '0.9rem' }}
            >
              {product.location}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
