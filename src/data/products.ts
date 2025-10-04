export interface AdDetails {
  id: number;
  title: string;
  category: string;
  ad_type: string;
  slug: string;
  description: string;
  quantity: {
    value: string;
    unit: string;
    frequency: string;
  };
  price: {
    currency: string;
    value: string;
  };
  classification: {
    origin: string;
    hazard_status: string;
  };
  logistics: {
    transport_available: boolean;
    transport_details: string;
  };
  equipment: {
    quantity: string;
    name: string;
  };
  metadata: {
    creation_date: string;
    last_access_date: string;
    required_documents: boolean;
  };
  media: {
    main_image_url: string;
    gallery_images: string[];
    og_image_url?: string;
  };
}

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
  createdAt: string;
  adDetails: AdDetails;
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
    createdAt: '2024-01-15',
    adDetails: {
      id: 1,
      title: 'Placas de Borracha Industrial',
      category: 'borracha',
      ad_type: 'Venda',
      slug: 'placas-borracha-industrial',
      description:
        'Lotes de placas de borracha industrial para aplicações de vedação, isolamento acústico e amortecimento de vibrações em ambientes industriais.',
      quantity: {
        value: '250',
        unit: 'placas',
        frequency: 'Único lote',
      },
      price: {
        currency: 'BRL',
        value: '45.50',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Entrega negociada para regiões Sudeste e Sul com frete a combinar.',
      },
      equipment: {
        quantity: '3',
        name: 'Paletes industriais de madeira',
      },
      metadata: {
        creation_date: '2024-01-15T09:00:00Z',
        last_access_date: '2024-02-05T14:30:00Z',
        required_documents: true,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
      },
    },
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
    createdAt: '2024-01-14',
    adDetails: {
      id: 2,
      title: 'Pneus Usados - Aro 15',
      category: 'borracha',
      ad_type: 'Venda',
      slug: 'pneus-usados-aro-15',
      description:
        'Conjunto de pneus usados aro 15 em boas condições para recauchutagem ou reaproveitamento em projetos automotivos e industriais.',
      quantity: {
        value: '4',
        unit: 'pneus',
        frequency: 'Único lote',
      },
      price: {
        currency: 'BRL',
        value: '25.00',
      },
      classification: {
        origin: 'Pós-consumo',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: false,
        transport_details: 'Retirada no local com agendamento prévio.',
      },
      equipment: {
        quantity: '1',
        name: 'Carrinho hidráulico para movimentação',
      },
      metadata: {
        creation_date: '2024-01-14T11:15:00Z',
        last_access_date: '2024-02-03T09:45:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
      },
    },
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
    createdAt: '2024-01-13',
    adDetails: {
      id: 3,
      title: 'Garrafas PET - 500ml',
      category: 'plastico',
      ad_type: 'Venda',
      slug: 'garrafas-pet-500ml',
      description:
        'Garrafas PET prensadas e higienizadas prontas para reciclagem em processos de extrusão ou fabricação de fibras têxteis.',
      quantity: {
        value: '1000',
        unit: 'garrafas',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '0.15',
      },
      classification: {
        origin: 'Pós-consumo',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Transporte terceirizado disponível mediante contrato mínimo de 500 kg.',
      },
      equipment: {
        quantity: '5',
        name: 'Big bags de 200 litros',
      },
      metadata: {
        creation_date: '2024-01-13T08:45:00Z',
        last_access_date: '2024-02-04T12:10:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1572879435493-37c9703180c6?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1572879435493-37c9703180c6?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1572879435493-37c9703180c6?auto=format&fit=crop&w=1200&q=80',
      },
    },
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
    createdAt: '2024-01-12',
    adDetails: {
      id: 4,
      title: 'Sucata de Alumínio',
      category: 'metais',
      ad_type: 'Compra',
      slug: 'sucata-aluminio',
      description:
        'Sucata de alumínio limpa e separada por liga, ideal para fundições e indústrias de reciclagem metálica.',
      quantity: {
        value: '50',
        unit: 'toneladas',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '4.20',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Coleta com caminhões basculantes mediante agendamento semanal.',
      },
      equipment: {
        quantity: '2',
        name: 'Caçambas estacionárias de 30 m³',
      },
      metadata: {
        creation_date: '2024-01-12T10:20:00Z',
        last_access_date: '2024-02-02T16:50:00Z',
        required_documents: true,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
      },
    },
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
    createdAt: '2024-01-11',
    adDetails: {
      id: 5,
      title: 'Mangueiras de Borracha Flexível',
      category: 'borracha',
      ad_type: 'Venda',
      slug: 'mangueiras-borracha-flexivel',
      description:
        'Mangueiras flexíveis resistentes a altas pressões para linhas industriais, sistemas hidráulicos e transporte de fluidos.',
      quantity: {
        value: '150',
        unit: 'rolos',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '12.80',
      },
      classification: {
        origin: 'Produção',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Envio via transportadora parceira para todo o Brasil.',
      },
      equipment: {
        quantity: '10',
        name: 'Bobinas industriais de armazenamento',
      },
      metadata: {
        creation_date: '2024-01-11T13:40:00Z',
        last_access_date: '2024-02-01T18:25:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
      },
    },
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
    createdAt: '2024-01-10',
    adDetails: {
      id: 6,
      title: 'Tapetes de Borracha Antiderrapante',
      category: 'borracha',
      ad_type: 'Venda',
      slug: 'tapetes-borracha-antiderrapante',
      description:
        'Tapetes de borracha com superfície antiderrapante ideais para áreas industriais, rampas e acessos com grande circulação.',
      quantity: {
        value: '300',
        unit: 'tapetes',
        frequency: 'Bimestral',
      },
      price: {
        currency: 'BRL',
        value: '35.00',
      },
      classification: {
        origin: 'Produção',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Frete grátis para regiões Norte e Nordeste em pedidos acima de 100 unidades.',
      },
      equipment: {
        quantity: '4',
        name: 'Carrinhos industriais com base de borracha',
      },
      metadata: {
        creation_date: '2024-01-10T15:05:00Z',
        last_access_date: '2024-02-06T10:15:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
];
