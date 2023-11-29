
import axios from '~/axios/index' 
import { loadServerConfig } from '../server/config'

export class RestfulService {
    model: string

    constructor (model: string) {
      this.model = model
    }

    async baseUrl () {
      const serverConfig = await loadServerConfig()
      const baseUrl = serverConfig.SERVER + '/server'
      return baseUrl
    }
 
    async updateModel<T, R> (accessToken: string, id: number, model: T) {
      const baseUrl = await this.baseUrl()
      const url = `/${baseUrl}/${this.model}/${id}`
      const response = await axios.post<R>(
        url, model, {
          headers: {Authorization: accessToken},
          withCredentials: true,
        })
      return response.data
    }
  
    static async deleteModel<R> (accessToken: string, url: string) {
      const response = await axios.delete<R>(
        url, {
          headers: {Authorization: accessToken},
          withCredentials: true,
        })
      return response.data
    }
    
    async insertModel<T, R> (accessToken: string, model: T) {
      const baseUrl = await this.baseUrl()
      const url = `/${baseUrl}/${this.model}`
      const response = await axios.put<R>(
        url, model, {
          headers: {Authorization: accessToken},
          withCredentials: true,
        })
      return response.data
    }
    
    async getModel<R> (accessToken: string, id: number): Promise<R> {
      const baseUrl = await this.baseUrl()
      const url = `/${baseUrl}/${this.model}/${id}`
      const response = await axios.get<R>(
        url, {
          headers: {Authorization: accessToken},
          withCredentials: true,
        })
      return response.data
    }
    
    async selectModels<T> ({accessToken}:{accessToken?: string}) {
      const baseUrl = await this.baseUrl()
      const url = `/${baseUrl}/${this.model}`
      const response = await axios.get<T>(
        url,
        {
          headers: {Authorization: accessToken},
          withCredentials: true, 
        })
      return response.data
    }
}

export class SyncService {
  async updateFile<T, R> (url: string, data: T, {accessToken}:{accessToken?: string}) {
    const response = await axios.post<R>(
      url, data, {
        headers: {Authorization: accessToken},
        withCredentials: true,
      })
    return response.data
  }

  static async deleteFile<R> (url: string, {accessToken}:{accessToken?: string}) {
    const response = await axios.delete<R>(
      url, {
        headers: {Authorization: accessToken},
        withCredentials: true,
      })
    return response.data
  }
  
  async createFile<T, R> (url: string, data: T, {accessToken}:{accessToken?: string}) { 
    const response = await axios.put<R>(
      url, data, {
        headers: {Authorization: accessToken},
        withCredentials: true,
      })
    return response.data
  }
  
  async readFile<R> (url: string, {accessToken}:{accessToken?: string}) {
    const response = await axios.get<R>(
      url, {
        headers: {Authorization: accessToken},
        withCredentials: true,
      })
    return response.data
  }
}
  
  
