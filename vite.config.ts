import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0'
  },
  assetsInclude: ['**/*.wasm'],
  optimizeDeps: {
    exclude: ['src/wasm/hello.js']
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    deps: {
      inline: ['@testing-library/react']
    }
  }
})