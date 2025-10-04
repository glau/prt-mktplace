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
    createdAt: '2024-01-15T09:00:00Z', // Ajustado para ISO 8601
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
    createdAt: '2024-01-14T11:15:00Z',
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
    createdAt: '2024-01-13T08:45:00Z',
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
    createdAt: '2024-01-12T10:20:00Z',
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
    createdAt: '2024-01-11T13:40:00Z',
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
    createdAt: '2024-01-10T15:05:00Z',
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
  // NOVAS ENTRADAS (10)
  {
    id: '7',
    title: 'Vidro Plano Quebrado (Cacos)',
    price: 0.10,
    location: 'Campinas, SP',
    category: 'vidro',
    description: 'Vidro plano, cacos limpos, isentos de contaminação orgânica. Ideal para reciclagem em fornos.',
    images: [
      'https://images.unsplash.com/photo-1616781745260-264d852a32c2?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Vidraçaria Ágil',
      rating: 4.2,
      verified: true,
    },
    createdAt: '2024-02-01T10:00:00Z',
    adDetails: {
      id: 7,
      title: 'Vidro Plano Quebrado (Cacos)',
      category: 'vidro',
      ad_type: 'Venda',
      slug: 'vidro-plano-quebrado-cacos',
      description:
        'Grande volume mensal de cacos de vidro transparente e sem adesivos. Disponível para compradores com logística própria.',
      quantity: {
        value: '10',
        unit: 'toneladas',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '0.10',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: false,
        transport_details: 'Necessário retirar no pátio da empresa.',
      },
      equipment: {
        quantity: '20',
        name: 'Tambores plásticos de 100 litros',
      },
      metadata: {
        creation_date: '2024-02-01T10:00:00Z',
        last_access_date: '2024-02-28T11:00:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1616781745260-264d852a32c2?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1616781745260-264d852a32c2?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1616781745260-264d852a32c2?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '8',
    title: 'Composto Orgânico para Compostagem',
    price: 0.05,
    location: 'Florianópolis, SC',
    category: 'organico',
    description: 'Restos de alimentos e poda, triturados e pré-separados. Ótimo para adubo.',
    images: [
      'https://images.unsplash.com/photo-1543884399-fa202167d3e2?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Fazenda Verde',
      rating: 5.0,
      verified: true,
    },
    createdAt: '2024-01-25T07:30:00Z',
    adDetails: {
      id: 8,
      title: 'Composto Orgânico para Compostagem',
      category: 'organico',
      ad_type: 'Venda',
      slug: 'composto-organico-adubo',
      description:
        'Composto orgânico rico em nutrientes, resultante de resíduos agrícolas e urbanos, estabilizado para uso imediato como fertilizante orgânico.',
      quantity: {
        value: '5',
        unit: 'toneladas',
        frequency: 'Semanal',
      },
      price: {
        currency: 'BRL',
        value: '0.05',
      },
      classification: {
        origin: 'Pós-consumo',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Entrega local (raio de 100km) com caminhão basculante.',
      },
      equipment: {
        quantity: '0',
        name: 'N/I',
      },
      metadata: {
        creation_date: '2024-01-25T07:30:00Z',
        last_access_date: '2024-02-27T15:00:00Z',
        required_documents: true,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1543884399-fa202167d3e2?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1543884399-fa202167d3e2?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1543884399-fa202167d3e2?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '9',
    title: 'Placas de Circuito Impresso (PCI) Sucata',
    price: 15.00,
    location: 'Manaus, AM',
    category: 'reee',
    description: 'Lotes de placas eletrônicas mistas. Materiais R.E.E.E., contêm metais preciosos.',
    images: [
      'https://images.unsplash.com/photo-1594954714397-c255263d9159?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Tech Recicla Norte',
      rating: 4.1,
      verified: false,
    },
    createdAt: '2024-02-05T12:00:00Z',
    adDetails: {
      id: 9,
      title: 'Placas de Circuito Impresso (PCI) Sucata',
      category: 'reee',
      ad_type: 'Compra',
      slug: 'placas-circuito-impresso-sucata',
      description:
        'Procuramos sucata de PCI (Placas de Circuito Impresso) de equipamentos eletrônicos diversos (PCs, celulares, servidores) para extração de metais.',
      quantity: {
        value: '2',
        unit: 'toneladas',
        frequency: 'Bimestral',
      },
      price: {
        currency: 'BRL',
        value: '15.00',
      },
      classification: {
        origin: 'Pós-consumo/Industrial',
        hazard_status: 'Perigoso',
      },
      logistics: {
        transport_available: false,
        transport_details: 'A empresa compradora deve providenciar o transporte especializado para resíduos perigosos.',
      },
      equipment: {
        quantity: '50',
        name: 'Caixas de papelão reforçado',
      },
      metadata: {
        creation_date: '2024-02-05T12:00:00Z',
        last_access_date: '2024-02-28T14:40:00Z',
        required_documents: true,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1594954714397-c255263d9159?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1594954714397-c255263d9159?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1594954714397-c255263d9159?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '10',
    title: 'Tambores Metálicos Vazios',
    price: 30.00,
    location: 'Recife, PE',
    category: 'metais',
    description: 'Tambores de aço de 200 litros, limpos e sem resíduos químicos. Reutilizáveis.',
    images: [
      'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Logística Nordeste',
      rating: 4.3,
      verified: true,
    },
    createdAt: '2024-01-20T16:00:00Z',
    adDetails: {
      id: 10,
      title: 'Tambores Metálicos Vazios',
      category: 'metais',
      ad_type: 'Venda',
      slug: 'tambores-metalicos-vazios',
      description:
        'Tambores de aço carbono de 200L, utilizados uma única vez para transporte de óleos vegetais. Limpos e inspecionados para reutilização.',
      quantity: {
        value: '500',
        unit: 'unidades',
        frequency: 'Único lote',
      },
      price: {
        currency: 'BRL',
        value: '30.00',
      },
      classification: {
        origin: 'Pós-uso industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Podemos cotar frete para pedidos acima de 100 unidades.',
      },
      equipment: {
        quantity: '2',
        name: 'Empilhadeiras para carregamento',
      },
      metadata: {
        creation_date: '2024-01-20T16:00:00Z',
        last_access_date: '2024-02-26T08:00:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '11',
    title: 'Aparas de Papelão Ondulado (Prensa)',
    price: 0.80,
    location: 'São José dos Campos, SP',
    category: 'papel',
    description: 'Fardos de papelão misto prensado. Retirada semanal.',
    images: [
      'https://images.unsplash.com/photo-1587640621415-467000e3034f?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Comércio Papel SP',
      rating: 4.8,
      verified: true,
    },
    createdAt: '2024-02-03T09:30:00Z',
    adDetails: {
      id: 11,
      title: 'Aparas de Papelão Ondulado (Prensa)',
      category: 'papel',
      ad_type: 'Venda',
      slug: 'aparas-papelao-prensado',
      description:
        'Papelão ondulado (caixas marrons) prensado em fardos de aproximadamente 500 kg. Qualidade A, sem contaminação por plástico.',
      quantity: {
        value: '20',
        unit: 'toneladas',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '0.80',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: false,
        transport_details: 'Retirada exclusiva em nosso galpão em São José dos Campos.',
      },
      equipment: {
        quantity: '1',
        name: 'Prensa enfardadeira industrial',
      },
      metadata: {
        creation_date: '2024-02-03T09:30:00Z',
        last_access_date: '2024-02-29T17:00:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1587640621415-467000e3034f?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1587640621415-467000e3034f?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1587640621415-467000e3034f?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '12',
    title: 'Óleo Solúvel Usado (Classe I)',
    price: 3.50,
    location: 'Canoas, RS',
    category: 'quimicos',
    description: 'Óleo solúvel contaminado para descarte ou coprocessamento. Exige MTR.',
    images: [
      'https://images.unsplash.com/photo-1629731671060-692780775d1d?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Metalúrgica Sul',
      rating: 4.0,
      verified: true,
    },
    createdAt: '2024-01-28T14:10:00Z',
    adDetails: {
      id: 12,
      title: 'Óleo Solúvel Usado (Classe I)',
      category: 'quimicos',
      ad_type: 'Venda',
      slug: 'oleo-soluvel-usado-classe-i',
      description:
        'Lote de óleo solúvel usado em processos de usinagem e corte. Requer destinação final adequada para resíduos Classe I (Perigosos).',
      quantity: {
        value: '1000',
        unit: 'litros',
        frequency: 'Bimestral',
      },
      price: {
        currency: 'BRL',
        value: '3.50',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Perigoso',
      },
      logistics: {
        transport_available: false,
        transport_details: 'Transporte deve ser realizado por empresa licenciada e com MTR (Manifesto de Transporte de Resíduos).',
      },
      equipment: {
        quantity: '5',
        name: 'Tambores metálicos de 200 litros (lacrados)',
      },
      metadata: {
        creation_date: '2024-01-28T14:10:00Z',
        last_access_date: '2024-02-25T11:45:00Z',
        required_documents: true,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1629731671060-692780775d1d?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1629731671060-692780775d1d?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1629731671060-692780775d1d?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '13',
    title: 'Raspas de Borracha Micronizada (Mesh 30)',
    price: 1.20,
    location: 'Guarulhos, SP',
    category: 'borracha',
    description: 'Pó de borracha fino, ideal para asfaltos, pisos e compostos de vulcanização.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Recicla Pneus Fast',
      rating: 4.9,
      verified: true,
    },
    createdAt: '2024-02-10T08:00:00Z',
    adDetails: {
      id: 13,
      title: 'Raspas de Borracha Micronizada (Mesh 30)',
      category: 'borracha',
      ad_type: 'Venda',
      slug: 'raspas-borracha-micronizada',
      description:
        'Borracha de pneu (SBR/NR) micronizada em malha 30 (30 mesh), isenta de materiais ferrosos e têxteis. Alta pureza e qualidade.',
      quantity: {
        value: '5',
        unit: 'toneladas',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '1.20',
      },
      classification: {
        origin: 'Pós-consumo (Pneus)',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Envio em big bags ou sacos de 25kg, frete a combinar.',
      },
      equipment: {
        quantity: '50',
        name: 'Big bags de 1 Tonelada',
      },
      metadata: {
        creation_date: '2024-02-10T08:00:00Z',
        last_access_date: '2024-02-28T16:00:00Z',
        required_documents: true,
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
    id: '14',
    title: 'Cavacos de Madeira Limpa (Pinus)',
    price: 0.18,
    location: 'Vitória, ES',
    category: 'madeira',
    description: 'Cavacos de madeira pinus limpa, sem tratamento químico. Perfeito para biomassa ou painéis.',
    images: [
      'https://images.unsplash.com/photo-1508215682855-ac7162590212?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Madeiras Capixaba',
      rating: 4.6,
      verified: true,
    },
    createdAt: '2024-01-30T11:00:00Z',
    adDetails: {
      id: 14,
      title: 'Cavacos de Madeira Limpa (Pinus)',
      category: 'madeira',
      ad_type: 'Venda',
      slug: 'cavacos-madeira-pinus-biomassa',
      description:
        'Cavacos uniformes de Pinus, teor de umidade abaixo de 15%. Ideal para caldeiras de biomassa industrial.',
      quantity: {
        value: '100',
        unit: 'toneladas',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '0.18',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Carregamento em caminhões graneleiros no local.',
      },
      equipment: {
        quantity: '1',
        name: 'Balança rodoviária certificada',
      },
      metadata: {
        creation_date: '2024-01-30T11:00:00Z',
        last_access_date: '2024-02-28T10:00:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1508215682855-ac7162590212?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1508215682855-ac7162590212?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1508215682855-ac7162590212?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '15',
    title: 'Sobra de Tecido Malha (Algodão)',
    price: 1.50,
    location: 'Fortaleza, CE',
    category: 'tecido',
    description: 'Retalhos de malha 100% algodão, cores sortidas. Ótimo para preenchimento ou artesanato.',
    images: [
      'https://images.unsplash.com/photo-1582200216172-88891f737527?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Confecções Sol',
      rating: 4.7,
      verified: true,
    },
    createdAt: '2024-02-08T14:00:00Z',
    adDetails: {
      id: 15,
      title: 'Sobra de Tecido Malha (Algodão)',
      category: 'tecido',
      ad_type: 'Venda',
      slug: 'sobra-tecido-malha-algodao',
      description:
        'Aparas e retalhos de malha de algodão pós-corte, limpas e acondicionadas em sacos de ráfia. Ideal para estofados ou reciclagem têxtil.',
      quantity: {
        value: '500',
        unit: 'Kg',
        frequency: 'Semanal',
      },
      price: {
        currency: 'BRL',
        value: '1.50',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Frete por conta do comprador, mas auxiliamos na organização do embarque.',
      },
      equipment: {
        quantity: '20',
        name: 'Sacos de ráfia de 25kg',
      },
      metadata: {
        creation_date: '2024-02-08T14:00:00Z',
        last_access_date: '2024-02-28T15:30:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1582200216172-88891f737527?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1582200216172-88891f737527?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1582200216172-88891f737527?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '16',
    title: 'Filme Stretch (PEBD) Sucata',
    price: 3.20,
    location: 'Goiânia, GO',
    category: 'plastico',
    description: 'Filme stretch pós-industrial, limpo e enfardado, 99% PEBD.',
    images: [
      'https://images.unsplash.com/photo-1517451299902-601e370a2f4d?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Plásticos Goiás',
      rating: 4.5,
      verified: true,
    },
    createdAt: '2024-01-22T10:45:00Z',
    adDetails: {
      id: 16,
      title: 'Filme Stretch (PEBD) Sucata',
      category: 'plastico',
      ad_type: 'Venda',
      slug: 'filme-stretch-pebd-sucata',
      description:
        'Filme stretch virgem de paletização, retirado de grandes centros de distribuição. Ideal para granulação e produção de novos filmes.',
      quantity: {
        value: '15',
        unit: 'toneladas',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '3.20',
      },
      classification: {
        origin: 'Pós-consumo/Industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Carregamento em fardos. Logística própria para raios de até 300km.',
      },
      equipment: {
        quantity: '1',
        name: 'Empilhadeira',
      },
      metadata: {
        creation_date: '2024-01-22T10:45:00Z',
        last_access_date: '2024-02-27T13:00:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1517451299902-601e370a2f4d?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1517451299902-601e370a2f4d?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1517451299902-601e370a2f4d?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '17',
    title: 'Resíduos de Construção Civil (RCC)',
    price: 5.00,
    location: 'Brasília, DF',
    category: 'rcc',
    description: 'Grande volume de entulho de obra (concreto e alvenaria). Usado para aterro ou britagem.',
    images: [
      'https://images.unsplash.com/photo-1582200216172-88891f737527?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Construtora Forte',
      rating: 3.9,
      verified: true,
    },
    createdAt: '2024-02-15T15:00:00Z',
    adDetails: {
      id: 17,
      title: 'Resíduos de Construção Civil (RCC)',
      category: 'rcc',
      ad_type: 'Doação',
      slug: 'residuos-construcao-civil-doacao',
      description:
        'Volume grande e constante de concreto, tijolo e argamassa. Disponível para doação, desde que o receptor faça a coleta e o transporte.',
      quantity: {
        value: '100',
        unit: 'm³',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '0.00', // Preço zero para doação
      },
      classification: {
        origin: 'Construção',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: false,
        transport_details: 'O transporte é responsabilidade do receptor.',
      },
      equipment: {
        quantity: '1',
        name: 'Retroescavadeira para carregamento',
      },
      metadata: {
        creation_date: '2024-02-15T15:00:00Z',
        last_access_date: '2024-02-28T18:00:00Z',
        required_documents: true,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1582200216172-88891f737527?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1582200216172-88891f737527?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1582200216172-88891f737527?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '18',
    title: 'Sucata Mista Ferrosa (Cavacos)',
    price: 1.10,
    location: 'Salvador, BA',
    category: 'metais',
    description: 'Cavacos de ferro e aço mistos, gerados por tornearia.',
    images: [
      'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Usinagem Bahia',
      rating: 4.5,
      verified: true,
    },
    createdAt: '2024-02-09T09:00:00Z',
    adDetails: {
      id: 18,
      title: 'Sucata Mista Ferrosa (Cavacos)',
      category: 'metais',
      ad_type: 'Venda',
      slug: 'sucata-mista-ferrosa-cavacos',
      description:
        'Cavacos de ferro e aço mistos, com pequeno teor de óleo (negociável). Gerados semanalmente em alto volume.',
      quantity: {
        value: '8',
        unit: 'toneladas',
        frequency: 'Semanal',
      },
      price: {
        currency: 'BRL',
        value: '1.10',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Entrega na região metropolitana de Salvador.',
      },
      equipment: {
        quantity: '10',
        name: 'Caçambas metálicas de 1m³',
      },
      metadata: {
        creation_date: '2024-02-09T09:00:00Z',
        last_access_date: '2024-02-28T10:20:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '19',
    title: 'Doação de Roupas Usadas (Mistura de Fibras)',
    price: 0.00,
    location: 'Campinas, SP',
    category: 'tecido',
    description: 'Lote de roupas usadas e retalhos diversos para reuso em artesanato ou doação social.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'ONG Recicla SP',
      rating: 5.0,
      verified: true,
    },
    createdAt: '2024-01-05T17:30:00Z',
    adDetails: {
      id: 19,
      title: 'Doação de Roupas Usadas (Mistura de Fibras)',
      category: 'tecido',
      ad_type: 'Doação',
      slug: 'doacao-roupas-usadas-retalhos',
      description:
        'Roupas de segunda mão e retalhos de malha em bom estado, doados para projetos sociais ou artesanais.',
      quantity: {
        value: '500',
        unit: 'kg',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '0.00',
      },
      classification: {
        origin: 'Pós-consumo',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: false,
        transport_details: 'Disponível para retirada em Campinas. Não realizamos entrega.',
      },
      equipment: {
        quantity: '20',
        name: 'Sacos de lixo industrial',
      },
      metadata: {
        creation_date: '2024-01-05T17:30:00Z',
        last_access_date: '2024-02-28T17:00:00Z',
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
    id: '20',
    title: 'Resíduo Orgânico de Poda (Chapas)',
    price: 0.12,
    location: 'Uberlândia, MG',
    category: 'organico',
    description: 'Grandes chapas de madeira não tratada, restos de poda de árvores. Ideal para queima ou compostagem.',
    images: [
      'https://images.unsplash.com/photo-1508215682855-ac7162590212?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Jardinagem Rápida MG',
      rating: 4.3,
      verified: false,
    },
    createdAt: '2024-02-18T13:00:00Z',
    adDetails: {
      id: 20,
      title: 'Resíduo Orgânico de Poda (Chapas)',
      category: 'organico',
      ad_type: 'Venda',
      slug: 'residuo-organico-poda-chapas',
      description:
        'Grandes chapas e troncos de madeira de poda, limpos, secos. Vendido por peso para fins energéticos ou paisagismo.',
      quantity: {
        value: '50',
        unit: 'toneladas',
        frequency: 'Trimestral',
      },
      price: {
        currency: 'BRL',
        value: '0.12',
      },
      classification: {
        origin: 'Poda Urbana',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: false,
        transport_details: 'O comprador deve trazer máquina para carregamento e transporte.',
      },
      equipment: {
        quantity: '1',
        name: 'Trator com garra para manejo',
      },
      metadata: {
        creation_date: '2024-02-18T13:00:00Z',
        last_access_date: '2024-02-28T16:45:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1508215682855-ac7162590212?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1508215682855-ac7162590212?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1508215682855-ac7162590212?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '21',
    title: 'Sucata Mista Geral (Compra)',
    price: 0.50,
    location: 'Belo Horizonte, MG',
    category: 'sucata',
    description: 'Compramos sucata de ferro, cobre e alumínio misturados. Volume mínimo 1 tonelada.',
    images: [
      'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Receptora Minas',
      rating: 4.8,
      verified: true,
    },
    createdAt: '2024-01-20T10:00:00Z',
    adDetails: {
      id: 21,
      title: 'Sucata Mista Geral (Compra)',
      category: 'sucata',
      ad_type: 'Compra',
      slug: 'sucata-mista-geral-compra',
      description:
        'Interesse contínuo na compra de sucata metálica ferrosa e não ferrosa. Pagamento à vista e coleta agendada na região metropolitana.',
      quantity: {
        value: '50',
        unit: 'toneladas',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '0.50',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Coleta por nossa frota em caçambas próprias.',
      },
      equipment: {
        quantity: '5',
        name: 'Caçambas para separação',
      },
      metadata: {
        creation_date: '2024-01-20T10:00:00Z',
        last_access_date: '2024-02-28T13:30:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '22',
    title: 'Óculos de Segurança Danificados (Doação)',
    price: 0.00,
    location: 'Rio de Janeiro, RJ',
    category: 'plastico',
    description: 'Óculos de segurança em policarbonato, quebrados ou inutilizados. Doação para projetos de arte ou pesquisa.',
    images: [
      'https://images.unsplash.com/photo-1572879435493-37c9703180c6?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Segurança & Cia',
      rating: 4.2,
      verified: true,
    },
    createdAt: '2024-02-12T11:00:00Z',
    adDetails: {
      id: 22,
      title: 'Óculos de Segurança Danificados (Doação)',
      category: 'plastico',
      ad_type: 'Doação',
      slug: 'oculos-seguranca-danificados-doacao',
      description:
        'Óculos de policarbonato (PC) de descarte industrial. Ótima fonte de resina plástica para quem tiver capacidade de processamento. Doação total.',
      quantity: {
        value: '50',
        unit: 'kg',
        frequency: 'Único lote',
      },
      price: {
        currency: 'BRL',
        value: '0.00',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: false,
        transport_details: 'Retirada em nossa sede, em caixas pequenas.',
      },
      equipment: {
        quantity: '1',
        name: 'N/I',
      },
      metadata: {
        creation_date: '2024-02-12T11:00:00Z',
        last_access_date: '2024-02-28T09:30:00Z',
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
    id: '23',
    title: 'Paletes de Madeira (Compra)',
    price: 15.00,
    location: 'Curitiba, PR',
    category: 'madeira',
    description: 'Compramos paletes PBR e paletes descartáveis. Pagamento por unidade.',
    images: [
      'https://images.unsplash.com/photo-1508215682855-ac7162590212?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Logística Paletes Sul',
      rating: 4.7,
      verified: true,
    },
    createdAt: '2024-01-29T14:00:00Z',
    adDetails: {
      id: 23,
      title: 'Paletes de Madeira (Compra)',
      category: 'madeira',
      ad_type: 'Compra',
      slug: 'paletes-madeira-compra',
      description:
        'Compramos paletes de madeira de todos os tamanhos, PBR ou simples, em bom estado para recondicionamento.',
      quantity: {
        value: '500',
        unit: 'unidades',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '15.00',
      },
      classification: {
        origin: 'Pós-uso industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Coleta própria na região de Curitiba e SC.',
      },
      equipment: {
        quantity: '1',
        name: 'Caminhão de plataforma',
      },
      metadata: {
        creation_date: '2024-01-29T14:00:00Z',
        last_access_date: '2024-02-27T14:00:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1508215682855-ac7162590212?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1508215682855-ac7162590212?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1508215682855-ac7162590212?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '24',
    title: 'Sucata de Pneus (Triturada - 20 Mesh)',
    price: 0.95,
    location: 'Vitória, ES',
    category: 'borracha',
    description: 'Borracha de pneu triturada, malha 20, sem fios. Venda por Big Bag.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Reciclagem Borracha ES',
      rating: 4.9,
      verified: true,
    },
    createdAt: '2024-02-15T10:30:00Z',
    adDetails: {
      id: 24,
      title: 'Sucata de Pneus (Triturada - 20 Mesh)',
      category: 'borracha',
      ad_type: 'Venda',
      slug: 'sucata-pneus-triturada-20-mesh',
      description:
        'Pó de borracha granulada fina (20 Mesh), ideal para pisos e borracha moldada. Alta consistência e baixa umidade.',
      quantity: {
        value: '10',
        unit: 'toneladas',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '0.95',
      },
      classification: {
        origin: 'Pós-consumo (Pneus)',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Frete cotado FOB (Free On Board).',
      },
      equipment: {
        quantity: '10',
        name: 'Big bags de 1 Tonelada',
      },
      metadata: {
        creation_date: '2024-02-15T10:30:00Z',
        last_access_date: '2024-02-28T14:00:00Z',
        required_documents: true,
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
    id: '25',
    title: 'Isopor (EPS) Compactado',
    price: 1.50,
    location: 'Manaus, AM',
    category: 'plastico',
    description: 'Isopor (EPS) branco, limpo e compactado em fardos. Sem adesivos.',
    images: [
      'https://images.unsplash.com/photo-1572879435493-37c9703180c6?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Embalagens Amazonas',
      rating: 4.4,
      verified: false,
    },
    createdAt: '2024-01-27T16:00:00Z',
    adDetails: {
      id: 25,
      title: 'Isopor (EPS) Compactado',
      category: 'plastico',
      ad_type: 'Venda',
      slug: 'isopor-eps-compactado',
      description:
        'Resíduo de embalagens de EPS (Isopor), compactado em blocos para reduzir volume e facilitar o transporte.',
      quantity: {
        value: '5',
        unit: 'toneladas',
        frequency: 'Bimestral',
      },
      price: {
        currency: 'BRL',
        value: '1.50',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Custo de frete FOB, mas auxiliamos na logística portuária.',
      },
      equipment: {
        quantity: '1',
        name: 'Prensa compactadora hidráulica',
      },
      metadata: {
        creation_date: '2024-01-27T16:00:00Z',
        last_access_date: '2024-02-28T12:00:00Z',
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
    id: '26',
    title: 'Sucata Eletrônica (Cabos e Fios)',
    price: 6.80,
    location: 'São Paulo, SP',
    category: 'reee',
    description: 'Cabos e fios elétricos diversos, com alto teor de cobre. Sucata R.E.E.E.',
    images: [
      'https://images.unsplash.com/photo-1594954714397-c255263d9159?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Fios & Cia Reciclagem',
      rating: 4.6,
      verified: true,
    },
    createdAt: '2024-02-20T09:00:00Z',
    adDetails: {
      id: 26,
      title: 'Sucata Eletrônica (Cabos e Fios)',
      category: 'reee',
      ad_type: 'Compra',
      slug: 'sucata-eletronica-cabos-fios',
      description:
        'Compramos lotes de cabos e fios de cobre e alumínio, misturados ou separados. Grande demanda semanal.',
      quantity: {
        value: '5',
        unit: 'toneladas',
        frequency: 'Semanal',
      },
      price: {
        currency: 'BRL',
        value: '6.80',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Perigoso',
      },
      logistics: {
        transport_available: false,
        transport_details: 'Transporte e emissão de documentação de responsabilidade do fornecedor.',
      },
      equipment: {
        quantity: '0',
        name: 'N/I',
      },
      metadata: {
        creation_date: '2024-02-20T09:00:00Z',
        last_access_date: '2024-02-28T10:00:00Z',
        required_documents: true,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1594954714397-c255263d9159?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1594954714397-c255263d9159?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1594954714397-c255263d9159?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '27',
    title: 'Resíduo de Borracha Nitrílica (NBR)',
    price: 8.50,
    location: 'Porto Alegre, RS',
    category: 'borracha',
    description: 'Aparos de borracha NBR, limpos, pós-produção. Ideal para compostos especiais.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Vedação Sul',
      rating: 4.7,
      verified: true,
    },
    createdAt: '2024-02-19T14:00:00Z',
    adDetails: {
      id: 27,
      title: 'Resíduo de Borracha Nitrílica (NBR)',
      category: 'borracha',
      ad_type: 'Venda',
      slug: 'residuo-borracha-nitrilica-nbr',
      description:
        'Resíduos limpos de Borracha Nitrílica (NBR) em formato de flocos. Material de alta resistência a óleos e combustíveis, pronto para reprocessamento.',
      quantity: {
        value: '1',
        unit: 'tonelada',
        frequency: 'Único lote',
      },
      price: {
        currency: 'BRL',
        value: '8.50',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Transporte a ser incluído no valor final, dentro da região Sul.',
      },
      equipment: {
        quantity: '50',
        name: 'Sacos de ráfia',
      },
      metadata: {
        creation_date: '2024-02-19T14:00:00Z',
        last_access_date: '2024-02-28T11:20:00Z',
        required_documents: true,
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
    id: '28',
    title: 'Vidro Laminado de Automóvel',
    price: 0.25,
    location: 'São Paulo, SP',
    category: 'vidro',
    description: 'Resíduo de vidro laminado automotivo. Requer separação da camada de PVB.',
    images: [
      'https://images.unsplash.com/photo-1616781745260-264d852a32c2?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Desmanche Central',
      rating: 4.1,
      verified: false,
    },
    createdAt: '2024-02-16T12:00:00Z',
    adDetails: {
      id: 28,
      title: 'Vidro Laminado de Automóvel',
      category: 'vidro',
      ad_type: 'Compra',
      slug: 'vidro-laminado-automovel-compra',
      description:
        'Compramos lotes de vidro laminado (pára-brisas) para reciclagem. Aceitamos grandes volumes, necessário retirar o PVB.',
      quantity: {
        value: '20',
        unit: 'toneladas',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '0.25',
      },
      classification: {
        origin: 'Pós-consumo',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Coleta a cada 15 dias na Grande São Paulo.',
      },
      equipment: {
        quantity: '2',
        name: 'Caçambas de 20 m³',
      },
      metadata: {
        creation_date: '2024-02-16T12:00:00Z',
        last_access_date: '2024-02-28T13:00:00Z',
        required_documents: false,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1616781745260-264d852a32c2?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1616781745260-264d852a32c2?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1616781745260-264d852a32c2?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '29',
    title: 'Sucata de Cobre (Classe I)',
    price: 25.00,
    location: 'São Paulo, SP',
    category: 'metais',
    description: 'Sucata de cobre puro e contaminado com óleo/graxa. Classificado como perigoso.',
    images: [
      'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Metais Pesados SP',
      rating: 4.9,
      verified: true,
    },
    createdAt: '2024-02-22T10:00:00Z',
    adDetails: {
      id: 29,
      title: 'Sucata de Cobre (Classe I)',
      category: 'metais',
      ad_type: 'Compra',
      slug: 'sucata-cobre-classe-i',
      description:
        'Compramos sucata de cobre contaminado com lubrificantes e fluidos, classificado como perigoso. É fundamental a documentação correta (MTR).',
      quantity: {
        value: '2',
        unit: 'toneladas',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '25.00',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Perigoso',
      },
      logistics: {
        transport_available: true,
        transport_details: 'Oferecemos o serviço de coleta especializada em resíduos Classe I.',
      },
      equipment: {
        quantity: '1',
        name: 'Caminhão tanque com bomba',
      },
      metadata: {
        creation_date: '2024-02-22T10:00:00Z',
        last_access_date: '2024-02-28T09:00:00Z',
        required_documents: true,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1579294970420-ef925c43d8c5?auto=format&fit=crop&w=1200&q=80',
      },
    },
  },
  {
    id: '30',
    title: 'Aparas de Papel Branco (Grau A)',
    price: 1.80,
    location: 'Ribeirão Preto, SP',
    category: 'papel',
    description: 'Papel branco de escritório, 100% limpo, picotado e em fardos.',
    images: [
      'https://images.unsplash.com/photo-1587640621415-467000e3034f?auto=format&fit=crop&w=1200&q=80',
    ],
    seller: {
      name: 'Arquivos Limpos',
      rating: 4.8,
      verified: true,
    },
    createdAt: '2024-02-18T16:00:00Z',
    adDetails: {
      id: 30,
      title: 'Aparas de Papel Branco (Grau A)',
      category: 'papel',
      ad_type: 'Venda',
      slug: 'aparas-papel-branco-grau-a',
      description:
        'Aparas de papel branco (sulfite), grau A. Ideal para celulose de alta qualidade. Prensado e embalado em fardos de 300kg.',
      quantity: {
        value: '10',
        unit: 'toneladas',
        frequency: 'Mensal',
      },
      price: {
        currency: 'BRL',
        value: '1.80',
      },
      classification: {
        origin: 'Pós-industrial',
        hazard_status: 'Não perigoso',
      },
      logistics: {
        transport_available: false,
        transport_details: 'Retirada FOB, horário agendado.',
      },
      equipment: {
        quantity: '1',
        name: 'Balança de piso',
      },
      metadata: {
        creation_date: '2024-02-18T16:00:00Z',
        last_access_date: '2024-02-28T17:30:00Z',
        required_documents: true,
      },
      media: {
        main_image_url: 'https://images.unsplash.com/photo-1587640621415-467000e3034f?auto=format&fit=crop&w=1200&q=80',
        gallery_images: [
          'https://images.unsplash.com/photo-1587640621415-467000e3034f?auto=format&fit=crop&w=1200&q=80',
        ],
        og_image_url: 'https://images.unsplash.com/photo-1587640621415-467000e3034f?auto=format&fit=crop&w=1200&q=80',
      },
    },
  }
];