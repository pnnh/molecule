interface IServerConfig {
    NEXT_PUBLIC_SERVER: string,
    INTERNAL_SERVER: string,
    AES_KEY: string,
    AES_IV: string,
    NEXT_PUBLIC_SELF_URL: string,
    NEXT_PUBLIC_AUTH_SERVER: string,
    CLIENT_ID: string,
    CLIENT_SECRET: string,
    NEXT_PUBLIC_SIGN_PASSWORD: string,
    NEXT_PUBLIC_SIGN_WEBAUTHN: string,
    NEXT_PUBLIC_PORTAL_SERVER: string,
    INITIAL_DOMAINS: string,
}

export const serverConfig = {
    NEXT_PUBLIC_SERVER: process.env.NEXT_PUBLIC_SERVER,
    INTERNAL_SERVER: process.env.INTERNAL_SERVER,
    AES_KEY: process.env.AES_KEY,
    AES_IV: process.env.AES_IV,
    NEXT_PUBLIC_SELF_URL: process.env.NEXT_PUBLIC_SELF_URL,
    NEXT_PUBLIC_AUTH_SERVER: process.env.NEXT_PUBLIC_AUTH_SERVER,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    NEXT_PUBLIC_SIGN_PASSWORD: process.env.NEXT_PUBLIC_SIGN_PASSWORD,
    NEXT_PUBLIC_SIGN_WEBAUTHN: process.env.NEXT_PUBLIC_SIGN_WEBAUTHN,
    NEXT_PUBLIC_PORTAL_SERVER: process.env.NEXT_PUBLIC_PORTAL_SERVER,
    INITIAL_DOMAINS: process.env.INITIAL_DOMAINS,
} as IServerConfig
