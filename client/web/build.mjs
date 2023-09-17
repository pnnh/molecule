import {$} from 'zx'

// 构建并推送Docker镜像
export async function buildDocker (imageName) {
  await $`pwd`

  const commitId = await $`git rev-parse HEAD`

  let {stdout: dockerFile} = await $`cat Dockerfile`
  dockerFile = dockerFile.replace(/<GIT_COMMIT>/g, commitId.stdout.trim())

  // 构建镜像
  const buildCmd = $`docker build -t ${imageName} -f - .`
  buildCmd.stdin.write(dockerFile)
  buildCmd.stdin.end()
  await buildCmd
}

// 重启指定的容器
export async function restartContainerPort (containerName, imageName, nodePort, containerPort) {
  await $`docker rm -f ${containerName}`
  await $`docker run -d --restart=always --name ${containerName} -p ${nodePort}:${containerPort} ${imageName}`
}

//=========================开始构建===================================//

const containerName = 'venus-web'

await buildDocker(containerName)

// 在jenkins中执行时自动重启容器
if (typeof process.env.BUILD_ID !== 'undefined') {
  await restartContainerPort(containerName, containerName, 8100, 8100)
}
