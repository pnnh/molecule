const path = require('path')
const bundleAnalyzerPlugin = require('@next/bundle-analyzer')


/** @type {import('next').NextConfig} */
let nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
    outputFileTracingIncludes: {
      '/': [
        './workspaces/polaris-wasm/polaris-wasm.wasm'
      ]
    }
  },
  webpack: function (config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
  transpilePackages: ['polaris-wasm-browser', 'polaris-wasm-server'],
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