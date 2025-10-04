/**
 * Utilitários de formatação padronizados para toda a aplicação
 */

export function formatCurrency(value: number | string, currency: string = 'BRL'): string {
  const normalizedValue = typeof value === 'number' ? value : Number(value.replace(',', '.'));

  if (!Number.isNaN(normalizedValue) && Number.isFinite(normalizedValue)) {
    try {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency,
      }).format(normalizedValue);
    } catch {
      // Fallback se currency for inválida
      return `R$ ${normalizedValue.toFixed(2).replace('.', ',')}`;
    }
  }

  return `R$ ${value}`;
}

export function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('pt-BR');
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(dateString));
  } catch {
    try {
      return new Date(dateString).toLocaleString('pt-BR');
    } catch {
      return dateString;
    }
  }
}

export function formatQuantity(quantity: { value: string; unit: string; frequency?: string }): string {
  let result = `${quantity.value} ${quantity.unit}`;
  if (quantity.frequency) {
    result += ` • ${quantity.frequency}`;
  }
  return result;
}
