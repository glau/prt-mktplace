'use client';
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  FormControl,
  InputLabel,
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
} from '@mui/material';
import {
  Search,
  FilterList,
  LocationOn,
  Category as CategoryIcon,
  ViewModule,
  ViewList,
} from '@mui/icons-material';
import { Product } from '../../../data/products';
import ProductCard from '../../../components/ProductCard';

interface CategoryPageClientProps {
  category: {
    id: string;
    name: string;
    count: number;
  };
  categoryProducts: Product[];
}

export default function CategoryPageClient({ category, categoryProducts }: CategoryPageClientProps) {
  const [sortBy, setSortBy] = React.useState('recent');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [locationFilter, setLocationFilter] = React.useState('');
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 100]);
  const [selectedConditions, setSelectedConditions] = React.useState<string[]>([]);
  const [viewMode, setViewMode] = React.useState('grid');

  const maxPrice = Math.max(...categoryProducts.map(p => p.price));

  React.useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  const filteredProducts = categoryProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (locationFilter === '' || product.location.includes(locationFilter)) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
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

  const handleConditionChange = (condition: string) => {
    setSelectedConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" color="inherit" underline="hover">
          Início
        </Link>
        <Link href="/categorias" color="inherit" underline="hover">
          Categorias
        </Link>
        <Typography color="text.primary">{category.name}</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          {category.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {sortedProducts.length} anúncios encontrados
        </Typography>
      </Box>

      {/* Main Layout: Sidebar + Content */}
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
        {/* Left Sidebar - Filters */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Filtros
            </Typography>

            {/* Search */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Buscar
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

            {/* Location */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Localização
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Cidade, Estado"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Price Range */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Faixa de Preço
              </Typography>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={maxPrice}
                valueLabelFormat={(value) => `R$ ${value.toFixed(2)}`}
                sx={{ mb: 1 }}
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

            {/* Condition */}
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

            {/* Clear Filters */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setPriceRange([0, maxPrice]);
                setSelectedConditions([]);
              }}
            >
              Limpar Filtros
            </Button>
          </Paper>
        </Box>

        {/* Right Content Area */}
        <Box>
          {/* Top Bar - Sort and View Options */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Ordenar por:
                </Typography>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="recent">Mais recentes</MenuItem>
                    <MenuItem value="price-low">Menor preço</MenuItem>
                    <MenuItem value="price-high">Maior preço</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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

          {/* Active Filters */}
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

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: viewMode === 'grid' ? 'repeat(2, 1fr)' : '1fr',
                  lg: viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr',
                },
                gap: 3,
              }}
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Box>
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

      {/* Mobile Filters Button */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', bottom: 20, right: 20 }}>
        <Button
          variant="contained"
          startIcon={<FilterList />}
          sx={{ borderRadius: '50px' }}
        >
          Filtros
        </Button>
      </Box>
    </Container>
  );
}
