'use client';
import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
  Chip,
  Paper,
} from '@mui/material';
import {
  Category as CategoryIcon,
  TrendingUp,
} from '@mui/icons-material';
import Link from 'next/link';
import { categories, products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          B2Blue Marketplace
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
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
  );
}
