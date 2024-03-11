const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // experimental: {
  //   esmExternals: true,
  //   webpackBuildWorker: true,
  // },
  reactStrictMode: true,
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

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig)