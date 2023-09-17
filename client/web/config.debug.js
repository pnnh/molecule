const serverConfig = {
  ENV: 'development',
  SELF_URL: 'https://portal.huable.xyz',
  SERVER: 'https://teleport.huable.xyz',
  RESOURCE_SERVER: 'https://fields.huable.xyz', 
  AES_KEY: 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3',
  AES_IV: 'cwVPn3yX3sp6Bbj0', 
  REDIS: 'redis://127.0.0.1:6379/0',
  REDIS_PASSWORD: 'AS7xQsqVzbHMMK5',
  AUTH_SERVER: 'https://teleport.huable.xyz',
}
    
const clientConfig = {
  SERVER: 'https://teleport.huable.xyz',
  SELF_URL: 'https://portal.huable.xyz',
  AUTH_SERVER: 'https://teleport.huable.xyz',
}
    
module.exports = {
  serverConfig,
  clientConfig
}
    
  
