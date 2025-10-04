'use client';

import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Box,
  Chip,
  Paper,
  CircularProgress,
  Button,
  Stack,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Category as CategoryIcon,
  TrendingUp,
} from '@mui/icons-material';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import type { Category, Product } from '../data/products';
import { fetchCategories, fetchProducts } from '../lib/api';
import AppLayout from '../components/AppLayout';
import HeroSection from '../components/HeroSection';
import { cardHoverStyle, responsiveGrid } from '../styles/commonStyles';

export default function Home() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);
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
        setFeaturedProducts(productsData.slice(0, 8));
      } catch (err) {
        console.error(err);
        if (active) {
          setError('Não foi possível carregar os dados.');
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>{error}</Typography>
            <Typography variant="body2" color="text.secondary">
              Recarregue a página ou tente novamente mais tarde.
            </Typography>
          </Paper>
        </Container>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <HeroSection />

      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >

        {/* Categories Section */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
              Categorias
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: responsiveGrid.categories,
              gap: 3,
            }}
          >
            {categories.map((category) => (
              <Link href={`/categoria/${category.id}`} key={category.id} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    height: '100%',
                    ...cardHoverStyle,
                  }}
                >
                  <CardActionArea sx={{ p: 2, textAlign: 'center' }}>
                    <CardContent sx={{ p: 0 }}>
                      <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                        {category.name}
                      </Typography>
                      <Chip
                        label={`${category.count} anúncios`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            ))}
          </Box>
        </Box>

        {/* Featured Products Section */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
              Produtos em Destaque
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: responsiveGrid.products,
              gap: 3,
            }}
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        </Box>

        {/* Footer Info */}
        <Paper 
          elevation={1}
          sx={{
            p: 4,
            mt: 6,
            textAlign: 'center',
            bgcolor: 'background.paper',
            borderColor: 'divider'
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Protótipo para Validação Interna
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Este é um protótipo do redesign do marketplace B2Blue usando Material UI 7.
            Desenvolvido para alinhamento interno e validação de conceitos de UX/UI.
          </Typography>
        </Paper>
      </Container>
    </AppLayout>
  );
}
