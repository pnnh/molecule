import { $ } from 'zx'

async function buildApp() {
    await $`pwd`

    let output = await $`npm run build`

    console.log('branch', output.stdout)
    return output
}

async function buildDocker() {
    await $`pwd`

    const { default: pkg } = await import('./package.json', { assert: { type: 'json' } })
    console.log('pkg version', pkg.version)

    await $`sudo docker build -f Dockerfile -t galaxy-agent .`
    const imageUrl = `harbor.galaxyteam.pro/infrastructure/galaxy-agent:${pkg.version}`
    await $`sudo docker tag galaxy-agent:latest ${imageUrl}`
    await $`sudo docker push ${imageUrl}`

    return imageUrl
}

//====================开始构建与推送=======================//

// 构建Nextjs应用程序
await buildApp()
// 构建并推送Docker镜像
await buildDocker()

// 在jenkins中执行时自动重启容器
if (typeof process.env.BUILD_ID !== 'undefined') {
    await $`sudo docker rm -f galaxy-agent`
    await $`sudo docker run -d --restart --name galaxy-agent -p 8001:8001 galaxy-agent`
}
