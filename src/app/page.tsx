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
    <AppLayout>
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          bgcolor: 'linear-gradient(90deg, #0B7A3B 0%, #069246 100%)',
          color: 'common.white',
          px: { xs: 3, md: 6 },
          pt: { xs: 6, md: 8 },
          pb: { xs: 4, md: 6 },
          minHeight: { xs: 320, md: 360 },
          backgroundImage: 'linear-gradient(135deg, #0A7A3C 0%, #0CB357 100%)',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 6 }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="overline"
              sx={{
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontWeight: 600,
                mb: 1,
                display: 'block',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              Programa de logística reversa
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: 700, lineHeight: 1.1, mb: 2 }}
            >
              Conectamos resíduos a novos ciclos produtivos
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 520, mb: 3 }}>
              Negocie materiais reaproveitáveis com fornecedores confiáveis e reduza custos com sustentabilidade.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 999,
                  textTransform: 'none',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.25)',
                }}
              >
                Ver materiais disponíveis
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  borderColor: 'rgba(255,255,255,0.6)',
                  color: 'common.white',
                  '&:hover': {
                    borderColor: 'common.white',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  },
                }}
              >
                Quero vender resíduos
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              minHeight: { xs: 200, md: 260 },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: { xs: '10% 10% auto', md: '6% 12% auto' },
                height: { xs: 220, md: 260 },
                borderRadius: 4,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
                filter: 'blur(20px)',
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=800&q=80"
              alt="Caminhão transportando resíduos recicláveis"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 420,
                borderRadius: 24,
                boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
              }}
            />
          </Box>
        </Stack>

        <Paper
          elevation={6}
          sx={{
            mt: { xs: 4, md: 6 },
            bgcolor: 'rgba(255,255,255,0.96)',
            borderRadius: 4,
            px: { xs: 2, sm: 4 },
            py: { xs: 2.5, sm: 3 },
          }}
        >
          <Tabs
            value={0}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 2, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 } }}
          >
            <Tab label="Comprar resíduos" />
            <Tab label="Quero vender" disabled />
            <Tab label="Transporte logístico" disabled />
            <Tab label="Financiamento" disabled />
          </Tabs>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack direction="row" spacing={1}>
              <Chip label="Todos" color="primary" sx={{ fontWeight: 600 }} />
              <Chip label="Verificados" variant="outlined" />
              <Chip label="Próximos" variant="outlined" />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Chip label="Metal" variant="outlined" />
              <Chip label="Plástico" variant="outlined" />
              <Chip label="Vidro" variant="outlined" />
            </Stack>
          </Stack>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{ mt: 3 }}
          >
            <TextField
              fullWidth
              size="medium"
              placeholder="Buscar material ou localidade"
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
              }}
            >
              Ver ofertas
            </Button>
          </Stack>
        </Paper>
      </Box>

      {/* Header */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          B2Blue Marketplace
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Conectando empresas na gestão sustentável de resíduos
        </Typography>
      </Box>

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
