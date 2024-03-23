add_library(pulsar-common SHARED
        utils/md5.cc
        utils/md5.h
        common.def
)

# 查找并引用日志库
find_package(spdlog CONFIG REQUIRED)
target_link_libraries(pulsar-common PRIVATE spdlog::spdlog)

# 查找并引用Boost库
find_package(Boost COMPONENTS system thread chrono REQUIRED)
target_include_directories(pulsar-common PUBLIC ${Boost_INCLUDE_DIRS})
target_link_libraries(pulsar-common PUBLIC ${Boost_LIBRARIES})

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
        PUBLIC_HEADER "utils/md5.h"
        OUTPUT_NAME "pulsar-common")

install(TARGETS pulsar-common
        RUNTIME_DEPENDENCY_SET pulsar-common-dependencies
        DESTINATION lib)
install(RUNTIME_DEPENDENCY_SET pulsar-common-dependencies)

# 测试程序
add_executable(pulsar-common-test main.cc)
target_link_libraries(pulsar-common-test PRIVATE pulsar-common)

# 添加测试用例
add_test(NAME pulsar-common-test COMMAND pulsar-common-test)