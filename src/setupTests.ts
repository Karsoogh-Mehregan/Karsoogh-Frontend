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
  // ویژگی‌هایی (Properties) که در کامپوننت مقداردهی می‌کنید
  font: '',
  fillStyle: '',
  textAlign: 'start',
  textBaseline: 'alphabetic',
};

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: vi.fn(() => mockContext),
  writable: true,
});
