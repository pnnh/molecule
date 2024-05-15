
extern "C" {
#include <stdio.h>
#include <libMultiMarkdown/libMultiMarkdown.h>
}

#include <spdlog/spdlog.h>

int main() {
    printf("%s", "hello\n");
    spdlog::info("i love c++");

    std::string mark_text = "# one\nhello\n## two";
    char *target = mmd_string_convert(mark_text.c_str(), EXT_COMPLETE,
                                      FORMAT_HTML, ENGLISH);
    printf("target: %s\n", target); 
    free(target);
}