# TypeScript React + WebAssembly Demo

一个展示如何在 React 应用中集成 WebAssembly 的示例项目。

## 🚀 特性

- ⚡ TypeScript + React 19
- 🔧 WebAssembly (C++) 集成
- 🧪 完整的测试套件 (Vitest)
- 📊 性能基准测试 (CodSpeed)
- 🎯 优雅的错误处理和回退机制

## 🛠️ 快速开始

```bash
# 安装依赖
pnpm install

# 构建 WASM 模块 (需要 Emscripten)
npm run build-wasm

# 启动开发服务器
npm run dev

# 运行测试
npm test

# 性能基准测试
npm run bench
```

## 📖 更多信息

查看 [WASM_SETUP.md](./WASM_SETUP.md) 了解详细的 WebAssembly 设置指南。
