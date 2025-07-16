import { bench, describe, beforeAll } from "vitest";

// JavaScript 版本的字符串处理
function jsStringProcessing(input: string): string {
  return `Hello ${input}`;
}

// 全局 WASM 实例（确保在 beforeAll 中完全加载）
let wasmInstance: any = null;

// 同步 WASM 字符串处理（使用已加载的实例）
function wasmStringProcessing(_input: string): string {
  return wasmInstance.getHelloString();
}

describe("WASM vs JavaScript 性能测试", () => {
  const testInput = "World";
  
  // 确保 WASM 完全加载后再开始测试，失败则报错
  beforeAll(async () => {
    const HelloModule = await import('./wasm/hello.js');
    wasmInstance = await HelloModule.default();
    if (!wasmInstance || typeof wasmInstance.getHelloString !== 'function') {
      throw new Error('WASM 模块加载失败或缺少 getHelloString 方法');
    }
  });
  
  bench("JavaScript 字符串处理", () => {
    jsStringProcessing(testInput);
  });
  
  bench("WASM 字符串处理", () => {
    wasmStringProcessing(testInput);
  });
  
  // 批量处理测试
  bench("JavaScript 批量处理", () => {
    for (let i = 0; i < 1000; i++) {
      jsStringProcessing(`World ${i}`);
    }
  });
  
  bench("WASM 批量处理", () => {
    for (let i = 0; i < 1000; i++) {
      wasmInstance.getHelloString();
    }
  });
});