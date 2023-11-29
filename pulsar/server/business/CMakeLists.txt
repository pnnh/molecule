cmake_minimum_required(VERSION 3.25)
project(pulsar-business C CXX)

# 设置语言标准
set(CMAKE_C_STANDARD 23)
set(CMAKE_C_STANDARD_REQUIRED ON)
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
# 设置开启显示详细的构建过程
set(CMAKE_VERBOSE_MAKEFILE ON)

# 查找并设置ccache
find_program(CCACHE_PROGRAM ccache)
if (CCACHE_PROGRAM)
    set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE "${CCACHE_PROGRAM}")
endif ()

# 设置全局的头文件目录
include_directories("src")
include_directories("/opt/include")
# 设置全局的链接目录
link_directories("/opt/lib")
# 设置cmake查找目录
set(CMAKE_PREFIX_PATH "/opt/lib/cmake;${CMAKE_PREFIX_PATH}")

# 设置生成clangd compile_commands.json文件，方便开发过程
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# file(GLOB_RECURSE SOURCES src/*.*)
# add_executable(pulsar ${SOURCES})


add_executable(pulsar-business src/main.cpp)
# 查找Workflow库，实现HTTP服务
find_library(workflow_lib workflow)
target_link_libraries(pulsar-business PRIVATE ${workflow_lib})

# find_package(PkgConfig REQUIRED)
# find_package(ZLIB)

# # 查找并引用Boost库
# set(Boost_NO_WARN_NEW_VERSIONS 1)
# find_package(Boost COMPONENTS system thread REQUIRED)
# target_link_libraries(pulsar PRIVATE ${Boost_LIBRARIES})

# # 查找并引用folly库
# find_package(folly REQUIRED)
# target_link_libraries(pulsar PRIVATE ${FOLLY_LIBRARIES})

# # 查找并引用Postgresql库
# #find_package(PostgreSQL REQUIRED)
# #target_link_libraries(pulsar PRIVATE PostgreSQL::PostgreSQL)
# find_library(PQXX_LIB pqxx)
# # find_package(libpqxx REQUIRED)
# # target_link_libraries(pulsar PRIVATE libpqxx::pqxx)

# # 查找并链接Markdown解析库
# find_library(MultiMarkdown_LIB NAMES MultiMarkdown)
# target_link_libraries(pulsar PRIVATE ${MultiMarkdown_LIB})

# # 查找并引用日志库
find_package(spdlog CONFIG REQUIRED)
target_link_libraries(pulsar-business PRIVATE spdlog::spdlog)

# # 查找JSON库
# find_package(nlohmann_json CONFIG REQUIRED)
# target_link_libraries(pulsar PRIVATE nlohmann_json::nlohmann_json)

# # 查找并链接模板库
# # find_package(inja CONFIG REQUIRED)
# # target_link_libraries(pulsar PRIVATE pantor::inja)

# # 查找Qt库，使用部分特性
# find_package(Qt6 REQUIRED COMPONENTS Xml)
# target_link_libraries(pulsar PRIVATE Qt6::Xml)

# # 拷贝资源文件到二进制目录，方便调试
# # file(COPY assets DESTINATION ${CMAKE_BINARY_DIR})

# # 设置安装目标，及目标依赖库
# install(TARGETS pulsar
#         RUNTIME_DEPENDENCY_SET pulsar_dependencies)
# install(RUNTIME_DEPENDENCY_SET pulsar_dependencies)

# ADD_SUBDIRECTORY(server)
# add_subdirectory(oatpp)

