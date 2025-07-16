/**
 * Type declarations for the WASM module
 */

// Declare the WASM module structure
interface HelloModule {
  getHelloString(): string;
}

// Factory function that creates the WASM module instance
declare function HelloModule(): Promise<HelloModule>;

// Default export is the factory function
declare const _default: typeof HelloModule;
export default _default;