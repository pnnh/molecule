import genConfig from 'gen/config.client'

const clientConfig = genConfig as {
  SERVER: string,
  SELF_URL: string,
  AUTH_SERVER: string,
  SIGN: {
    PASSWORD: {
      ENABLE: boolean,
    },
    EMAIL: {
      ENABLE: boolean,
    },
    WEBAUTHN: {
      ENABLE: boolean,
    },
  }
}

export {clientConfig}
