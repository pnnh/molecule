interface IServerConfig {
    NEXT_PUBLIC_SERVER: string,
    INTERNAL_SERVER: string,
    AES_KEY: string,
    AES_IV: string,
    NEXT_PUBLIC_SELF_URL: string,
    NEXT_PUBLIC_AUTH_SERVER: string,
    ClientId: string,
    ClientSecret: string,
}

export const serverConfig = {
    NEXT_PUBLIC_SERVER: process.env.NEXT_PUBLIC_SERVER,
    INTERNAL_SERVER: process.env.INTERNAL_SERVER,
    AES_KEY: process.env.AES_KEY,
    AES_IV: process.env.AES_IV,
    NEXT_PUBLIC_SELF_URL: process.env.NEXT_PUBLIC_SELF_URL,
    NEXT_PUBLIC_AUTH_SERVER: process.env.NEXT_PUBLIC_AUTH_SERVER,
    ClientId: process.env.ClientId,
    ClientSecret: process.env.ClientSecret
} as IServerConfig