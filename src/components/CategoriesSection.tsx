'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  IconButton,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import Link from 'next/link';

interface CategoryItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

const residueCategories: CategoryItem[] = [
  {
    id: 'plastico',
    name: 'Plástico',
    price: 'R$ 0,30/kg',
    image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'papelao',
    name: 'Papelão',
    price: 'R$ 0,30/kg',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'madeira',
    name: 'Madeira',
    price: 'R$ 0,30/kg',
    image: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'organico',
    name: 'Orgânico',
    price: 'R$ 0,30/kg',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'oleos',
    name: 'Óleos',
    price: 'R$ 0,30/kg',
    image: 'https://images.unsplash.com/photo-1612825173281-9a193378527e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'borracha',
    name: 'Borracha',
    price: 'R$ 0,30/kg',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
  },
];

// Category Card Component - horizontal layout with text left, image right
function CategoryCard({ category }: { category: CategoryItem }) {
  return (
    <Link href={`/categoria/${category.id}`} style={{ textDecoration: 'none' }}>
      <Card
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderRadius: 3,
          cursor: 'pointer',
          height: '100%',
          minHeight: 120,
          border: '1px solid',
          borderColor: 'grey.200',
          boxShadow: 'none',
          transition: 'transform 0.2s, border-color 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            borderColor: 'grey.300',
          },
        }}
      >
        {/* Text content - left side */}
        <Box sx={{ flex: 1, pr: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}
          >
            {category.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            A partir de
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, color: 'primary.main' }}
          >
            {category.price}
          </Typography>
        </Box>

        {/* Image - right side */}
        <Box
          component="img"
          src={category.image}
          alt={category.name}
          sx={{
            width: 100,
            height: 100,
            objectFit: 'cover',
            borderRadius: 2,
            flexShrink: 0,
          }}
        />
      </Card>
    </Link>
  );
}

export default function CategoriesSection() {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">

        {/* Categories Grid - 2 rows layout */}
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'stretch' }}>
          {/* Left promo card */}
          <Card
            sx={{
              width: { xs: '100%', md: 280 },
              minWidth: { md: 280 },
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'space-between',
              bgcolor: '#0066CC',
              color: 'white',
              borderRadius: 3,
              p: 3,
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100\' height=\'100\' fill=\'none\'/%3E%3Cpath d=\'M0 50 Q25 30 50 50 T100 50\' stroke=\'%23ffffff\' stroke-opacity=\'0.1\' fill=\'none\'/%3E%3C/svg%3E")',
              backgroundSize: '200px',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              Encontre oportunidades em cada resíduo
            </Typography>
            <Button
              variant="contained"
              endIcon={<ChevronRight />}
              sx={{
                mt: 3,
                bgcolor: 'white',
                color: '#0066CC',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                alignSelf: 'flex-start',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Explorar conexões
            </Button>
          </Card>

          {/* Categories grid - 3 columns x 2 rows */}
          <Box sx={{ flex: 1, position: 'relative' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: 2,
              }}
            >
              {residueCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </Box>

            {/* Arrow button on right side */}
            <IconButton
              sx={{
                position: 'absolute',
                right: -24,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'grey.200',
                display: { xs: 'none', lg: 'flex' },
                '&:hover': { bgcolor: 'grey.50', borderColor: 'grey.300' },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
