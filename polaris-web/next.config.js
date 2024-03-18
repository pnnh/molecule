const path = require('path')
const stylexPlugin = require('@stylexjs/nextjs-plugin');

const bundleAnalyzerPlugin = require('@next/bundle-analyzer')


/** @type {import('next').NextConfig} */
let nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  loose: true,
  esmExternals: true,
  webpack: function (config, options) {
    config.experiments = { asyncWebAssembly: true, topLevelAwait: true};
    //config.output.webassemblyModuleFilename = "[modulehash].wasm";
    return config;
},
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
        hostname: 'polaris.huable.com'
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
      },
      {
        protocol: 'https',
        hostname: 'static.huable.com'
      }
    ]
  },
  compress: process.env.ENV === 'production',
  compiler: {
    removeConsole: process.env.ENV === 'production'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}

// 使用bundleAnalyzer插件
nextConfig = bundleAnalyzerPlugin({
  enabled: process.env.ANALYZE === 'true'
})(nextConfig)

// 使用stylex插件
nextConfig = stylexPlugin({
  aliases: {
    '@/*': [path.join(__dirname, '*')],
  },
  rootDir: __dirname,
})({});

// 导出nextjs配置
module.exports = nextConfig