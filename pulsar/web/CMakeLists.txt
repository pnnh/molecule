# 当编译WebAssembly时修改链接参数，否则会报初始内存太小错误
target_link_options(qt-wasm PRIVATE -s TOTAL_MEMORY=32MB)
