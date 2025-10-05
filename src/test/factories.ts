/**
 * Test Data Factories
 * 
 * Factories para criar dados de teste consistentes e reutilizáveis.
 * Use o parâmetro `overrides` para customizar campos específicos.
 * 
 * @example
 * const product = createTestProduct({ title: 'Custom Title', price: 999 });
 * const category = createTestCategory({ name: 'Electronics' });
 */

import type { Product, Category, AdDetails } from '../data/products';

/**
 * Cria AdDetails de teste com valores padrão sensatos
 */
export const createTestAdDetails = (overrides?: Partial<AdDetails>): AdDetails => ({
  id: 1,
  title: 'Test Product',
  category: 'test-category',
  ad_type: 'Venda',
  slug: 'test-product',
  description: 'Test description',
  quantity: { value: '1', unit: 'un', frequency: 'Mensal' },
  price: { currency: 'BRL', value: '100.00' },
  classification: { origin: 'Industrial', hazard_status: 'Não perigoso' },
  logistics: { transport_available: false, transport_details: '' },
  equipment: { quantity: '0', name: '' },
  metadata: {
    creation_date: '2024-01-01T00:00:00Z',
    last_access_date: '2024-01-01T00:00:00Z',
    required_documents: false,
  },
  media: { main_image_url: '/test.jpg', gallery_images: ['/test.jpg'] },
  ...overrides,
});

/**
 * Cria um Product de teste completo
 */
export const createTestProduct = (overrides?: Partial<Product>): Product => {
  const defaults: Product = {
    id: 'test-product-1',
    title: 'Test Product',
    description: 'Test product description',
    price: 100,
    location: 'São Paulo, SP',
    images: ['/test.jpg'],
    category: 'test-category',
    seller: {
      name: 'Test Seller',
      rating: 4.5,
      verified: true,
    },
    createdAt: '2024-01-01T00:00:00Z',
    adDetails: createTestAdDetails(),
  };

  // Merge com overrides, tratando adDetails especialmente
  const merged = { ...defaults, ...overrides };
  
  // Se adDetails foi parcialmente overridden, mesclar com defaults
  if (overrides?.adDetails) {
    merged.adDetails = createTestAdDetails(overrides.adDetails);
  }

  return merged;
};

/**
 * Cria múltiplos produtos de teste com IDs e títulos únicos
 */
export const createTestProducts = (count: number, baseOverrides?: Partial<Product>): Product[] => {
  return Array.from({ length: count }, (_, i) =>
    createTestProduct({
      id: `test-product-${i + 1}`,
      title: `Test Product ${i + 1}`,
      ...baseOverrides,
    })
  );
};

/**
 * Cria uma Category de teste
 */
export const createTestCategory = (overrides?: Partial<Category>): Category => ({
  id: 'test-category',
  name: 'Test Category',
  count: 10,
  ...overrides,
});

/**
 * Cria múltiplas categorias de teste
 */
export const createTestCategories = (count: number): Category[] => {
  return Array.from({ length: count }, (_, i) =>
    createTestCategory({
      id: `category-${i + 1}`,
      name: `Category ${i + 1}`,
      count: (i + 1) * 5,
    })
  );
};

/**
 * Factory de produtos com propriedades específicas para casos de uso comuns
 */
export const testProductPresets = {
  /** Produto caro para testes de ordenação por preço */
  expensive: () => createTestProduct({ price: 9999, title: 'Expensive Product' }),
  
  /** Produto barato para testes de ordenação por preço */
  cheap: () => createTestProduct({ price: 1, title: 'Cheap Product' }),
  
  /** Produto recente para testes de ordenação por data */
  recent: () => createTestProduct({
    createdAt: new Date().toISOString(),
    title: 'Recent Product',
  }),
  
  /** Produto antigo para testes de ordenação por data */
  old: () => createTestProduct({
    createdAt: '2020-01-01T00:00:00Z',
    title: 'Old Product',
  }),
  
  /** Produto sem imagens */
  noImages: () => createTestProduct({ images: [], title: 'No Images Product' }),
  
  /** Vendedor verificado */
  verifiedSeller: () => createTestProduct({
    seller: { name: 'Verified Seller', rating: 5.0, verified: true },
  }),
  
  /** Vendedor não verificado */
  unverifiedSeller: () => createTestProduct({
    seller: { name: 'Unverified Seller', rating: 3.5, verified: false },
  }),
};
