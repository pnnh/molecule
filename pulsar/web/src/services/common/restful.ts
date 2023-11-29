
import axios from '~/axios/index' 

export class RestfulService {
    baseUrl: string
    model: string

    constructor (baseUrl: string, model: string) {
      this.baseUrl = baseUrl
      this.model = model
    }

    getModelUrl (id: number): string {
      return `/${this.baseUrl}/${this.model}/${id}`
    }

    selectModelsUrl (): string {
      return `/${this.baseUrl}/${this.model}`
    }

    insertModelUrl (): string {
      return `/${this.baseUrl}/${this.model}`
    }

    updateModelUrl (id: number): string {
      return `/${this.baseUrl}/${this.model}/${id}`
    }

    deleteModelUrl (id: number): string {
      return `/${this.baseUrl}/${this.model}/${id}`
    }

    async updateModel<T, R> (accessToken: string, id: number, model: T) {
      const url = this.updateModelUrl(id)
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
      const url = this.insertModelUrl()
      const response = await axios.put<R>(
        url, model, {
          headers: {Authorization: accessToken},
          withCredentials: true,
        })
      return response.data
    }
    
    async getModel<R> (accessToken: string, id: number): Promise<R> {
      const url = this.getModelUrl(id)
      const response = await axios.get<R>(
        url, {
          headers: {Authorization: accessToken},
          withCredentials: true,
        })
      return response.data
    }
    
    async selectModels<T> ({accessToken}:{accessToken?: string}) {
      const url = this.selectModelsUrl()
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
  
  
