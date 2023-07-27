const fs = require('fs')
const path = require('path')

function writeClientConfig (config, filePath) {
  const configContent = `
//if (typeof window === 'undefined') throw new Error('This file can only be used in the browser!')
const config = ${JSON.stringify(config, null, 2)}
export default config`
  fs.writeFileSync(filePath, configContent, {
    encoding: 'utf8',
    flag: 'w'
  })
}

function writeServerConfig (config, filePath) {
  const configContent = `
if (typeof window !== 'undefined' || !process.env) throw new Error('This file can only be used in the server!')
const config = ${JSON.stringify(config, null, 2)}
export default config`
  fs.writeFileSync(filePath, configContent, {
    encoding: 'utf8',
    flag: 'w'
  })
}

function generateConfig () {
  let configFile = process.env.config ? process.env.config : './config.js'
  if (!path.isAbsolute(configFile)) {
    configFile = path.join(process.cwd(), configFile)
  }

  const config = require(configFile)
  const dir = path.join(process.cwd(), 'gen')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  writeServerConfig(config.serverConfig, `${dir}/config.server.js`)
  writeClientConfig(config.clientConfig, `${dir}/config.client.js`)
}


module.exports = {
  generateConfig
}
