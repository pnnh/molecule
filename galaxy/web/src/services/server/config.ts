import 'server-only'
import path from 'path'
import fs from 'fs'

export interface IServerConfig {
  ENV: string,
  SERVER: string,
  AES_KEY: string,
  AES_IV: string,
  REDIS: string,
  REDIS_PASSWORD: string,
  AUTH_SERVER: string,
  SELF_URL: string, 
  ClientId: string,
  ClientSecret: string
}

export async function loadServerConfig (): Promise<IServerConfig> {
  let configPath = process.env.ENV ? `./runtime/config.${process.env.ENV}.json` : './runtime/config.json'
    
  if (!path.isAbsolute(configPath)) {
    configPath = path.join(process.cwd(), configPath)
  }
  
  const fileContent = fs.readFileSync(configPath, 'utf8')
    
  return JSON.parse(fileContent) as IServerConfig
}

