import fs from 'fs'

export class RestfulAddress {
  static get ServerUrl () {
    const config = loadConfig()
    //console.log('configJson', serverRuntimeConfig)
    if (isNodejs()) {
      return config.SERVER
    }
    return ''
  }

}

export function isNodejs () {
  return typeof window === 'undefined'
}

export function isBrowser () {
  return typeof window !== 'undefined'
}

export function loadConfig () {
  const configData = fs.readFileSync('config.json').toString()
  return JSON.parse(configData)
}
