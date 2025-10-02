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
  CircularProgress,
} from '@mui/material';
import { Category as CategoryIcon, TrendingUp } from '@mui/icons-material';
import NextLink from 'next/link';
import type { Category, Product } from '../../data/products';
import { fetchCategories, fetchProducts } from '../../lib/api';

export default function CategoriesPage() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [categoriesData, productsData] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);

        if (!active) return;

        setCategories(categoriesData);
        setProducts(productsData);
      } catch (err) {
        console.error(err);
        if (active) {
          setError('Não foi possível carregar as categorias.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const featuredCategory = categories.reduce<Category | null>((acc, current) => {
    if (!acc) return current;
    return current.count > acc.count ? current : acc;
  }, null);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>{error}</Typography>
          <Typography variant="body2" color="text.secondary">
            Recarregue a página ou tente novamente mais tarde.
          </Typography>
        </Paper>
      </Container>
    );
  }

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
              {featuredCategory?.name ?? 'N/A'}
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
