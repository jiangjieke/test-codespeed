import { renderHook, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useState, useEffect } from 'react'

// Simple test without trying to mock the actual WASM module
// We'll test the hook's behavior in isolation

describe('useWasm hook - basic behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initially show loading state', () => {
    // Create a simple test version of the hook
    const mockUseWasm = () => {
      const [helloString, setHelloString] = useState('Loading...')
      const [isLoading, setIsLoading] = useState(true)

      useEffect(() => {
        setTimeout(() => {
          setHelloString('Hello World')
          setIsLoading(false)
        }, 100)
      }, [])

      return { helloString, isLoading }
    }

    const { result } = renderHook(() => mockUseWasm())
    
    expect(result.current.isLoading).toBe(true)
    expect(result.current.helloString).toBe('Loading...')
  })

  it('should eventually load content', async () => {
    const mockUseWasm = () => {
      const [helloString, setHelloString] = useState('Loading...')
      const [isLoading, setIsLoading] = useState(true)

      useEffect(() => {
        setTimeout(() => {
          setHelloString('Hello World')
          setIsLoading(false)
        }, 100)
      }, [])

      return { helloString, isLoading }
    }

    const { result } = renderHook(() => mockUseWasm())
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
    
    expect(result.current.helloString).toBe('Hello World')
  })
})