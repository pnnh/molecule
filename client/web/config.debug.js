const serverConfig = {
  ENV: 'development',
  SELF_URL: 'https://portal.huable.xyz',
  SERVER: 'https://portal.huable.xyz/authorize',
  RESOURCE_SERVER: 'https://fields.huable.xyz', 
  AES_KEY: 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3',
  AES_IV: 'cwVPn3yX3sp6Bbj0', 
  REDIS: 'redis://10.1.0.4:6379/0',
  REDIS_PASSWORD: 'AS7xQsqVzbHMMK5',
  AUTH_SERVER: 'https://portal.huable.xyz/authorize',
}

const clientConfig = {
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
  }
}
    
module.exports = {
  serverConfig,
  clientConfig
}
    
  
