#!/bin/bash

# Check if Emscripten is available
if ! command -v emcc &> /dev/null; then
    echo "Error: emcc not found. Please install Emscripten first:"
    echo "  1. git clone https://github.com/emscripten-core/emsdk.git"
    echo "  2. cd emsdk && ./emsdk install latest && ./emsdk activate latest"
    echo "  3. source ./emsdk_env.sh"
    exit 1
fi

# Build the WASM module
echo "Building WASM module..."
emcc src/hello.cpp \
    -o src/wasm/hello.js \
    -s EXPORT_ES6=1 \
    -s MODULARIZE=1 \
    -s EXPORT_NAME="HelloModule" \
    -s ENVIRONMENT="web,node" \
    -s SINGLE_FILE=1 \
    -s WASM_ASYNC_COMPILATION=0 \
    --bind \
    -O3

echo "WASM build complete! Files generated:"
echo "  - src/wasm/hello.js"
echo "  - src/wasm/hello.wasm"