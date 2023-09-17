const serverConfig = {
  ENV: 'production',
  SELF_URL: 'https://portal.huable.com',
  SERVER: 'https://teleport.huable.com',
  RESOURCE_SERVER: 'https://fields.huable.com',
  AES_KEY: 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3',
  AES_IV: 'cwVPn3yX3sp6Bbj0',
  REDIS: 'redis://127.0.0.1:6379/3',
  REDIS_PASSWORD: 'AS7xQsqVzbHMMK5',
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
  
