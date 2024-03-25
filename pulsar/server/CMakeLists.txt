add_executable(pulsar-server 
    main.cpp
    src/process.cpp
    src/process.h
    src/router.cpp
    src/router.h
    src/controllers/sitemap.cpp
    src/controllers/sitemap.h
    src/models/message.cpp
    src/models/message.h
    src/services/config/appconfig.cpp
    src/services/config/appconfig.h
    src/services/business/message.cpp
    src/services/business/message.h)

# 查找并引用Boost库
find_package(Boost COMPONENTS system thread chrono REQUIRED)
target_include_directories(pulsar-server PRIVATE ${Boost_INCLUDE_DIRS})
target_link_libraries(pulsar-server PRIVATE ${Boost_LIBRARIES})

target_include_directories(pulsar-server PRIVATE src)

# 查找Workflow库，实现HTTP服务
set(WORKFLOW_BUILD_STATIC_RUNTIME ON)
find_library(workflow_lib workflow)
target_link_libraries(pulsar-server PRIVATE ${workflow_lib})

# 查找并引用folly库
find_package(folly REQUIRED)
target_link_libraries(pulsar-server PRIVATE ${FOLLY_LIBRARIES})

# 查找并引用Postgresql库
find_library(PQXX_LIB pqxx)
target_link_libraries(pulsar-server PRIVATE ${PQXX_LIB})

# 查找并引用日志库
find_package(spdlog CONFIG REQUIRED)
target_link_libraries(pulsar-server PRIVATE spdlog::spdlog)

# 查找JSON库
find_package(nlohmann_json CONFIG REQUIRED)
target_link_libraries(pulsar-server PRIVATE nlohmann_json::nlohmann_json)

# 查找并链接模板库
find_package(inja CONFIG REQUIRED)
target_link_libraries(pulsar-server PRIVATE pantor::inja)

# 查找并引用env解析库
find_package(libenvpp CONFIG REQUIRED)
target_link_libraries(pulsar-server PRIVATE libenvpp::libenvpp)

# 查找并引用日期库
find_package(date CONFIG REQUIRED)
target_link_libraries(pulsar-server PRIVATE date::date date::date-tz)

# 拷贝资源文件到二进制目录，方便调试
file(COPY assets DESTINATION ${CMAKE_CURRENT_BINARY_DIR})

# 引用公共库
target_include_directories(pulsar-server PRIVATE ${pulsar-common_INCLUDE_DIRS})
target_link_libraries(pulsar-server PRIVATE pulsar-common)
