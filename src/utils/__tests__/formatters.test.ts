import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatPrice,
  formatDate,
  formatDateTime,
  formatQuantity,
} from '../formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('should format number as BRL currency', () => {
      const result = formatCurrency(1234.56);
      expect(result).toContain('1.234,56');
      expect(result).toContain('R$');
    });

    it('should format string number as BRL currency', () => {
      const result = formatCurrency('1234,56');
      expect(result).toContain('1.234,56');
      expect(result).toContain('R$');
    });

    it('should handle custom currency', () => {
      const result = formatCurrency(1234.56, 'USD');
      expect(result).toContain('1.234,56');
      expect(result).toContain('US$');
    });

    it('should fallback on invalid number', () => {
      const result = formatCurrency('invalid');
      expect(result).toContain('invalid');
    });

    it('should fallback on invalid currency', () => {
      const result = formatCurrency(100, 'INVALID');
      expect(result).toContain('100,00');
      expect(result).toContain('R$');
    });

    it('should handle zero', () => {
      const result = formatCurrency(0);
      expect(result).toContain('0,00');
      expect(result).toContain('R$');
    });

    it('should handle negative numbers', () => {
      const result = formatCurrency(-100.50);
      expect(result).toContain('100,50');
      expect(result).toContain('R$');
    });
  });

  describe('formatPrice', () => {
    it('should format price correctly', () => {
      const result = formatPrice(1234.56);
      expect(result).toBe('R$ 1234,56');
    });

    it('should format price with two decimals', () => {
      const result = formatPrice(100);
      expect(result).toBe('R$ 100,00');
    });

    it('should handle decimal precision', () => {
      const result = formatPrice(99.999);
      expect(result).toBe('R$ 100,00');
    });
  });

  describe('formatDate', () => {
    it('should format valid date string', () => {
      const result = formatDate('2024-01-15T09:00:00Z');
      // Result depends on locale, but should be a valid date format
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('should handle invalid date gracefully', () => {
      const invalidDate = 'invalid-date';
      const result = formatDate(invalidDate);
      // When date is invalid, toLocaleDateString returns 'Invalid Date'
      expect(result).toContain('Invalid');
    });

    it('should format ISO date correctly', () => {
      const result = formatDate('2024-12-25');
      expect(result).toBeTruthy();
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });
  });

  describe('formatDateTime', () => {
    it('should format valid datetime string', () => {
      const result = formatDateTime('2024-01-15T14:30:00Z');
      // Should contain both date and time
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
      expect(result).toContain(':');
    });

    it('should handle invalid datetime gracefully', () => {
      const invalidDate = 'invalid-datetime';
      const result = formatDateTime(invalidDate);
      // When date is invalid, returns 'Invalid Date'
      expect(result).toContain('Invalid');
    });

    it('should format with time component', () => {
      const result = formatDateTime('2024-02-05T14:30:00Z');
      expect(result).toBeTruthy();
      // Should have both date and time parts
      expect(result.split(' ').length).toBeGreaterThan(1);
    });
  });

  describe('formatQuantity', () => {
    it('should format quantity with value and unit', () => {
      const result = formatQuantity({
        value: '100',
        unit: 'kg',
      });
      expect(result).toBe('100 kg');
    });

    it('should format quantity with frequency', () => {
      const result = formatQuantity({
        value: '100',
        unit: 'kg',
        frequency: 'Mensal',
      });
      expect(result).toBe('100 kg • Mensal');
    });

    it('should handle quantity without frequency', () => {
      const result = formatQuantity({
        value: '50',
        unit: 'unidades',
      });
      expect(result).toBe('50 unidades');
    });

    it('should handle empty frequency', () => {
      const result = formatQuantity({
        value: '25',
        unit: 'litros',
        frequency: '',
      });
      expect(result).toBe('25 litros');
    });
  });
});
