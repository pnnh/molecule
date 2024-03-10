import 'server-only'
import axios, { AxiosRequestConfig } from '~/axios/index'
import { CommonUrl, PageUrl } from '../common/curd'

export class ServerService {
  pageUrl: PageUrl
  restfulUrl: CommonUrl
  constructor (entity: string) {
    this.pageUrl = new PageUrl(entity)
    this.restfulUrl = new CommonUrl('server', entity)
  }

  async commonSelect<T> (url: string, model: unknown, authorization?: string) {
    const requestConfig: AxiosRequestConfig = {
      params: model,
      withCredentials: true
    }
    if (authorization) {
      requestConfig.headers = { Authorization: authorization }
    }
    const response = await axios.get<T>(url, requestConfig)
    return response.data
  }

  async getModel<T> (url: string, params?: unknown) {
    const response = await axios.get<T>(
      url, { params })
    return response.data
  }
}
