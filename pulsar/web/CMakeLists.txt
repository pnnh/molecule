

add_executable(pulsar-wasm
    wasm.cpp
    wasm.h
)

set_target_properties(pulsar-wasm PROPERTIES LINK_FLAGS "-sMODULARIZE -sEXPORT_ES6 -sTOTAL_MEMORY=32MB --closure 1 -lembind --embind-emit-tsd interface.d.ts")
