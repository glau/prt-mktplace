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
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Category as CategoryIcon,
  TrendingUp,
  Search as SearchIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import type { Category, Product } from '../data/products';
import { fetchCategories, fetchProducts } from '../lib/api';
import AppLayout from '../components/AppLayout';

type HeroTab = 'comprar' | 'vender';

const HERO_TAB_CONFIG: Record<HeroTab, { placeholder: string; buttonLabel: string }> = {
  comprar: {
    placeholder: 'O que você quer encontrar?',
    buttonLabel: 'Encontrar oportunidades',
  },
  vender: {
    placeholder: 'Qual resíduo você vai ofertar?',
    buttonLabel: 'Criar meu anúncio',
  },
};

export default function Home() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [heroTab, setHeroTab] = React.useState<HeroTab>('comprar');
  const { placeholder: heroPlaceholder, buttonLabel: heroButtonLabel } = HERO_TAB_CONFIG[heroTab];

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
      {/* Hero Section (Full Bleed) */}
      <Box
        component="section"
        sx={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          color: 'common.white',
          backgroundImage: 'linear-gradient(135deg, #0A4F9E 0%, #0F6BD7 100%)',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 5, md: 7 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 1, md: 3 },
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 4, md: 5 }}
            alignItems="center"
            justifyContent="center"
          >
            <Box
              sx={{
                maxWidth: 700,
                textAlign: { xs: 'left', md: 'center' },
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={(theme) => ({
                  fontWeight: 700,
                  lineHeight: { xs: 1.25, md: 1.1 },
                  mb: 2,
                  fontSize: {
                    xs: theme.typography.pxToRem(30),
                    sm: theme.typography.pxToRem(32),
                    md: theme.typography.pxToRem(32),
                  },
                })}
              >
                Conectamos empresas para transformar resíduos em valor
              </Typography>
              <Typography
                variant="h6"
                sx={(theme) => ({
                  fontWeight: 400,
                  maxWidth: 520,
                  mb: 3,
                  mx: { xs: 0, md: 'auto' },
                  fontSize: {
                    xs: theme.typography.pxToRem(16),
                    sm: theme.typography.pxToRem(18),
                    md: theme.typography.pxToRem(18),
                  },
                })}
              >
                Mais de 20 mil negócios já fazem parte do maior ecossistema de valorização de resíduos do Brasil.
              </Typography>
            </Box>
          </Stack>

          <Paper
            elevation={6}
            sx={{
              bgcolor: 'rgba(255,255,255,0.96)',
              borderRadius: 4,
              px: { xs: 2, sm: 4 },
              py: { xs: 2.5, sm: 3 },
            }}
          >
            <Tabs
              value={heroTab}
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{ mb: 2, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 } }}
              onChange={(_, value: HeroTab) => setHeroTab(value)}
            >
              <Tab value="comprar" label="Quero comprar" />
              <Tab value="vender" label="Quero vender" />
            </Tabs>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              sx={{ mt: 3 }}
            >
              <TextField
                fullWidth
                size="medium"
                placeholder={heroPlaceholder}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  px: { xs: 3, md: 5 },
                  borderRadius: 999,
                  fontWeight: 600,
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {heroButtonLabel}
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>

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
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(6, 1fr)',
              },
              gap: 3,
            }}
          >
            {categories.map((category) => (
              <Link href={`/categoria/${category.id}`} key={category.id} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
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
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 3,
            }}
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        </Box>

        {/* Footer Info */}
        <Paper sx={{ p: 4, mt: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
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
