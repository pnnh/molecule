cmake_minimum_required(VERSION 3.22)
project(pulsar-messaging C CXX)

# 设置语言标准
set(CMAKE_C_STANDARD 17)
set(CMAKE_C_STANDARD_REQUIRED ON)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
# 设置开启显示详细的构建过程
set(CMAKE_VERBOSE_MAKEFILE ON)

# 查找并设置ccache
find_program(CCACHE_PROGRAM ccache)
if(CCACHE_PROGRAM)
    set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE "${CCACHE_PROGRAM}")
endif()

# 设置全局的头文件目录
include_directories("src")
include_directories("/opt/include")
# 设置全局的链接目录
link_directories("/opt/lib")
# 设置cmake查找目录
set(CMAKE_PREFIX_PATH "/opt/lib/cmake;${CMAKE_PREFIX_PATH}")

# 设置启用vcpkg包管理工具
# message(STATUS "VCPKG: ${VCPKG}/scripts/buildsystems/vcpkg.cmake")
include(${VCPKG}/scripts/buildsystems/vcpkg.cmake)

# 设置生成clangd compile_commands.json文件，方便开发过程
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_executable(kepler
        src/services/config/aws/init.cpp
        src/services/config/aws/init.h
        src/main.cpp
        src/server/http_connection.cpp
        src/server/state.cpp
        src/utils/md5.cpp
        src/server/handlers/index.cpp
        src/server/handlers/index.h
        src/utils/mime.h src/utils/mime.cpp
        src/services/markdown/markdown.cpp
        src/services/markdown/mdtransform.hpp
        src/services/markdown/markdown.h
        src/services/config/aws/appconfig.cpp
        src/services/config/aws/appconfig.h
        src/services/database/postgresql/pq.cpp
        src/services/database/postgresql/pq.h
        src/services/database/postgresql/init.cpp
        src/services/database/postgresql/init.h
        src/server/handlers/sitemap.cpp
        src/server/handlers/sitemap.h
        src/models/article.cpp
        src/models/article.h
        src/utils/datetime.cpp
        src/utils/datetime.h)

find_package(PkgConfig REQUIRED)
find_package(ZLIB)

# 查找并引用Boost库
set(Boost_NO_WARN_NEW_VERSIONS 1)
find_package(Boost COMPONENTS system thread REQUIRED)
# if (Boost_FOUND)
#     #message(STATUS "Found Boost: ${FOLLY_LIBRARIES}")
#     INCLUDE_DIRECTORIES(${Boost_INCLUDE_DIRS})
#     LINK_LIBRARIES(${Boost_LIBRARIES})
# endif (Boost_FOUND)
target_link_libraries(kepler PRIVATE ${Boost_LIBRARIES})

# 查找并引用folly库
find_package(folly REQUIRED)
# if (folly_FOUND)
#     message(STATUS "Found folly: ${FOLLY_LIBRARIES}")
#     INCLUDE_DIRECTORIES(${folly_INCLUDE_DIRS})
#     LINK_LIBRARIES(${FOLLY_LIBRARIES}) 
# endif (folly_FOUND)
target_link_libraries(kepler PRIVATE ${FOLLY_LIBRARIES})

# 查找并引用AWSSDK
find_package(AWSSDK REQUIRED COMPONENTS s3 appconfig appconfigdata)
target_link_libraries(kepler PRIVATE ${AWSSDK_LINK_LIBRARIES} ${AWSSDK_PLATFORM_DEPS})

# 查找并引用Postgresql库
find_library(PQXX_LIB pqxx)
find_library(PQ_LIB pq)
target_link_libraries(kepler PRIVATE ${PQXX_LIB} ${PQ_LIB})
 
# 查找并引用日志库
find_package(spdlog CONFIG REQUIRED) 
target_link_libraries(kepler PRIVATE spdlog::spdlog)

# 查找并链接Markdown解析库
find_library(MultiMarkdown_LIB NAMES MultiMarkdown)
target_link_libraries(kepler PRIVATE ${MultiMarkdown_LIB})

# 查找并链接模板库
find_package(inja CONFIG REQUIRED)
target_link_libraries(kepler PRIVATE pantor::inja)
# 查找JSON库
find_package(nlohmann_json CONFIG REQUIRED)
target_link_libraries(kepler PRIVATE nlohmann_json::nlohmann_json)

# 查找Qt库，使用部分特性
find_package(Qt6 REQUIRED COMPONENTS Xml)
target_link_libraries(kepler PRIVATE Qt6::Xml)

# 拷贝资源文件到二进制目录，方便调试
file(COPY assets DESTINATION ${CMAKE_BINARY_DIR})

# 设置安装目标，及目标依赖库
install(TARGETS kepler
RUNTIME_DEPENDENCY_SET kepler_dependencies)
install(RUNTIME_DEPENDENCY_SET kepler_dependencies)  