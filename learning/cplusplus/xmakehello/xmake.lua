add_requires("spdlog")
--add_requires("multimarkdown")

target("xmakehello")
    set_kind("binary")
    add_files("*.cpp")
    add_packages("spdlog")