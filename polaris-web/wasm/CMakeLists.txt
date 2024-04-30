

add_executable(polaris-wasm
    wasm.cpp
    wasm.h
)

set_target_properties(polaris-wasm PROPERTIES LINK_FLAGS "-lembind -sMODULARIZE -sTOTAL_MEMORY=32MB --embind-emit-tsd polaris-wasm.d.ts")

file(COPY_FILE ${CMAKE_CURRENT_SOURCE_DIR}/package.json ${CMAKE_CURRENT_BINARY_DIR}/package.json)

install(FILES
    "$<TARGET_FILE_DIR:polaris-wasm>/polaris-wasm.js"
    "$<TARGET_FILE_DIR:polaris-wasm>/polaris-wasm.wasm"
    "$<TARGET_FILE_DIR:polaris-wasm>/polaris-wasm.d.ts"
    "$<TARGET_FILE_DIR:polaris-wasm>/package.json"
    DESTINATION .)