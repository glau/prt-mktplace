import { alpha, Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

/**
 * Styles comuns reutilizáveis em toda a aplicação
 */

export const createFloatingButtonStyle = (theme: Theme): SxProps<Theme> => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.paper, 1),
  },
});

export const cardHoverStyle: SxProps<Theme> = {
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
};

export const textEllipsisStyles = (lines: number = 2): SxProps<Theme> => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const scrollbarStyles: SxProps<Theme> = {
  '&::-webkit-scrollbar': { height: 6 },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 3,
  },
};

export const responsiveGrid = {
  categories: {
    xs: 'repeat(2, 1fr)',
    sm: 'repeat(3, 1fr)',
    md: 'repeat(4, 1fr)',
    lg: 'repeat(6, 1fr)',
  },
  products: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
  },
  productsList: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
  },
};
