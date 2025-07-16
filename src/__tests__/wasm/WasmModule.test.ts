import { describe, it, expect } from 'vitest'
import * as fs from 'fs'

// Test for actual WASM module - this would need Emscripten to run
// These are more like integration tests for when WASM is built

describe('WASM Module Tests', () => {
  it('should have build script available', () => {
    expect(fs.existsSync('./build-wasm.sh')).toBe(true)
  })

  it('should have C++ source file', () => {
    expect(fs.existsSync('./src/hello.cpp')).toBe(true)
  })

  it('should have correct C++ source', () => {
    const source = fs.readFileSync('./src/hello.cpp', 'utf8')
    expect(source).toContain('getHelloString')
    expect(source).toContain('Hello World')
    expect(source).toContain('EMSCRIPTEN_BINDINGS')
  })

  it('should have correct build configuration', () => {
    const buildScript = fs.readFileSync('./build-wasm.sh', 'utf8')
    expect(buildScript).toContain('emcc')
    expect(buildScript).toContain('EXPORT_ES6=1')
    expect(buildScript).toContain('MODULARIZE=1')
  })
})