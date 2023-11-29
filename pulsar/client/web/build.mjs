import { $ } from 'zx'

async function buildDocker () {
  await $`pwd`

  const pkg = {
    name: 'pulsar-web',
    version: '0.2.0'
  }

  const commitId = await $`git rev-parse HEAD`

  let { stdout: dockerFile } = await $`cat Dockerfile`
  dockerFile = dockerFile.replace(/<GIT_COMMIT>/g, commitId.stdout.trim())

  // 构建镜像
  const buildCmd = $`sudo docker build -t ${pkg.name} -f - .`
  buildCmd.stdin.write(dockerFile)
  buildCmd.stdin.end()
  await buildCmd 

  if (typeof process.env.BUILD_ID !== 'undefined') {
    // 重启容器
    await restartContainer()
  }
}

async function restartContainer () {
  await $`sudo docker rm -f pulsar-web`
  await $`sudo docker run -d --name pulsar-web -p 6100:6100 pulsar-web`
}

export async function runBuild () {
  // 构建Docker镜像
  await buildDocker()
}

//====================开始构建与推送=======================//

await runBuild()
