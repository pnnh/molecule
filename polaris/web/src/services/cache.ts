import AwaitLock from 'await-lock'
import { createClient, RedisClientType } from 'redis'
import { loadServerConfig } from './server/config'

class CacheStore {
  lock: AwaitLock
  redisClient: unknown

  constructor () {
    this.lock = new AwaitLock()
  }

  async getCacheStore () {
    await this.lock.acquireAsync()
    try {
      const serverConfig = await loadServerConfig()
      if (this.redisClient) {
        return this.redisClient
      }
      const client = createClient({
        url: serverConfig.REDIS,
        password: serverConfig.REDIS_PASSWORD
      })
      await client.connect()

      this.redisClient = client

      return this.redisClient
    } finally {
      this.lock.release()
    }
  }

  async get (key: string): Promise<string | null> {
    const client = await this.getCacheStore() as RedisClientType
    return await client.get(key)
  }

  async set (key: string, value: string, expire: number): Promise<void> {
    const client = await this.getCacheStore() as RedisClientType
    await client.set(key, value, { EX: expire })
  }

  async setExAt (key: string, value: string, timestamp: number) {
    const redisClient = await this.getCacheStore() as RedisClientType

    return await redisClient.set(key, value, { EXAT: timestamp })
  }

  async setEx (key: string, value: string, timestamp: number) {
    const redisClient = await this.getCacheStore() as RedisClientType

    return await redisClient.set(key, value, { EXAT: timestamp })
  }
}

export const cacheStore = new CacheStore()
