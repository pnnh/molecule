const path = require('path') 

const {generateConfig} = require('./compile/generate')

console.log(`process.env.ENV: ${process.env.ENV}\n`)

// 生成运行时配置信息
generateConfig()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // experimental: {
  //   esmExternals: 'loose'
  // }, 
  reactStrictMode: true,
  webpack: function (config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
      topLevelAwait: true,
    }
    return config
  },
  images: {
    domains: ['localhost', 'static.huable.com', 'static.huable.xyz']
  },
  compress: process.env.ENV === 'production',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
}) 
 
module.exports = withBundleAnalyzer(nextConfig)
