/**
 * Test Utilities - Central Export
 * 
 * Importa todos os helpers de teste de um único lugar.
 * 
 * @example
 * import { 
 *   createTestProduct,
 *   mockFetchSuccess,
 *   renderWithProviders,
 *   screen
 * } from '@/test';
 */

// Test Data Factories
export {
  createTestProduct,
  createTestProducts,
  createTestCategory,
  createTestCategories,
  createTestAdDetails,
  testProductPresets,
} from './factories';

// Fetch Mock Utilities
export {
  setupFetchMock,
  cleanupFetchMock,
  mockFetchSuccess,
  mockFetchError,
  mockFetchSequence,
  mockFetchRoutes,
  mockFetchNetworkError,
  useFetchMock,
} from './fetch-utils';

// Render Utilities
export {
  renderWithProviders,
  renderWithColorMode,
  renderWithLayout,
  // Re-export de @testing-library/react
  screen,
  waitFor,
  within,
  fireEvent,
  act,
  cleanup,
  renderHook,
} from './render-utils';

// Re-export de vitest para conveniência
export { vi, describe, it, expect, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
export type { Mock, MockInstance } from 'vitest';
