package("multimarkdown")

    set_homepage("https://github.com/fletcher/MultiMarkdown-6")
    set_description("Lightweight markup processor to produce HTML, LaTeX, and more.")

    set_urls("https://github.com/fletcher/MultiMarkdown-6/archive/$(version).zip",
             "https://github.com/fletcher/MultiMarkdown-6.git")
    add_versions("6.6.0", "b384b8cb04ce1b78bac9c8e610442dd4eba283855d3e594e083753bed29eca6b")

    on_load(function (package)
        if package:version():ge("6.0.0") then
            package:add("deps", "cmake")
        end
    end)

    on_install(function (package)
        local configs = {"-DCMAKE_BUILD_TYPE=Release", "-G Ninja", "-DSHAREDBUILD=ON"}
        import("package.tools.cmake").install(package, configs)
    end)

    on_test(function (package)
        assert(package:has_cfuncs("mmd_string_convert(\"\",1,1,1)", {includes = "libMultiMarkdown/libMultiMarkdown.h", configs = {languages = "c11"}}))
    end)