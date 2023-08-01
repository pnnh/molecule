import {createClient, RedisClientType} from 'redis'

import AwaitLock from 'await-lock'
import {serverConfig} from '@/services/server/config'

class CacheStore {
  lock: AwaitLock
  redisClient: unknown

  constructor () {
    this.lock = new AwaitLock()
  }

  async getCacheStore () {
    await this.lock.acquireAsync()
    try {
      if (this.redisClient) {
        return this.redisClient
      }
      const redisClient = createClient({
        url: serverConfig.REDIS,
        password: serverConfig.REDIS_PASSWORD,
      })

      await redisClient.connect()

      this.redisClient = redisClient

      return this.redisClient

    } finally {
      this.lock.release()
    }
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
