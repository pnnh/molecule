import {$} from 'zx'

async function buildNextjs () {
  await $`pwd`
  await $`ls -al`
  await $`npm install`
  await $`npm run build`
}

// 构建并推送Docker镜像
export async function buildDocker (imageName) {
  await $`pwd`

  // 构建镜像
  const buildCmd = $`docker build -t ${imageName} -f Dockerfile .`
  await buildCmd
}

// 重启指定的容器
export async function restartContainerPort (containerName, imageName, nodePort, containerPort) {
  await $`docker rm -f ${containerName}`
  await $`docker run -d --restart=always 
    --name ${containerName} 
    -p ${nodePort}:${containerPort}
    -v /opt/services/multiverse/web/runtime:/runtime
    ${imageName}`
}

//=========================开始构建===================================//

await buildNextjs()

const containerName = 'multiverse-web'

await buildDocker(containerName)

// 在jenkins中执行时自动重启容器
if (typeof process.env.BUILD_ID !== 'undefined') {
  await restartContainerPort(containerName, containerName, 8000, 8000)
}
