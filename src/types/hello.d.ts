export interface HelloModuleInstance {
  getHelloString(): string;
}

export interface HelloModule {
  (): Promise<HelloModuleInstance>;
}

// 声明 WASM 模块类型，支持动态导入
declare module '*/wasm/hello.js' {
  const HelloModule: HelloModule;
  export default HelloModule;
}

// 为了支持相对路径导入
declare module '../wasm/hello.js' {
  const HelloModule: HelloModule;
  export default HelloModule;
}