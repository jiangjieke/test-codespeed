// Mock WASM module for testing
const mockHelloModule = {
  default: () =>
    Promise.resolve({
      getHelloString: () => 'Hello from WASM Test',
    }),
}

export default mockHelloModule