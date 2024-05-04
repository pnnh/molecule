add_library(pulsar-server-lib STATIC
    process.cpp
    process.h
    router.cpp
    router.h
    controllers/article.cpp
    controllers/article.h
    controllers/sitemap.cpp
    controllers/sitemap.h
    models/codes.cpp
    models/codes.h
    models/article.cpp
    models/article.h
    services/config/appconfig.cpp
    services/config/appconfig.h
    services/business/article.cpp
    services/business/article.h)

# 查找并引用Boost库
find_package(Boost COMPONENTS system thread chrono filesystem url REQUIRED) 
target_include_directories(pulsar-server-lib PRIVATE ${Boost_INCLUDE_DIRS})
target_link_libraries(pulsar-server-lib PRIVATE ${Boost_LIBRARIES})

# 查找Workflow库，实现HTTP服务
set(WORKFLOW_BUILD_STATIC_RUNTIME ON)
find_library(workflow_lib workflow)
target_link_libraries(pulsar-server-lib PRIVATE ${workflow_lib})

# 查找并引用folly库
find_package(folly REQUIRED)
target_link_libraries(pulsar-server-lib PRIVATE ${FOLLY_LIBRARIES})

# 查找并引用Postgresql库
find_library(PQXX_LIB pqxx)
target_link_libraries(pulsar-server-lib PRIVATE ${PQXX_LIB})

# 查找并引用日志库
find_library(spdlog_lib spdlog)
target_link_libraries(pulsar-server-lib PRIVATE ${spdlog_lib})

# 查找JSON库
find_package(nlohmann_json CONFIG REQUIRED)
target_link_libraries(pulsar-server-lib PRIVATE nlohmann_json::nlohmann_json)

# 查找并链接模板库
find_package(inja CONFIG REQUIRED)
target_link_libraries(pulsar-server-lib PRIVATE pantor::inja)

# 查找并引用env解析库
find_package(libenvpp CONFIG REQUIRED)
target_include_directories(pulsar-server-lib PRIVATE /opt/include)
target_link_libraries(pulsar-server-lib PRIVATE libenvpp::libenvpp)

# 查找并引用日期库
find_package(date CONFIG REQUIRED)
target_link_libraries(pulsar-server-lib PRIVATE date::date-tz)

add_executable(pulsar-server main.cpp)
 
# 拷贝资源文件到二进制目录，方便调试
file(COPY assets DESTINATION ${CMAKE_CURRENT_BINARY_DIR})

# 查找并引用日志库
find_package(spdlog CONFIG REQUIRED)
target_link_libraries(pulsar-server PRIVATE spdlog::spdlog)

# 引用公共库
target_link_libraries(pulsar-server-lib PRIVATE pulsar-common)
target_link_libraries(pulsar-server PRIVATE pulsar-server-lib)

# 配置安装内容
install(TARGETS pulsar-server
        RUNTIME_DEPENDENCY_SET pulsar-server-dependencies
        DESTINATION lib)
install(RUNTIME_DEPENDENCY_SET pulsar-server-dependencies)

add_subdirectory(tests)