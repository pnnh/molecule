const path = require('path')
const fs = require('fs')

function generateConfig () {
  const configFile = process.env.config ? process.env.config : './config.js'

  const config = require(configFile)

  if (!fs.existsSync('./gen')) {
    fs.mkdirSync('./gen')
  }
  const writeConfig = (config, filePath) => {
    const configContent = `const config = ${JSON.stringify(config, null, 2)}
export default config`
    fs.writeFileSync(filePath, configContent, {
      encoding: 'utf8',
      flag: 'w'
    })
  }
  writeConfig(config.serverConfig, './gen/config.server.js')
  writeConfig(config.publicConfig, './gen/config.public.js')
}

generateConfig()


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
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
    removeConsole: false // process.env.NODE_ENV === 'production'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async rewrites () {
    return [
      // {
      //   source: '/server/:path*',
      //   destination: serverUrl + '/:path*',
      // },
    ]
  },
}

module.exports = nextConfig
