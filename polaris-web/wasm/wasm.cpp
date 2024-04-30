
#include "wasm.h"

#include <emscripten/bind.h>
#include <iostream>

using namespace emscripten;

float lerp(float a, float b, float t) {
    return (1 - t) * a + t * b;
}

EMSCRIPTEN_BINDINGS(polaris_wasm) {
    function("lerp", &lerp);
}

int main(int argc, char *argv[]) {
    auto abc = lerp(2.4, 4.3, 0.5);
    std::cout << "lerp(2.4, 4.3, 0.5) = " << abc << std::endl;
}