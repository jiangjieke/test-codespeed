import { useState, useEffect } from 'react'

export const useWasm = () => {
  const [helloString, setHelloString] = useState<string>('Loading...')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadWasm = async () => {
      try {
        // Dynamically import the WASM module
        const HelloModule = await import('../wasm/hello.js')
        const instance = await HelloModule.default()
        setHelloString(instance.getHelloString())
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load WASM module:', error)
        setHelloString('Hello World (fallback)')
        setIsLoading(false)
      }
    }

    loadWasm()
  }, [])

  return { helloString, isLoading }
}