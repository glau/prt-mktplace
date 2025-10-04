'use client';
import React from 'react';

interface UseFavoritesOptions {
  productId: string;
  onToggle?: (productId: string, isFavorite: boolean) => void;
}

export function useFavorites({ productId, onToggle }: UseFavoritesOptions) {
  const [isFavorite, setIsFavorite] = React.useState(false);

  // TODO: Integrar com localStorage ou API para persistir favoritos
  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(productId));
  }, [productId]);

  const handleToggleFavorite = React.useCallback((event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    setIsFavorite((prev) => {
      const newValue = !prev;
      
      // Atualizar localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (newValue) {
        if (!favorites.includes(productId)) {
          favorites.push(productId);
        }
      } else {
        const index = favorites.indexOf(productId);
        if (index > -1) {
          favorites.splice(index, 1);
        }
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
      
      // Callback opcional
      onToggle?.(productId, newValue);
      
      return newValue;
    });
  }, [productId, onToggle]);

  return {
    isFavorite,
    toggleFavorite: handleToggleFavorite,
  };
}
