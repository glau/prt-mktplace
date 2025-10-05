import React from 'react';
import { describe, it, expect, screen, render, fireEvent } from '@/test';
import ProductFilters, { type FilterState } from '../ProductFilters';

describe('ProductFilters', () => {
  const priceBounds: [number, number] = [0, 1000];
  const baseFilters: FilterState = {
    searchTerm: '',
    locationFilter: '',
    priceRange: [100, 900],
    selectedConditions: [],
  };

  it('renders fields and calls onFiltersChange on typing', () => {
    const onFiltersChange = vi.fn();

    render(
      <ProductFilters
        filters={baseFilters}
        priceBounds={priceBounds}
        onFiltersChange={onFiltersChange}
        onClearFilters={() => {}}
      />
    );

    const search = screen.getByPlaceholderText('Buscar produtos...');
    fireEvent.change(search, { target: { value: 'borracha' } });

    expect(onFiltersChange).toHaveBeenCalledWith({ searchTerm: 'borracha' });

    const location = screen.getByPlaceholderText('Cidade, Estado');
    fireEvent.change(location, { target: { value: 'São Paulo' } });

    expect(onFiltersChange).toHaveBeenCalledWith({ locationFilter: 'São Paulo' });
  });

  it('toggles condition checkboxes and calls onFiltersChange', () => {
    const onFiltersChange = vi.fn();

    render(
      <ProductFilters
        filters={{ ...baseFilters, selectedConditions: [] }}
        priceBounds={priceBounds}
        onFiltersChange={onFiltersChange}
        onClearFilters={() => {}}
      />
    );

    const novo = screen.getByText('Novo');
    fireEvent.click(novo);

    expect(onFiltersChange).toHaveBeenCalledWith({ selectedConditions: ['Novo'] });
  });

  it('calls onClearFilters when clicking the clear button', () => {
    const onClearFilters = vi.fn();

    render(
      <ProductFilters
        filters={baseFilters}
        priceBounds={priceBounds}
        onFiltersChange={() => {}}
        onClearFilters={onClearFilters}
      />
    );

    const clear = screen.getByText('Limpar Filtros');
    fireEvent.click(clear);

    expect(onClearFilters).toHaveBeenCalled();
  });
});
