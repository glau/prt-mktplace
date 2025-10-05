import { describe, it, expect } from 'vitest';
import { menuItems } from '../../config/navigation';

describe('navigation config', () => {
  it('contains only desired items and excludes removed ones', () => {
    const labels = menuItems.map(i => i.label);
    expect(labels).toEqual([
      'Comprar',
      'Vender',
      'Serviços',
      'Notícias',
    ]);
  });

  it('has desktop and mobile visibility flags set appropriately', () => {
    for (const item of menuItems) {
      expect(typeof item.visibleDesktop).toBe('boolean');
      expect(typeof item.visibleMobile).toBe('boolean');
    }
  });
});
