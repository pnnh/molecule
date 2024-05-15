def _foo_binary_impl(ctx):
    print("分析", ctx.label)
    out = ctx.actions.declare_file(ctx.label.name)
    ctx.actions.write(
        output = out,
        content = "Hello {}!\n".format(ctx.attr.username),
    )
    return [DefaultInfo(files = depset([out]))]

foo_binary = rule(
    implementation = _foo_binary_impl,
    attrs = {
        "username": attr.string(),
    }
)

def _tpl_binary_impl(ctx):
    out = ctx.actions.declare_file(ctx.label.name + ".cc")
    ctx.actions.expand_template(
        output = out,
        template = ctx.file.template,
        substitutions = {"NAME": ctx.attr.username},
    )
    return [DefaultInfo(files = depset([out]))]

# 模板可执行目标，测试目的
tpl_binary = rule(
    implementation = _tpl_binary_impl,
    attrs = {
        "username": attr.string(default = "unknown person"),
        "template": attr.label(
            allow_single_file = [".cc.tpl"],
            mandatory = True,
        )
    }
)

print("bzl file evalution")