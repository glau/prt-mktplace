export type MenuItem = {
  label: 'Comprar' | 'Vender' | 'Serviços' | 'Notícias';
  href: string;
  iconId?: 'shopping' | 'store' | 'services' | 'news';
  visibleDesktop: boolean;
  visibleMobile: boolean;
};

export const menuItems: MenuItem[] = [
  {
    label: 'Comprar',
    href: '/#comprar',
    iconId: 'shopping',
    visibleDesktop: true,
    visibleMobile: true,
  },
  {
    label: 'Vender',
    href: '/#vender',
    iconId: 'store',
    visibleDesktop: true,
    visibleMobile: true,
  },
  {
    label: 'Serviços',
    href: '/#servicos',
    iconId: 'services',
    visibleDesktop: true,
    visibleMobile: true,
  },
  {
    label: 'Notícias',
    href: '/#noticias',
    iconId: 'news',
    visibleDesktop: true,
    visibleMobile: true,
  },
];
