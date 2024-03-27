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
