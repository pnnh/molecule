const path = require('path')
const fs = require('fs')

function loadConfig () {
  const configData = fs.readFileSync('config.json').toString()
  //console.log('configJson', configJson)
  return JSON.parse(configData)
}

const configJson = loadConfig()


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
  },
  async rewrites () {
    return [
      // {
      //   source: '/server/:path*',
      //   destination: serverUrl + '/server/:path*',
      // },
      {
        source: '/.well-known/:path*',
        destination: configJson.SERVER + '/.well-known/:path*',
      },
      // {
      //   source: '/resource/:path*',
      //   destination: resourceServerUrl + '/resource/:path*',
      // },
      {
        source: '/data/:path*',
        destination: configJson.RESOURCE_SERVER + '/data/:path*',
      },
    ]
  },
}

module.exports = nextConfig
 
