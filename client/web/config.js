const serverConfig = {
  ENV: 'production',
  SELF_URL: 'https://portal.huable.com',
  SERVER: 'https://teleport.huable.com',
  RESOURCE_SERVER: 'https://fields.huable.com',
  AES_KEY: 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3',
  AES_IV: 'cwVPn3yX3sp6Bbj0',
  REDIS: 'redis://10.0.0.4:6379/0',
  REDIS_PASSWORD: '^P^c&mSVoNgU08o6',
  AUTH_SERVER: 'https://teleport.huable.com',
}
  
const clientConfig = {
  SERVER: 'https://teleport.huable.com',
  SELF_URL: 'https://portal.huable.com',
  AUTH_SERVER: 'https://teleport.huable.com',
}
  
module.exports = {
  serverConfig,
  clientConfig
}
  
