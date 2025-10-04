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
  CircularProgress,
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
import type { Product, Category } from '../../../data/products';
import ImageGallery from '../../../components/ImageGallery';
import { fetchProductById, fetchCategoryById } from '../../../lib/api';
import AppLayout from '../../../components/AppLayout';
import { useFavorites } from '../../../hooks/useFavorites';
import { formatCurrency, formatDate, formatDateTime, formatQuantity } from '../../../utils/formatters';


interface ProductPageClientProps {
  productId: string;
}

export default function ProductPageClient({ productId }: ProductPageClientProps) {
  const [product, setProduct] = React.useState<Product | null>(null);
  const [category, setCategory] = React.useState<Category | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites({ productId });

  React.useEffect(() => {
    let active = true;

    async function loadProduct() {
      setLoading(true);
      setError(null);

      try {
        const productData = await fetchProductById(productId);
        if (!active) return;

        setProduct(productData);

        const categoryData = await fetchCategoryById(productData.category);
        if (!active) return;

        setCategory(categoryData);
      } catch (err) {
        console.error(err);
        if (active) {
          setError('Não foi possível carregar as informações do produto.');
          setProduct(null);
          setCategory(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      active = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <AppLayout>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        </Container>
      </AppLayout>
    );
  }

  if (error || !product || !category) {
    return (
      <AppLayout>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {error ?? 'Produto não encontrado'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tente voltar e selecionar outro produto.
            </Typography>
          </Paper>
        </Container>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
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
          <Typography
            color="text.primary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
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
        {/* Left Column - Images + Combined details */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {(() => {
            const gallery = product.adDetails?.media?.gallery_images;
            const images = Array.isArray(gallery) && gallery.length > 0 ? gallery : product.images;
            return <ImageGallery images={images} title={product.title} showZoom={false} />;
          })()}

          {/* Combined Description + Ad Details */}
          <Paper sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }}>
            {/* Descrição */}
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Descrição</Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                {product.adDetails?.description || product.description}
              </Typography>
            </Box>
            {/* Linha full-bleed */}
            <Divider />

            {/* Detalhes do Anúncio */}
            {product.adDetails && (
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Detalhes do Anúncio</Typography>

                {/* Grupo: Informações */}
                <Typography variant="subtitle1" sx={{ mt: 1, mb: 1.5, fontWeight: 600 }}>Informações</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Categoria</Typography>
                    <Typography variant="body2">{product.adDetails.category}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Tipo de anúncio</Typography>
                    <Typography variant="body2">{product.adDetails.ad_type}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Quantidade</Typography>
                    <Typography variant="body2">
                      {formatQuantity(product.adDetails.quantity)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Preço</Typography>
                    <Typography variant="body2">
                      {formatCurrency(product.adDetails.price.value, product.adDetails.price.currency)}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Grupo: Classificação */}
                <Typography variant="subtitle1" sx={{ mt: 1, mb: 1.5, fontWeight: 600 }}>Classificação</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Origem</Typography>
                    <Typography variant="body2">{product.adDetails.classification.origin}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Periculosidade</Typography>
                    <Typography variant="body2">{product.adDetails.classification.hazard_status}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Grupo: Logística */}
                <Typography variant="subtitle1" sx={{ mt: 1, mb: 1.5, fontWeight: 600 }}>Logística</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Transporte</Typography>
                    <Typography variant="body2">
                      {product.adDetails.logistics.transport_available ? 'Disponível' : 'Não disponível'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Detalhes do transporte</Typography>
                    <Typography variant="body2">{product.adDetails.logistics.transport_details}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Equipamentos</Typography>
                    <Typography variant="body2">
                      {product.adDetails.equipment.quantity} × {product.adDetails.equipment.name}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Grupo: Documentos & Datas */}
                <Typography variant="subtitle1" sx={{ mt: 1, mb: 1.5, fontWeight: 600 }}>Documentos & Datas</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Documentos obrigatórios</Typography>
                    <Typography variant="body2">{product.adDetails.metadata.required_documents ? 'Sim' : 'Não'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Criado em</Typography>
                    <Typography variant="body2">{formatDateTime(product.adDetails.metadata.creation_date)}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Último acesso</Typography>
                    <Typography variant="body2">{formatDateTime(product.adDetails.metadata.last_access_date)}</Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
        </Box>

        {/* Right Column - Product Info */}
        <Box>
          <Box sx={{ position: { xs: 'static', md: 'sticky' }, top: { md: 20 }, display: 'flex', flexDirection: 'column', gap: 2, alignSelf: 'start', height: 'fit-content' }}>
            {/* Title and quick actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700, flex: 1, mr: 2, lineHeight: 1.2 }}>
                {product.title}
              </Typography>
              <Box>
                <IconButton aria-label="Favoritar" onClick={toggleFavorite}>
                  {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
                <IconButton aria-label="Compartilhar">
                  <Share />
                </IconButton>
              </Box>
            </Box>

            {/* Price & actions card */}
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: (t) => t.shadows[3] }}>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 800, mb: 1 }}>
                {product.adDetails?.price
                  ? formatCurrency(product.adDetails.price.value, product.adDetails.price.currency)
                  : formatCurrency(product.price)}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {product.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Schedule sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  Publicado em {formatDate(product.createdAt)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 1,
                }}
              >
                <Button fullWidth variant="contained" startIcon={<Phone />}>
                  Ligar
                </Button>
                <Button fullWidth variant="outlined" startIcon={<Message />}>Mensagem</Button>
              </Box>
            </Paper>

            {/* Seller Info */}
            <Paper sx={{ p: 3 }}>
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
            </Paper>

            {/* Category chip removed as requested */}
          </Box>
        </Box>
      </Box>

      {/* Combined block moved inside left column to keep same width as gallery */}
      </Container>
    </AppLayout>
  );
}
