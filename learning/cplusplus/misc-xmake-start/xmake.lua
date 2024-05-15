add_repositories("proxima xmake")
add_requires("spdlog")
add_requires("multimarkdown")

target("hello")
    set_kind("binary")
    add_files("src/*.cpp")
    add_packages("spdlog")
    add_packages("multimarkdown")