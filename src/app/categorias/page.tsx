'use client';
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Divider,
  Breadcrumbs,
  Link as MuiLink,
  Paper,
} from '@mui/material';
import { Category as CategoryIcon, TrendingUp } from '@mui/icons-material';
import NextLink from 'next/link';
import { categories, products } from '../../data/products';

export default function CategoriesPage() {
  const totalProducts = products.length;
  const totalCategories = categories.length;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink component={NextLink} href="/" color="inherit" underline="hover">
          Início
        </MuiLink>
        <Typography color="text.primary">Categorias</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          Todas as Categorias
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore as principais categorias de materiais recicláveis disponibilizadas na plataforma.
        </Typography>
      </Box>

      {/* Stats */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', mb: 0.5 }}>
            Total de categorias
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>{totalCategories}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', mb: 0.5 }}>
            Anúncios ativos
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>{totalProducts}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', mb: 0.5 }}>
            Categoria em destaque
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp color="primary" fontSize="small" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {categories[0]?.name ?? 'N/A'}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Divider sx={{ mb: 4 }} />

      {/* Categories Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {categories.map((category) => (
          <Card
            key={category.id}
            sx={{
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <CardActionArea component={NextLink} href={`/categoria/${category.id}`} sx={{ p: 3 }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {category.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Veja ofertas de {category.name.toLowerCase()} disponíveis para compra e venda.
                </Typography>
                <Chip label={`${category.count} anúncios`} color="primary" variant="outlined" />
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
