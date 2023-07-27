const path = require('path') 

const {generateConfig} = require('./compile/generate')

// 生成运行时配置信息
generateConfig()


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
    esmExternals: 'loose'
  }, 
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
      topLevelAwait: true,
    }
    config.output.webassemblyModuleFilename =
        options.isServer && !options.dev ? '../static/wasm/[id].wasm' : 'static/wasm/[id].wasm'
    config.optimization.moduleIds = 'named'
    return config
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async rewrites () {
    return [
      // {
      //   source: '/server/:path*',
      //   destination: serverUrl + '/server/:path*',
      // },
      // {
      //   source: '/.well-known/:path*',
      //   destination: configJson.SERVER + '/.well-known/:path*',
      // },
      // {
      //   source: '/resource/:path*',
      //   destination: resourceServerUrl + '/resource/:path*',
      // },
      // {
      //   source: '/data/:path*',
      //   destination: configJson.RESOURCE_SERVER + '/data/:path*',
      // },
    ]
  },
}

module.exports = nextConfig
 
