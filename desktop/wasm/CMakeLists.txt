

add_executable(pulsar-web
    wasm.cpp
    wasm.h
)

set_target_properties(pulsar-web PROPERTIES LINK_FLAGS "-sMODULARIZE -sEXPORT_ES6 -sTOTAL_MEMORY=32MB --closure 1 -lembind --embind-emit-tsd pulsar-web.d.ts")

file(COPY_FILE ${CMAKE_CURRENT_SOURCE_DIR}/package.json ${CMAKE_CURRENT_BINARY_DIR}/package.json)


install(FILES
    "$<TARGET_FILE_DIR:pulsar-web>/pulsar-web.js"
    "$<TARGET_FILE_DIR:pulsar-web>/pulsar-web.wasm"
    "$<TARGET_FILE_DIR:pulsar-web>/pulsar-web.d.ts"
    "$<TARGET_FILE_DIR:pulsar-web>/package.json"
    DESTINATION .)