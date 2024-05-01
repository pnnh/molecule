add_library(pulsar-native SHARED
        database/quantum.cc
        database/quantum.h
        database/quantum.def
)

# 查找并引用sqlite3
find_package(unofficial-sqlite3 CONFIG REQUIRED)
target_link_libraries(pulsar-native PRIVATE unofficial::sqlite3::sqlite3)

# 查找并引用日志库
find_package(spdlog CONFIG REQUIRED)
target_link_libraries(pulsar-native PRIVATE spdlog::spdlog)

if (APPLE)
    message("configure for Apple")
    set_target_properties(pulsar-native PROPERTIES
            FRAMEWORK TRUE
            FRAMEWORK_VERSION A
            VERSION ${PROJECT_VERSION}
            SOVERSION 1 
            OUTPUT_NAME "pulsar-native"
            XCODE_ATTRIBUTE_CODE_SIGN_IDENTITY "iPhone Developer"
            MACOSX_BUNDLE TRUE)
endif ()

set_target_properties(pulsar-native PROPERTIES
        VERSION ${PROJECT_VERSION}
        SOVERSION 1 
        OUTPUT_NAME "pulsar-native")

target_compile_definitions(pulsar-native PUBLIC DART_SHARED_LIB)

install(TARGETS pulsar-native
        RUNTIME_DEPENDENCY_SET pulsar-native-dependencies
        DESTINATION lib)
install(RUNTIME_DEPENDENCY_SET pulsar-native-dependencies)

install(DIRECTORY "${CMAKE_CURRENT_SOURCE_DIR}/"
        DESTINATION include/pulsar/native
        FILES_MATCHING PATTERN "*.h") 

