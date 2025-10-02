'use client';
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Paper,
  Button,
  Chip,
  Avatar,
  Rating,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Share,
  Favorite,
  FavoriteBorder,
  LocationOn,
  Verified,
  Phone,
  Message,
  Schedule,
} from '@mui/icons-material';
import { Product } from '../../../data/products';
import SimpleImageGallery from '../../../components/SimpleImageGallery';

interface ProductPageClientProps {
  product: Product;
  category: {
    id: string;
    name: string;
    count: number;
  };
}

export default function ProductPageClient({ product, category }: ProductPageClientProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" color="inherit" underline="hover">
          Início
        </Link>
        <Link href="/categorias" color="inherit" underline="hover">
          Categorias
        </Link>
        <Link href={`/categoria/${category.id}`} color="inherit" underline="hover">
          {category.name}
        </Link>
        <Typography color="text.primary" sx={{ 
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.title}
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '7fr 5fr',
          },
          gap: 4,
        }}
      >
        {/* Left Column - Images */}
        <Box>
          <SimpleImageGallery images={product.images} title={product.title} />
        </Box>

        {/* Right Column - Product Info */}
        <Box>
          <Box sx={{ position: 'sticky', top: 20 }}>
            {/* Title and Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600, flex: 1, mr: 2 }}>
                {product.title}
              </Typography>
              <Box>
                <IconButton onClick={handleFavoriteClick}>
                  {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
                <IconButton>
                  <Share />
                </IconButton>
              </Box>
            </Box>

            {/* Price */}
            <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 2 }}>
              R$ {product.price.toFixed(2).replace('.', ',')}
            </Typography>

            {/* Location and Date */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {product.location}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Schedule sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                Publicado em {formatDate(product.createdAt)}
              </Typography>
            </Box>

            {/* Seller Info */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Vendedor</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  {product.seller.name.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1 }}>
                      {product.seller.name}
                    </Typography>
                    {product.seller.verified && (
                      <Verified sx={{ fontSize: 18, color: 'primary.main' }} />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating
                      value={product.seller.rating}
                      precision={0.1}
                      size="small"
                      readOnly
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      ({product.seller.rating})
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 1,
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Phone />}
                  sx={{ mb: 1 }}
                >
                  Ligar
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Message />}
                  sx={{ mb: 1 }}
                >
                  Mensagem
                </Button>
              </Box>
            </Paper>

            {/* Category */}
            <Box sx={{ mb: 3 }}>
              <Chip
                label={category.name}
                color="primary"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Description and Specifications */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '7fr 5fr',
          },
          gap: 4,
          mt: 2,
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Descrição</Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            {product.description}
          </Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Especificações</Typography>
          {Object.entries(product.specifications).map(([key, value], index) => (
            <Box key={key}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {key}:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {value}
                </Typography>
              </Box>
              {index < Object.entries(product.specifications).length - 1 && (
                <Divider />
              )}
            </Box>
          ))}
        </Paper>
      </Box>
    </Container>
  );
}
