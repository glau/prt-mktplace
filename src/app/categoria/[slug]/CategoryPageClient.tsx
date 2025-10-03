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

interface CategoryPageClientProps {
  slug: string;
}

type CategoryResponse = { category: Category };
type ProductsResponse = { products: Product[] };

export default function CategoryPageClient({ slug }: CategoryPageClientProps) {
  const [category, setCategory] = React.useState<Category | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [priceBounds, setPriceBounds] = React.useState<[number, number]>([0, 0]);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 0]);
  const [sortBy, setSortBy] = React.useState('recent');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [locationFilter, setLocationFilter] = React.useState('');
  const [selectedConditions, setSelectedConditions] = React.useState<string[]>([]);
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
        setPriceRange([0, max || 0]);
        setSelectedConditions([]);
      } catch (loadError) {
        console.error(loadError);
        setError('Não foi possível carregar os dados da categoria.');
        setCategory(null);
        setProducts([]);
        setPriceBounds([0, 0]);
        setPriceRange([0, 0]);
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

  const handleConditionChange = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((item) => item !== condition)
        : [...prev, condition]
    );
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (locationFilter === '' || product.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1]
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

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Buscar
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Localização
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Cidade, Estado"
                value={locationFilter}
                onChange={(event) => setLocationFilter(event.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Faixa de Preço
              </Typography>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
                valueLabelDisplay="auto"
                min={priceBounds[0]}
                max={priceBounds[1] || 0}
                valueLabelFormat={(value) => `R$ ${value.toFixed(2)}`}
                sx={{ mb: 1 }}
                disabled={priceBounds[1] === 0}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  R$ {priceRange[0].toFixed(2)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  R$ {priceRange[1].toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Estado
              </Typography>
              <FormGroup>
                {['Novo', 'Usado - Excelente', 'Usado - Bom', 'Usado - Regular'].map((condition) => (
                  <FormControlLabel
                    key={condition}
                    control={
                      <Checkbox
                        size="small"
                        checked={selectedConditions.includes(condition)}
                        onChange={() => handleConditionChange(condition)}
                      />
                    }
                    label={<Typography variant="body2">{condition}</Typography>}
                  />
                ))}
              </FormGroup>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setPriceRange(priceBounds);
                setSelectedConditions([]);
              }}
            >
              Limpar Filtros
            </Button>
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

          {(searchTerm || locationFilter || selectedConditions.length > 0) && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Filtros ativos:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {searchTerm && (
                  <Chip
                    label={`Busca: "${searchTerm}"`}
                    onDelete={() => setSearchTerm('')}
                    size="small"
                  />
                )}
                {locationFilter && (
                  <Chip
                    label={`Local: "${locationFilter}"`}
                    onDelete={() => setLocationFilter('')}
                    size="small"
                  />
                )}
                {selectedConditions.map((condition) => (
                  <Chip
                    key={condition}
                    label={condition}
                    onDelete={() => handleConditionChange(condition)}
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
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                  },
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

          {/* Conteúdo dos filtros (mesmo do sidebar) */}
          <Box sx={{ px: 2, py: 2, overflowY: 'auto', overflowX: 'hidden', flex: 1 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Buscar
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Localização
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Cidade, Estado"
                value={locationFilter}
                onChange={(event) => setLocationFilter(event.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Faixa de Preço
              </Typography>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
                valueLabelDisplay="auto"
                min={priceBounds[0]}
                max={priceBounds[1] || 0}
                valueLabelFormat={(value) => `R$ ${value.toFixed(2)}`}
                sx={{ mb: 1 }}
                disabled={priceBounds[1] === 0}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  R$ {priceRange[0].toFixed(2)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  R$ {priceRange[1].toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Estado
              </Typography>
              <FormGroup>
                {['Novo', 'Usado - Excelente', 'Usado - Bom', 'Usado - Regular'].map((condition) => (
                  <FormControlLabel
                    key={condition}
                    control={
                      <Checkbox
                        size="small"
                        checked={selectedConditions.includes(condition)}
                        onChange={() => handleConditionChange(condition)}
                      />
                    }
                    label={<Typography variant="body2">{condition}</Typography>}
                  />
                ))}
              </FormGroup>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setPriceRange(priceBounds);
                setSelectedConditions([]);
              }}
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
