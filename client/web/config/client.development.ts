export const clientConfig = {
  SERVER: 'https://portal.huable.xyz/authorize',
  SELF_URL: 'https://portal.huable.xyz',
  AUTH_SERVER: 'https://portal.huable.xyz/authorize',
  SIGN: {
    PASSWORD: {
      ENABLE: true,
    },
    WEBAUTHN: {
      ENABLE: true,
    },
    EMAIL: {
      ENABLE: true,
    },
  },
  products: {
    polaris: {
      title: '北极星',
      url: 'https://polaris.huable.xyz',
    },
    venus: {
      title: '启明星',
      url: 'https://venus.huable.xyz',
    }
  }
}
