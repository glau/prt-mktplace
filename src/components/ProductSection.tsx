'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import ProductCard from './ProductCard';
import type { Product } from '../data/products';

interface ProductSectionProps {
  title: string;
  products: Product[];
  showViewAll?: boolean;
}

export default function ProductSection({
  title,
  products,
  showViewAll = true,
}: ProductSectionProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 700 }}
          >
            {title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={() => scroll('left')}
              size="small"
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={() => scroll('right')}
              size="small"
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        {/* Products carousel */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            pb: 1,
            mx: -1,
            px: 1,
          }}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              sx={{
                minWidth: { xs: 260, sm: 280 },
                maxWidth: { xs: 260, sm: 280 },
              }}
            >
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>

        {/* View All button */}
        {showViewAll && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
              }}
            >
              Ver todos
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
