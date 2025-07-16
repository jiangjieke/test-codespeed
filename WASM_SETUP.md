# WebAssembly Setup Guide

This project integrates WebAssembly (WASM) with React + TypeScript to provide "Hello World" string from a C++ WASM module.

## Overview

- **C++ source**: `src/hello.cpp` - Contains the WASM functionality
- **Build script**: `build-wasm.sh` - Emscripten build configuration
- **React integration**: `src/hooks/useWasm.ts` - Custom hook for WASM loading
- **Tests**: Comprehensive test suite for WASM functionality

## Prerequisites

### Install Emscripten

```bash
# Method 1: Using emsdk
1. git clone https://github.com/emscripten-core/emsdk.git
2. cd emsdk
3. ./emsdk install latest
4. ./emsdk activate latest
5. source ./emsdk_env.sh

# Method 2: Using package manager (macOS)
brew install emscripten

# Method 3: Using docker
docker run --rm -v $(pwd):/src emscripten/emsdk emcc src/hello.cpp -o src/wasm/hello.js -s EXPORT_ES6=1 -s MODULARIZE=1 -s EXPORT_NAME="HelloModule" --bind -O3
```

## Build Process

### 1. Build WASM Module
```bash
./build-wasm.sh
```
This generates:
- `src/wasm/hello.js` - JavaScript wrapper
- `src/wasm/hello.wasm` - WebAssembly binary

### 2. Build for Production
```bash
# Build WASM + React app
npm run build:all

# Or separately
npm run build-wasm
npm run build
```

### 3. Development
```bash
# Start dev server (includes fallback)
npm run dev

# Run tests
npm test
```

## Usage

### In React Components

```tsx
import { useWasm } from './hooks/useWasm'

function MyComponent() {
  const { helloString, isLoading } = useWasm()
  
  if (isLoading) {
    return <div>Loading WASM...⏳</div>
  }
  
  return <div>{helloString} 🌍</div>
}
```

### C++ Source Structure

```cpp
#include <emscripten/bind.h>
#include <string>

std::string getHelloString() {
    return "Hello World";
}

EMSCRIPTEN_BINDINGS(my_module) {
    emscripten::function("getHelloString", &getHelloString);
}
```

## Testing

### Unit Tests
```bash
npm test                # Run all tests
npm run test:watch      # Watch mode
```

### Test Structure
- Unit tests: `src/__tests__/hooks/` - Hook behavior
- Integration tests: `src/__tests__/integration/` - Component rendering
- WASM tests: `src/__tests__/wasm/` - Build verification

## Fallback Behavior

If WASM fails to load:
- App gracefully falls back to "Hello World (fallback)"
- No crash, just shows hardcoded text
- Console error logged for debugging

## Troubleshooting

### Common Issues

1. **Emscripten not found**
   - Ensure `emcc` is in PATH
   - Run `source ./emsdk_env.sh` if using emsdk

2. **WASM import errors**
   - Check `build-wasm.sh` permissions: `chmod +x build-wasm.sh`
   - Verify Emscripten version compatibility

3. **Build failures**
   - Check Node.js version (16+)
   - Ensure all dependencies installed: `pnpm install`

### Performance Notes

- WASM module is ~50KB after optimization
- Lazy loading prevents blocking initial render
- Fallback ensures app works even without WASM

## Configuration Files

- `vite.config.ts` - Vite configuration with WASM support
- `vitest.config.test.ts` - Test configuration
- `tsconfig.json` - TypeScript configuration
- `build-wasm.sh` - Emscripten build script