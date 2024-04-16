const path = require('path')
const bundleAnalyzerPlugin = require('@next/bundle-analyzer')


/** @type {import('next').NextConfig} */
let nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
  //transpilePackages: ['pulsar-web'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'polaris.huable.dev'
      },
      {
        protocol: 'https',
        hostname: 'polaris.huable.xyz'
      },
      {
        protocol: 'https',
        hostname: 'static.huable.dev'
      },
      {
        protocol: 'https',
        hostname: 'static.huable.xyz'
      }
    ]
  },
  compress: process.env.ENV === 'production',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}

// 使用bundleAnalyzer插件
nextConfig = bundleAnalyzerPlugin({
  enabled: process.env.ANALYZE === 'true'
})(nextConfig)

// 导出nextjs配置
module.exports = nextConfig