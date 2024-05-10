#!/usr/bin/env -S deno run --allow-env --allow-run --allow-read --allow-write

import { $, cd } from 'https://deno.land/x/zx_deno/mod.mjs'
await $`date`

console.log('hello deno')

async function buildPolaris() {
    // 构建应用
    await $`ls -la`
    await $`npm install`
    await $`npm run build`
    await $`docker build -t polaris-web -f Dockerfile .`
    
    // 集成环境下重启容器
    await $`docker rm -f polaris-web`
    await $`docker run -d --restart=always \
            --name polaris-web \
            -p 8100:8100 \
            polaris-web`
}

await buildPolaris()