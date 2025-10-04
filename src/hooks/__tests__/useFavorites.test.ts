import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFavorites } from '../useFavorites';

describe('useFavorites', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with favorite as false for new product', () => {
    const { result } = renderHook(() => useFavorites({ productId: 'product-1' }));
    
    expect(result.current.isFavorite).toBe(false);
  });

  it('should initialize with favorite as true if product is in localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify(['product-1']));
    
    const { result } = renderHook(() => useFavorites({ productId: 'product-1' }));
    
    expect(result.current.isFavorite).toBe(true);
  });

  it('should toggle favorite to true', () => {
    const { result } = renderHook(() => useFavorites({ productId: 'product-1' }));
    
    act(() => {
      result.current.toggleFavorite();
    });
    
    expect(result.current.isFavorite).toBe(true);
    
    // Check localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(favorites).toContain('product-1');
  });

  it('should toggle favorite to false', () => {
    localStorage.setItem('favorites', JSON.stringify(['product-1']));
    
    const { result } = renderHook(() => useFavorites({ productId: 'product-1' }));
    
    act(() => {
      result.current.toggleFavorite();
    });
    
    expect(result.current.isFavorite).toBe(false);
    
    // Check localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(favorites).not.toContain('product-1');
  });

  it('should handle event parameter in toggleFavorite', () => {
    const { result } = renderHook(() => useFavorites({ productId: 'product-1' }));
    
    const mockEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as React.MouseEvent;
    
    act(() => {
      result.current.toggleFavorite(mockEvent);
    });
    
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(result.current.isFavorite).toBe(true);
  });

  it('should call onToggle callback when provided', () => {
    const onToggle = vi.fn();
    const { result } = renderHook(() => 
      useFavorites({ productId: 'product-1', onToggle })
    );
    
    act(() => {
      result.current.toggleFavorite();
    });
    
    expect(onToggle).toHaveBeenCalledWith('product-1', true);
  });

  it('should not add duplicate favorites', () => {
    localStorage.setItem('favorites', JSON.stringify(['product-1']));
    
    const { result } = renderHook(() => useFavorites({ productId: 'product-1' }));
    
    // Toggle off
    act(() => {
      result.current.toggleFavorite();
    });
    
    // Toggle on again
    act(() => {
      result.current.toggleFavorite();
    });
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(favorites.filter((id: string) => id === 'product-1')).toHaveLength(1);
  });

  it('should handle multiple products in favorites', () => {
    localStorage.setItem('favorites', JSON.stringify(['product-1', 'product-2']));
    
    const { result } = renderHook(() => useFavorites({ productId: 'product-3' }));
    
    act(() => {
      result.current.toggleFavorite();
    });
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(favorites).toEqual(['product-1', 'product-2', 'product-3']);
  });
});
