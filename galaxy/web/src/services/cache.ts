import {createClient, RedisClientType} from 'redis' 
import { loadServerConfig } from './server/config'


class CacheStore {
  redisClient: unknown

  async getCacheStore () {
    const serverConfig = await loadServerConfig()
    if (!serverConfig || !serverConfig.REDIS) {
      throw new Error('REDIS未配置')
    }
     
    if (this.redisClient) {
      return this.redisClient
    }
    const redisClient = createClient({
      url: serverConfig.REDIS,
      password: serverConfig.REDIS_PASSWORD
    })
    await redisClient.connect()

    this.redisClient = redisClient

    return this.redisClient

  }

  async get (key: string): Promise<string | null> {
    const redisClient = await this.getCacheStore() as RedisClientType

    return await redisClient.get(key)
  }

  async setExAt (key: string, value: string, timestamp: number) {
    const redisClient = await this.getCacheStore() as RedisClientType

    return await redisClient.set(key, value, {EXAT: timestamp})
  }

  async setEx (key: string, value: string, timestamp: number) {
    const redisClient = await this.getCacheStore() as RedisClientType

    return await redisClient.set(key, value, {EXAT: timestamp})
  }
}

export const appCache = new CacheStore()
