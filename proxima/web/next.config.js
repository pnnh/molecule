const path = require('path') 

const { generateConfig } = require('./compile/generate')

console.log(`process.env.ENV: ${process.env.ENV}\n`)

// 生成运行时配置信息
generateConfig()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: 'loose'
  },
  distDir: 'build',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}

module.exports = nextConfig
 
