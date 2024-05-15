load(":foo.bzl", "foo_binary", "tpl_binary")

print("BUILD file")

foo_binary(
    name = "bin1",
    username = "Alice",
)
foo_binary(name = "bin2")

tpl_binary(
    name = "bin3",
    username = "Alice",
    template = "file.cc.tpl",
)