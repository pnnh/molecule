

add_executable(polaris-wasm-server
    main.cpp 
)

target_link_libraries(polaris-wasm-server polaris-wasm)

set_target_properties(polaris-wasm-server PROPERTIES LINK_FLAGS "-lembind -sMODULARIZE -sTOTAL_MEMORY=32MB --embind-emit-tsd polaris-wasm-server.d.ts")

file(COPY_FILE ${CMAKE_CURRENT_SOURCE_DIR}/package.json ${CMAKE_CURRENT_BINARY_DIR}/package.json)

install(FILES
    "$<TARGET_FILE_DIR:polaris-wasm-server>/polaris-wasm-server.js"
    "$<TARGET_FILE_DIR:polaris-wasm-server>/polaris-wasm-server.wasm"
    "$<TARGET_FILE_DIR:polaris-wasm-server>/polaris-wasm-server.d.ts"
    "$<TARGET_FILE_DIR:polaris-wasm-server>/package.json"
    DESTINATION server)