const fs = require('fs')
const path = require('path')

function writeClientConfig (filePath) {
  
  let configPath = process.env.ENV ? `./config/client.${process.env.ENV}.ts` : './config/client.ts'
  
  if (!path.isAbsolute(configPath)) {
    configPath = path.join(process.cwd(), configPath)
  }

  const fileContent = fs.readFileSync(configPath, 'utf8')

  fs.writeFileSync(filePath, fileContent, {
    encoding: 'utf8',
    flag: 'w'
  })
}

function writeServerConfig (filePath) {

  let configPath = process.env.ENV ? `./config/server.${process.env.ENV}.ts` : './config/server.ts'
  
  if (!path.isAbsolute(configPath)) {
    configPath = path.join(process.cwd(), configPath)
  }

  const fileContent = fs.readFileSync(configPath, 'utf8')

  fs.writeFileSync(filePath, fileContent, {
    encoding: 'utf8',
    flag: 'w'
  })
}

function generateConfig () {
  const dir = path.join(process.cwd(), 'gen')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  writeServerConfig(`${dir}/config.server.ts`)
  writeClientConfig(`${dir}/config.client.ts`)
}

module.exports = {
  generateConfig
}
