const path = require('path')

const { generateConfig } = require('./compile/generate')

console.log(`process.env.ENV: ${process.env.ENV}\n`)

// 生成运行时配置信息
generateConfig()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'portal.huable.com'
      },
      {
        protocol: 'https',
        hostname: 'portal.huable.xyz'
      },
      {
        protocol: 'https',
        hostname: 'static.huable.com'
      },
      {
        protocol: 'https',
        hostname: 'static.huable.xyz'
      }
    ]
  },
  compress: process.env.ENV === 'production',
  compiler: {
    removeConsole: process.env.ENV === 'production'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
 
module.exports = withBundleAnalyzer(nextConfig)
