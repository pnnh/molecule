import 'server-only'

interface IServerConfig {
  ENV: string,
  SERVER: string,
  AES_KEY: string,
  AES_IV: string,
  REDIS: string,
  REDIS_PASSWORD: string,
  SELF_URL: string,
  AUTH_SERVER: string,
  ClientId: string,
  ClientSecret: string,
}

// let serverConfig: IServerConfig | undefined

export async function loadServerConfig (): Promise<IServerConfig> {
  // let configPath = process.env.ENV ? `./runtime/server.${process.env.ENV}.json` : './runtime/server.json'
  //
  // if (!path.isAbsolute(configPath)) {
  //   configPath = path.join(process.cwd(), configPath)
  // }
  //
  // const fileContent = fs.readFileSync(configPath, 'utf8')
  //
  // serverConfig = JSON.parse(fileContent) as IServerConfig
  //
  // return serverConfig

  return {
    ENV: process.env.NODE_ENV,
    SERVER: process.env.SERVER,
    AES_KEY: process.env.AES_KEY,
    AES_IV: process.env.AES_IV,
    REDIS: process.env.REDIS,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    SELF_URL: process.env.SELF_URL,
    AUTH_SERVER: process.env.AUTH_SERVER,
    ClientId: process.env.ClientId,
    ClientSecret: process.env.ClientSecret
  } as IServerConfig
}
