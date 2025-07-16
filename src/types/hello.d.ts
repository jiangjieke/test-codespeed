export interface HelloModuleInstance {
  getHelloString(): string;
}

declare const HelloModule: () => Promise<{
  default: HelloModuleInstance;
}>;

export default HelloModule;