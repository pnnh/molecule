

add_library(polaris-wasm STATIC
    wasm.cpp
    wasm.h
)

add_subdirectory(browser)
add_subdirectory(server)
