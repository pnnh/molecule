add_executable(pulsar-server 
    main.cpp
    src/process.cpp
    src/process.h)

# 查找并引用Boost库
find_package(Boost COMPONENTS system thread REQUIRED)
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

# 拷贝资源文件到二进制目录，方便调试
file(COPY assets DESTINATION ${CMAKE_BINARY_DIR})

# ADD_SUBDIRECTORY(server)
# add_subdirectory(oatpp)

