

add_executable(polaris-wasm-browser
    main.cpp
)

target_link_libraries(polaris-wasm-browser polaris-wasm)

set_target_properties(polaris-wasm-browser PROPERTIES LINK_FLAGS "-lembind -sMODULARIZE -sENVIRONMENT=web -sTOTAL_MEMORY=32MB --embind-emit-tsd polaris-wasm-browser.d.ts")

file(COPY_FILE ${CMAKE_CURRENT_SOURCE_DIR}/package.json ${CMAKE_CURRENT_BINARY_DIR}/package.json)

install(FILES
    "$<TARGET_FILE_DIR:polaris-wasm-browser>/polaris-wasm-browser.js"
    "$<TARGET_FILE_DIR:polaris-wasm-browser>/polaris-wasm-browser.wasm"
    "$<TARGET_FILE_DIR:polaris-wasm-browser>/polaris-wasm-browser.d.ts"
    "$<TARGET_FILE_DIR:polaris-wasm-browser>/package.json"
    DESTINATION browser)