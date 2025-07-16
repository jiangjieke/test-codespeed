#include <emscripten/bind.h>
#include <string>

std::string getHelloString() {
    return "Hello World";
}

EMSCRIPTEN_BINDINGS(my_module) {
    emscripten::function("getHelloString", &getHelloString);
}