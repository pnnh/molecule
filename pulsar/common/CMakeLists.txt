add_library(pulsar-common SHARED
        database/quantum.cc
        database/quantum.h
        database/quantum.def
)

# 查找并引用sqlite3
find_package(unofficial-sqlite3 CONFIG REQUIRED)
target_link_libraries(pulsar-common PRIVATE unofficial::sqlite3::sqlite3)

# 查找并引用日志库
find_package(spdlog CONFIG REQUIRED)
target_link_libraries(pulsar-common PRIVATE spdlog::spdlog)

if (APPLE)
    message("configure for Apple")
    set_target_properties(pulsar-common PROPERTIES
            FRAMEWORK TRUE
            FRAMEWORK_VERSION A
            VERSION ${PROJECT_VERSION}
            SOVERSION 1
            PUBLIC_HEADER "quantum.h"
            OUTPUT_NAME "pulsar-common"
            XCODE_ATTRIBUTE_CODE_SIGN_IDENTITY "iPhone Developer"
            MACOSX_BUNDLE TRUE)
endif ()

set_target_properties(pulsar-common PROPERTIES
        VERSION ${PROJECT_VERSION}
        SOVERSION 1
        PUBLIC_HEADER quantum.h
        OUTPUT_NAME "pulsar-common")

target_compile_definitions(pulsar-common PUBLIC DART_SHARED_LIB)

install(TARGETS pulsar-common
        RUNTIME_DEPENDENCY_SET quantum_dependencies
        DESTINATION lib)
install(RUNTIME_DEPENDENCY_SET quantum_dependencies)

add_executable(quantum_main database/main.cc)
add_dependencies(quantum_main pulsar-common)
target_link_libraries(quantum_main pulsar-common)