import { render, screen } from '@testing-library/react'
import App from '../../App'
import { describe, it, expect, vi } from 'vitest'

// Mock the actual WASM module for integration tests
vi.mock('../../wasm/hello.js', () => ({
  default: () => Promise.resolve({
    getHelloString: () => 'Hello World',
  }),
}))

describe('WASM Integration Tests', () => {
  it('should render the app without crashing', () => {
    render(<App />)
    
    // Basic rendering check - check for specific text
    expect(screen.getByText('Loading... 🌍')).toBeInTheDocument()
    expect(screen.getByText('Welcome to your TypeScript React + WASM app')).toBeInTheDocument()
  })

  it('should show loading state initially', () => {
    render(<App />)
    
    expect(screen.getByText('Loading... 🌍')).toBeInTheDocument()
    expect(screen.getByText('Loading WASM...')).toBeInTheDocument()
  })

  it('should have the button present', () => {
    render(<App />)
    
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})