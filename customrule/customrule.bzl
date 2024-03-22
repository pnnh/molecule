def _customrule_impl(ctx):
    output = ctx.outputs.out

    ctx.actions.run(
        outputs = [output],
        inputs = ctx.files.srcs,
        executable = "touch",
        arguments = [output.path],
    )

    return [DefaultInfo(
        files = depset([output]),
    )]

customrule = rule(
    implementation = _customrule_impl,
    attrs = {
        "srcs": attr.label_list(allow_files = True),
        "out": attr.output(),
    },
)
