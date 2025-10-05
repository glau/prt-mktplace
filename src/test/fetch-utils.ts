/**
 * Fetch Mock Utilities
 * 
 * Helpers para mockar requisições fetch nos testes de forma consistente.
 * 
 * @example
 * const fetchMock = setupFetchMock();
 * mockFetchSuccess(fetchMock, { data: 'test' });
 * 
 * // ou para múltiplas respostas
 * mockFetchSequence(fetchMock, [
 *   { success: true, data: { categories: [...] } },
 *   { success: true, data: { products: [...] } },
 * ]);
 */

import { vi, type Mock } from 'vitest';

/**
 * Configura um mock do fetch global e retorna a função mockada
 * Chame no beforeEach do teste
 */
export const setupFetchMock = (): Mock => {
  const fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

/**
 * Remove o mock do fetch global
 * Chame no afterEach do teste
 */
export const cleanupFetchMock = (): void => {
  vi.unstubAllGlobals();
};

/**
 * Mocka uma resposta de sucesso do fetch
 */
export const mockFetchSuccess = <T>(mock: Mock, data: T): void => {
  mock.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => data,
    text: async () => JSON.stringify(data),
  } as Response);
};

/**
 * Mocka uma resposta de erro do fetch
 */
export const mockFetchError = (mock: Mock, message = 'Request failed', status = 400): void => {
  mock.mockResolvedValueOnce({
    ok: false,
    status,
    json: async () => ({ error: message }),
    text: async () => message,
  } as Response);
};

/**
 * Mocka uma sequência de respostas (útil quando múltiplos fetches são feitos)
 */
export const mockFetchSequence = <T = unknown>(
  mock: Mock,
  responses: Array<{ success: boolean; data?: T; error?: string; status?: number }>
): void => {
  responses.forEach((response) => {
    if (response.success) {
      mockFetchSuccess(mock, response.data);
    } else {
      mockFetchError(mock, response.error, response.status);
    }
  });
};

/**
 * Mocka fetch com base na URL (router de mocks)
 * Útil quando você precisa mockar múltiplas rotas API
 * 
 * @example
 * mockFetchRoutes(fetchMock, {
 *   '/api/categories': { categories: [...] },
 *   '/api/products': { products: [...] },
 * });
 */
export const mockFetchRoutes = <T = unknown>(
  mock: Mock,
  routes: Record<string, T>,
  options?: { defaultError?: string }
): void => {
  mock.mockImplementation((url: RequestInfo | URL) => {
    const urlString = String(url);
    
    // Encontra a rota que matcha
    const matchedRoute = Object.keys(routes).find((route) =>
      urlString.includes(route)
    );

    if (matchedRoute) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => routes[matchedRoute],
        text: async () => JSON.stringify(routes[matchedRoute]),
      } as Response);
    }

    // Rota não encontrada
    const errorMessage = options?.defaultError || `No mock found for URL: ${urlString}`;
    return Promise.resolve({
      ok: false,
      status: 404,
      text: async () => errorMessage,
      json: async () => ({ error: errorMessage }),
    } as Response);
  });
};

/**
 * Mocka fetch que falha com network error
 * Simula problemas de conexão
 */
export const mockFetchNetworkError = (mock: Mock, message = 'Network error'): void => {
  mock.mockRejectedValueOnce(new Error(message));
};

/**
 * Helper para criar um setup/teardown padrão de fetch mock
 * Use no describe block do seu teste
 * 
 * @example
 * describe('MyComponent', () => {
 *   const { fetchMock } = useFetchMock();
 *   
 *   it('fetches data', () => {
 *     mockFetchSuccess(fetchMock, { data: 'test' });
 *     // ... resto do teste
 *   });
 * });
 */
export const useFetchMock = () => {
  let fetchMock: Mock;

  beforeEach(() => {
    fetchMock = setupFetchMock();
  });

  afterEach(() => {
    cleanupFetchMock();
  });

  return { 
    get fetchMock() { return fetchMock; }
  };
};
