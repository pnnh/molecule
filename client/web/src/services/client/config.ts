import genConfig from 'gen/config.client'

const clientConfig = genConfig as {
  SERVER: string,
  SELF_URL: string,
  AUTH_SERVER: string
}

export {clientConfig}
