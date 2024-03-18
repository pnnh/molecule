#include <emscripten/bind.h>
#include "wasm.h"

using namespace emscripten;

float lerp(float a, float b, float t) {
    return (1 - t) * a + t * b;
}