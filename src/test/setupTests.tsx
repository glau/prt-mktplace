/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/server';

// JSDOM polyfill for matchMedia used by some components
if (typeof window !== 'undefined' && !window.matchMedia) {
  (window as Window & typeof globalThis & { matchMedia: unknown }).matchMedia = () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Global mocks aplicados a todos os testes
// Mantemos apenas mocks que não quebram testes existentes

// NOTA: Mocks mais específicos (ColorModeProvider, useFavorites, etc) devem ser
// definidos em cada arquivo de teste conforme necessário, para evitar conflitos
// com testes que precisam do comportamento real desses módulos.

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
