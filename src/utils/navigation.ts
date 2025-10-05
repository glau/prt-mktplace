export type NavItem = {
  key: 'comprar' | 'vender' | 'servicos' | 'noticias';
  label: string;
  href: string;
};

export const coreNavItems: NavItem[] = [
  { key: 'comprar', label: 'Comprar', href: '/#comprar' },
  { key: 'vender', label: 'Vender', href: '/#vender' },
  { key: 'servicos', label: 'Serviços', href: '/#servicos' },
  { key: 'noticias', label: 'Notícias', href: '/#noticias' },
];
