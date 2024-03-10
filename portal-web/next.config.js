const path = require('path')

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
        hostname: 'portal.calieo.xyz'
      },
      {
        protocol: 'https',
        hostname: 'portal.calieo.dev'
      },
      {
        protocol: 'https',
        hostname: 'static.huable.xyz'
      },
      {
        protocol: 'https',
        hostname: 'static.huable.dev'
      }
    ]
  },
  compress: process.env.NODE_ENV === 'production',
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
