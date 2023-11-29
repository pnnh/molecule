import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { CategoryModel } from '@/models/category'
import { getAccessToken } from '@/services/auth'
import { loadServerConfig } from '@/services/server/config'

export class CategoryServerPresenter {
  static async selectModels (page: number, size: number): Promise<PLSelectResult<CategoryModel>> {
    const accessToken = await getAccessToken()

    if (!accessToken) {
      throw new Error('not login')
    }

    let offset = (page - 1) * size
    if (offset < 0) {
      offset = 0
    }
    const serverConfig = await loadServerConfig()
    const response = await axios.get<PLSelectResult<CategoryModel>>(
      serverConfig.SERVER + '/categories/select',
      {
        params: { offset, limit: size },
        headers: { Authorization: accessToken },
        withCredentials: true
      })
    return response.data
  }

  // 查询公开的分类列表
  static async selectModelsPublic (page: number, size: number): Promise<PLSelectResult<CategoryModel>> {
    let offset = (page - 1) * size
    if (offset < 0) {
      offset = 0
    }
    const serverConfig = await loadServerConfig()
    const response = await axios.get<PLSelectResult<CategoryModel>>(
      serverConfig.SERVER + '/categories/select/public',
      {
        params: { offset, limit: size },
        withCredentials: true
      })
    return response.data
  }

  static async getModel (pk: string): Promise<CategoryModel> {
    const accessToken = await getAccessToken()

    if (!accessToken) {
      throw new Error('not login')
    }

    const serverConfig = await loadServerConfig()
    const url = serverConfig.SERVER + '/categories/' + pk
    const response = await axios.get<CategoryModel>(
      url,
      {
        headers: { Authorization: accessToken },
        withCredentials: true
      })
    return response.data
  }
}
