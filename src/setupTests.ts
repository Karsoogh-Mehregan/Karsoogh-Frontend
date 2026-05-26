import '@testing-library/jest-dom';
import { vi } from 'vitest';

const mockContext = {
  clearRect: vi.fn(),
  fillRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  closePath: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  translate: vi.fn(),
  rotate: vi.fn(),
  scale: vi.fn(),
  fillText: vi.fn(),
  setTransform: vi.fn(),
  // ویژگی‌هایی (Properties) که در کامپوننت مقداردهی می‌کنید
  font: '',
  fillStyle: '',
  globalAlpha: 1,
  lineWidth: 1,
  shadowBlur: 0,
  shadowColor: '',
  strokeStyle: '',
  textAlign: 'start',
  textBaseline: 'alphabetic',
};

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: vi.fn(() => mockContext),
  writable: true,
});

Object.defineProperty(window, 'requestAnimationFrame', {
  value: vi.fn((callback: FrameRequestCallback) => window.setTimeout(() => callback(0), 16)),
  writable: true,
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  value: vi.fn((id: number) => window.clearTimeout(id)),
  writable: true,
});

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn(() => ({
    matches: true,
    media: '',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
  writable: true,
});
