#!/usr/bin/env -S deno run --allow-env --allow-run --allow-read --allow-sys

import 'npm:zx@7.1.1/globals'

// 构建Docker镜像
export async function buildDocker(imageName) {
  await $`pwd`

  const commitId = await $`git rev-parse HEAD`

  let { stdout: dockerFile } = await $`cat Dockerfile`
  dockerFile = dockerFile.replace(/<GIT_COMMIT>/g, commitId.stdout.trim())

  // 构建镜像
  const buildCmd = $`docker build -t ${imageName} -f - .`
  buildCmd.stdin.write(dockerFile)
  buildCmd.stdin.end()
  await buildCmd
}

// 重启指定的容器
export async function restartContainerPort(containerName, imageName, nodePort, containerPort) {
  await $`docker rm -f ${containerName}`
  await $`docker run -d --restart=always --name ${containerName} -p ${nodePort}:${containerPort} ${imageName}`
}

//=========================开始构建===================================//

const containerName = 'multiverse-server'

await buildDocker(containerName)

// 在jenkins中执行时自动重启容器
if (Deno.env.get("BUILD_ID")) {
  await restartContainerPort(containerName, containerName, 8001, 8001)
}