

add_library(pulsar-wasm-static STATIC
    wasm.cpp
    wasm.h
)

add_executable(pulsar-wasm
    main.cpp
)

target_link_libraries(pulsar-wasm PUBLIC pulsar-wasm-static)
set_target_properties(pulsar-wasm PROPERTIES LINK_FLAGS "-lembind -sMODULARIZE -sEXPORT_ES6")

# 当编译WebAssembly时修改链接参数，否则会报初始内存太小错误
target_link_options(pulsar-wasm PRIVATE -s TOTAL_MEMORY=32MB)

