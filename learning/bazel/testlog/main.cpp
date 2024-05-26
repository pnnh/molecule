
extern "C"
{
#include <stdio.h>
}

#include <spdlog/spdlog.h>

int main()
{
    printf("%s", "hello\n");
    spdlog::info("i love c++");

    std::string mark_text = "# one\nhello\n## two";
    spdlog::info("mark_text: {}", mark_text);
}