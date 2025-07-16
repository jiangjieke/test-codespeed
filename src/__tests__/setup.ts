import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Setup global test environment
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))