import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = typeof window === 'undefined' ? null : setupWorker(...handlers);
