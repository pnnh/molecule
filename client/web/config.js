const serverConfig = {
  ENV: 'production',
  SELF_URL: 'https://portal.huable.com',
  SERVER: 'https://portal.huable.com/authorize',
  RESOURCE_SERVER: 'https://fields.huable.com',
  AES_KEY: 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3',
  AES_IV: 'cwVPn3yX3sp6Bbj0',
  REDIS: 'redis://10.0.0.4:6379/0',
  REDIS_PASSWORD: '^P^c&mSVoNgU08o6',
  AUTH_SERVER: 'https://portal.huable.com/authorize',
}
  
const clientConfig = {
  SERVER: 'https://portal.huable.com/authorize',
  SELF_URL: 'https://portal.huable.com',
  AUTH_SERVER: 'https://portal.huable.com/authorize',
}
  
module.exports = {
  serverConfig,
  clientConfig
}
  
