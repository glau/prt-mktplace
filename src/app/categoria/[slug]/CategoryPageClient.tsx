'use client';
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Divider,
  Button,
  Slider,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Drawer,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Search, FilterList, LocationOn, ViewModule, ViewList, Close } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import type { Category, Product } from '../../../data/products';
import ProductCard from '../../../components/ProductCard';
import ProductListItem from '../../../components/ProductListItem';
import AppLayout from '../../../components/AppLayout';
import ProductFilters, { FilterState } from '../../../components/ProductFilters';
import { responsiveGrid } from '../../../styles/commonStyles';

interface CategoryPageClientProps {
  slug: string;
}

type CategoryResponse = { category: Category };
type ProductsResponse = { products: Product[] };

export default function CategoryPageClient({ slug }: CategoryPageClientProps) {
  const [category, setCategory] = React.useState<Category | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [priceBounds, setPriceBounds] = React.useState<[number, number]>([0, 0]);
  const [filters, setFilters] = React.useState<FilterState>({
    searchTerm: '',
    locationFilter: '',
    priceRange: [0, 0],
    selectedConditions: [],
  });
  const [sortBy, setSortBy] = React.useState('recent');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isListView = isMdUp && viewMode === 'list';

  React.useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const [categoryRes, productsRes] = await Promise.all([
          fetch(`/api/categories/${slug}`),
          fetch(`/api/products?category=${slug}`),
        ]);

        if (!active) {
          return;
        }

        if (!categoryRes.ok) {
          throw new Error('Não foi possível carregar a categoria');
        }

        const categoryJson = (await categoryRes.json()) as CategoryResponse;
        setCategory(categoryJson.category);

        if (!productsRes.ok) {
          throw new Error('Não foi possível carregar os produtos');
        }

        const productsJson = (await productsRes.json()) as ProductsResponse;
        setProducts(productsJson.products);

        const max = productsJson.products.length > 0
          ? Math.max(...productsJson.products.map((product) => product.price))
          : 0;

        setPriceBounds([0, max]);
        setFilters(prev => ({ ...prev, priceRange: [0, max || 0] }));
      } catch (loadError) {
        console.error(loadError);
        setError('Não foi possível carregar os dados da categoria.');
        setCategory(null);
        setProducts([]);
        setPriceBounds([0, 0]);
        setFilters(prev => ({ ...prev, priceRange: [0, 0] }));
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [slug]);

  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: '',
      locationFilter: '',
      priceRange: priceBounds,
      selectedConditions: [],
    });
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
    (filters.locationFilter === '' || product.location.toLowerCase().includes(filters.locationFilter.toLowerCase())) &&
    product.price >= filters.priceRange[0] &&
    product.price <= filters.priceRange[1]
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  React.useEffect(() => {
    if (!isMdUp && viewMode !== 'grid') {
      setViewMode('grid');
    }
  }, [isMdUp, viewMode]);

  if (loading) {
    return (
      <AppLayout>
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        </Container>
      </AppLayout>
    );
  }

  if (error || !category) {
    return (
      <AppLayout>
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {error ?? 'Categoria não encontrada'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tente voltar e selecionar outra categoria.
            </Typography>
          </Paper>
        </Container>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Container maxWidth="xl" sx={{ py: 3, overflowX: 'hidden' }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link href="/" color="inherit" underline="hover">
            Início
          </Link>
          <Link href="/categorias" color="inherit" underline="hover">
            Categorias
          </Link>
          <Typography color="text.primary">{category.name}</Typography>
        </Breadcrumbs>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
            {category.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {sortedProducts.length} anúncios encontrados
          </Typography>
        </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '280px 1fr',
          },
          gap: 3,
        }}
      >
        <Box sx={{ display: { xs: 'none', md: 'block' }, minWidth: 0 }}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Filtros
            </Typography>
            <ProductFilters
              filters={filters}
              priceBounds={priceBounds}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </Paper>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Ordenar por:
                </Typography>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="recent">Mais recentes</MenuItem>
                    <MenuItem value="price-low">Menor preço</MenuItem>
                    <MenuItem value="price-high">Maior preço</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Visualização:
                </Typography>
                <Button
                  size="small"
                  variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                  onClick={() => setViewMode('grid')}
                  sx={{ minWidth: 'auto', p: 1 }}
                >
                  <ViewModule fontSize="small" />
                </Button>
                <Button
                  size="small"
                  variant={viewMode === 'list' ? 'contained' : 'outlined'}
                  onClick={() => setViewMode('list')}
                  sx={{ minWidth: 'auto', p: 1 }}
                >
                  <ViewList fontSize="small" />
                </Button>
              </Box>
            </Box>
          </Paper>

          {(filters.searchTerm || filters.locationFilter || filters.selectedConditions.length > 0) && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Filtros ativos:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {filters.searchTerm && (
                  <Chip
                    label={`Busca: "${filters.searchTerm}"`}
                    onDelete={() => handleFiltersChange({ searchTerm: '' })}
                    size="small"
                  />
                )}
                {filters.locationFilter && (
                  <Chip
                    label={`Local: "${filters.locationFilter}"`}
                    onDelete={() => handleFiltersChange({ locationFilter: '' })}
                    size="small"
                  />
                )}
                {filters.selectedConditions.map((condition) => (
                  <Chip
                    key={condition}
                    label={condition}
                    onDelete={() => handleFiltersChange({ 
                      selectedConditions: filters.selectedConditions.filter(c => c !== condition) 
                    })}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {sortedProducts.length > 0 ? (
            isListView ? (
              <Stack spacing={2.5}>
                {sortedProducts.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </Stack>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: responsiveGrid.productsList,
                  gap: 3,
                }}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Box>
            )
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Nenhum produto encontrado
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tente ajustar os filtros ou buscar por outros termos.
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', bottom: 20, right: 20 }}>
        <Button
          variant="contained"
          startIcon={<FilterList />}
          sx={{ borderRadius: '50px' }}
          onClick={() => setFiltersOpen(true)}
        >
          Filtros
        </Button>
      </Box>

      {/* Drawer Mobile de Filtros */}
      <Drawer
        anchor="bottom"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            height: '85vh',
          },
        }}
      >
        <Box
          role="dialog"
          aria-label="Filtros"
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2, pb: 1 }}>
            <Typography variant="h6">Filtros</Typography>
            <IconButton aria-label="Fechar filtros" onClick={() => setFiltersOpen(false)}>
              <Close />
            </IconButton>
          </Stack>
          <Divider />

          {/* Conteúdo dos filtros */}
          <Box sx={{ px: 2, py: 2, overflowY: 'auto', overflowX: 'hidden', flex: 1 }}>
            <ProductFilters
              filters={filters}
              priceBounds={priceBounds}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </Box>
          <Divider />
          <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClearFilters}
            >
              Limpar
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setFiltersOpen(false)}
            >
              Aplicar filtros
            </Button>
          </Box>
        </Box>
      </Drawer>
      </Container>
    </AppLayout>
  );
}
