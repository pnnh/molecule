interface IServerConfig {
    NEXT_PUBLIC_SERVER: string,
    AES_KEY: string,
    AES_IV: string,
    REDIS: string,
    REDIS_PASSWORD: string,
    NEXT_PUBLIC_SELF_URL: string,
    NEXT_PUBLIC_AUTH_SERVER: string,
    ClientId: string,
    ClientSecret: string,
}

export const serverConfig = {
    NEXT_PUBLIC_SERVER: process.env.SERVER,
    AES_KEY: process.env.AES_KEY,
    AES_IV: process.env.AES_IV,
    REDIS: process.env.REDIS,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    NEXT_PUBLIC_SELF_URL: process.env.SELF_URL,
    NEXT_PUBLIC_AUTH_SERVER: process.env.AUTH_SERVER,
    ClientId: process.env.ClientId,
    ClientSecret: process.env.ClientSecret
} as IServerConfig