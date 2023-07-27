import genServerConfig from 'gen/config.server'

const serverConfig = genServerConfig as {
    ENV: string,
    SELF_URL: string,
    SERVER: string,
    RESOURCE_SERVER: string,
    AES_KEY: string,
    AES_IV: string
}

export {serverConfig}
