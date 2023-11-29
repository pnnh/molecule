import genServerConfig from 'gen/config.server'

const serverConfig = genServerConfig as {
  SERVER: string,
  AES_KEY: string,
  AES_IV: string,
  REDIS: string,
  REDIS_PASSWORD: string,
  AUTH_SERVER: string,
  SELF_URL: string,
}

export {serverConfig}
