'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from '@mui/material';
import type { Product } from '../data/products';
import { fetchProducts } from '../lib/api';
import AppLayout from '../components/AppLayout';
import HeroBanner from '../components/HeroBanner';
import ServiceCards from '../components/ServiceCards';
import SearchSection from '../components/SearchSection';
import CategoriesSection from '../components/CategoriesSection';
import ProductSection from '../components/ProductSection';
import HomeFooter from '../components/HomeFooter';

export default function Home() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const productsData = await fetchProducts();

        if (!active) return;

        setProducts(productsData);
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

  // Split products into different sections
  const nearbyProducts = products.slice(0, 5);
  const categoryHighlights = products.slice(5, 10);
  const openDemands = products.slice(10, 15);

  if (loading) {
    return (
      <AppLayout>
        <Container maxWidth="lg" sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Container>
      </AppLayout>
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
      {/* Hero Banner */}
      <HeroBanner />

      {/* Service Cards */}
      <ServiceCards />

      {/* Search Section */}
      <SearchSection />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Product Sections */}
      <ProductSection
        title="Oportunidades Perto de Você"
        products={nearbyProducts}
      />

      <ProductSection
        title="Destaques da Categoria"
        products={categoryHighlights}
      />

      <ProductSection
        title="Demandas Abertas"
        products={openDemands}
      />

      {/* Footer */}
      <HomeFooter />
    </AppLayout>
  );
}
