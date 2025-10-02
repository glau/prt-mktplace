export interface Product {
  id: string;
  title: string;
  price: number;
  location: string;
  category: string;
  description: string;
  images: string[];
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
  specifications: Record<string, string>;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export const categories: Category[] = [
  { id: 'vidro', name: 'Vidro', count: 18 },
  { id: 'borracha', name: 'Borracha', count: 22 },
  { id: 'organico', name: 'Orgânico', count: 15 },
  { id: 'reee', name: 'REEE', count: 12 },
  { id: 'quimicos', name: 'Químicos', count: 9 },
  { id: 'papel', name: 'Papel', count: 21 },
  { id: 'madeira', name: 'Madeira', count: 14 },
  { id: 'tecido', name: 'Tecido', count: 11 },
  { id: 'plastico', name: 'Plástico', count: 33 },
  { id: 'metais', name: 'Metais', count: 26 },
  { id: 'rcc', name: 'RCC', count: 10 },
  { id: 'sucata', name: 'Sucata', count: 17 },
];

export const products: Product[] = [
  {
    id: '1',
    title: 'Placas de Borracha Industrial',
    price: 45.50,
    location: 'São Paulo, SP',
    category: 'borracha',
    description: 'Placas de borracha industrial de alta qualidade, ideais para vedação e isolamento. Material resistente e durável.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Indústria Silva',
      rating: 4.8,
      verified: true,
    },
    specifications: {
      'Espessura': '10mm',
      'Dimensões': '1m x 1m',
      'Material': 'Borracha Natural',
      'Cor': 'Preta',
      'Peso': '8kg',
    },
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Pneus Usados - Aro 15',
    price: 25.00,
    location: 'Rio de Janeiro, RJ',
    category: 'borracha',
    description: 'Pneus usados em bom estado, ideais para recauchutagem ou reciclagem.',
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Auto Peças Central',
      rating: 4.5,
      verified: true,
    },
    specifications: {
      'Aro': '15',
      'Largura': '195/65',
      'Estado': 'Usado - Bom',
      'Quantidade': '4 unidades',
    },
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    title: 'Garrafas PET - 500ml',
    price: 0.15,
    location: 'Belo Horizonte, MG',
    category: 'plastico',
    description: 'Garrafas PET transparentes, limpas e prensadas. Ideal para reciclagem.',
    images: [
      'https://images.unsplash.com/photo-1572879435493-37c9703180c6?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'EcoRecicla BH',
      rating: 4.9,
      verified: true,
    },
    specifications: {
      'Volume': '500ml',
      'Cor': 'Transparente',
      'Estado': 'Limpo e prensado',
      'Quantidade': '1000 unidades',
    },
    createdAt: '2024-01-13',
  },
  {
    id: '4',
    title: 'Sucata de Alumínio',
    price: 4.20,
    location: 'Porto Alegre, RS',
    category: 'metais',
    description: 'Sucata de alumínio limpa, separada e pronta para fundição.',
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Metais do Sul',
      rating: 4.7,
      verified: false,
    },
    specifications: {
      'Material': 'Alumínio',
      'Pureza': '95%',
      'Peso': '50kg',
      'Estado': 'Limpo e separado',
    },
    createdAt: '2024-01-12',
  },
  {
    id: '5',
    title: 'Mangueiras de Borracha Flexível',
    price: 12.80,
    location: 'Curitiba, PR',
    category: 'borracha',
    description: 'Mangueiras de borracha flexível para uso industrial. Diversas medidas disponíveis.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Borrachas Paraná',
      rating: 4.6,
      verified: true,
    },
    specifications: {
      'Diâmetro': '25mm',
      'Comprimento': '10m',
      'Pressão máxima': '10 bar',
      'Material': 'Borracha sintética',
    },
    createdAt: '2024-01-11',
  },
  {
    id: '6',
    title: 'Tapetes de Borracha Antiderrapante',
    price: 35.00,
    location: 'Salvador, BA',
    category: 'borracha',
    description: 'Tapetes de borracha antiderrapante, ideais para áreas industriais e comerciais.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Segurança Industrial BA',
      rating: 4.4,
      verified: true,
    },
    specifications: {
      'Dimensões': '1,5m x 1m',
      'Espessura': '15mm',
      'Tipo': 'Antiderrapante',
      'Cor': 'Preta com relevo',
    },
    createdAt: '2024-01-10',
  },
];
