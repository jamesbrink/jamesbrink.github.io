// Test setup file for Vitest
// Add any global test setup here

import { vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Set up global DOM environment for tests that need it
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
  url: 'http://localhost:4321',
  pretendToBeVisual: true,
  resources: 'usable',
});

// Add localStorage mock
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
  };
})();

// Make DOM APIs available globally
global.window = dom.window as any;
global.document = dom.window.document;
global.localStorage = localStorageMock as any;
global.navigator = dom.window.navigator;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Add fetch polyfill for Node.js environment
// Note: Modern Node.js versions (18+) have built-in fetch
// If using older Node.js, install node-fetch package
