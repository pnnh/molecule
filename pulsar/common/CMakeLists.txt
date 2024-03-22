add_library(quantum_native SHARED
        database/quantum.cc
        database/quantum.h
        database/quantum.def
)

# 查找并引用sqlite3
find_package(unofficial-sqlite3 CONFIG REQUIRED)
target_link_libraries(quantum_native PRIVATE unofficial::sqlite3::sqlite3)

# 查找并引用日志库
find_package(spdlog CONFIG REQUIRED)
target_link_libraries(quantum_native PRIVATE spdlog::spdlog)

if (APPLE)
    message("configure for Apple")
    set_target_properties(quantum_native PROPERTIES
            FRAMEWORK TRUE
            FRAMEWORK_VERSION A
            VERSION ${PROJECT_VERSION}
            SOVERSION 1
            PUBLIC_HEADER "quantum.h"
            OUTPUT_NAME "quantum_native"
            XCODE_ATTRIBUTE_CODE_SIGN_IDENTITY "iPhone Developer"
            MACOSX_BUNDLE TRUE)
endif ()

set_target_properties(quantum_native PROPERTIES
        VERSION ${PROJECT_VERSION}
        SOVERSION 1
        PUBLIC_HEADER quantum.h
        OUTPUT_NAME "quantum_native")

target_compile_definitions(quantum_native PUBLIC DART_SHARED_LIB)

install(TARGETS quantum_native
        RUNTIME_DEPENDENCY_SET quantum_dependencies
        DESTINATION lib)
install(RUNTIME_DEPENDENCY_SET quantum_dependencies)

add_executable(quantum_main database/main.cc)
add_dependencies(quantum_main quantum_native)
target_link_libraries(quantum_main quantum_native)