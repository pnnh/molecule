def _makerule_impl(ctx):
    output = ctx.outputs.out

    options = [
        "go",
        "build",
        "-o", output.path,
        "makerule/main.go",
    ]

    command = " ".join(options)

    envs = [
        "CGO_ENABLED=0",
        "GOPATH=${TMPDIR}/gopath",
        "GOCACHE=${TMPDIR}/gocache",
    ]

    command = " ".join(envs) + " " + command

    ctx.actions.run_shell(
        outputs = [output],
        inputs = ctx.files.srcs,
        command = command,
        use_default_shell_env = True,
    )

    return [DefaultInfo(
        files = depset([output]),
    )]

makerule = rule(
    implementation = _makerule_impl,
    attrs = {
        "srcs": attr.label_list(allow_files = True),
        "out": attr.output(mandatory = True),
    },
)
