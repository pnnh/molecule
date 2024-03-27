# 添加测试可执行程序
add_executable(pulsar-server-test main.cpp)

# 引用公共库
target_link_libraries(pulsar-server-test PRIVATE pulsar-common)
target_link_libraries(pulsar-server-test PRIVATE pulsar-server-lib)

# 添加测试用例
add_test(NAME pulsar-server-test COMMAND pulsar-server-test)