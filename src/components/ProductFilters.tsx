'use client';
import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Button,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Search, LocationOn } from '@mui/icons-material';

export interface FilterState {
  searchTerm: string;
  locationFilter: string;
  priceRange: [number, number];
  selectedConditions: string[];
}

interface ProductFiltersProps {
  filters: FilterState;
  priceBounds: [number, number];
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
}

const CONDITIONS = ['Novo', 'Usado - Excelente', 'Usado - Bom', 'Usado - Regular'];

export default function ProductFilters({
  filters,
  priceBounds,
  onFiltersChange,
  onClearFilters,
}: ProductFiltersProps) {
  const handleConditionChange = (condition: string) => {
    const newConditions = filters.selectedConditions.includes(condition)
      ? filters.selectedConditions.filter((item) => item !== condition)
      : [...filters.selectedConditions, condition];
    
    onFiltersChange({ selectedConditions: newConditions });
  };

  return (
    <>
      {/* Busca */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          Buscar
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Buscar produtos..."
          value={filters.searchTerm}
          onChange={(event) => onFiltersChange({ searchTerm: event.target.value })}
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

      {/* Localização */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          Localização
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Cidade, Estado"
          value={filters.locationFilter}
          onChange={(event) => onFiltersChange({ locationFilter: event.target.value })}
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

      {/* Faixa de Preço */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Faixa de Preço
        </Typography>
        <Slider
          value={filters.priceRange}
          onChange={(_, newValue) => onFiltersChange({ priceRange: newValue as [number, number] })}
          valueLabelDisplay="auto"
          min={priceBounds[0]}
          max={priceBounds[1] || 0}
          valueLabelFormat={(value) => `R$ ${value.toFixed(2)}`}
          sx={{ mb: 1 }}
          disabled={priceBounds[1] === 0}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">
            R$ {filters.priceRange[0].toFixed(2)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            R$ {filters.priceRange[1].toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Estado */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          Estado
        </Typography>
        <FormGroup>
          {CONDITIONS.map((condition) => (
            <FormControlLabel
              key={condition}
              control={
                <Checkbox
                  size="small"
                  checked={filters.selectedConditions.includes(condition)}
                  onChange={() => handleConditionChange(condition)}
                />
              }
              label={<Typography variant="body2">{condition}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Botão Limpar */}
      <Button
        fullWidth
        variant="outlined"
        onClick={onClearFilters}
      >
        Limpar Filtros
      </Button>
    </>
  );
}
