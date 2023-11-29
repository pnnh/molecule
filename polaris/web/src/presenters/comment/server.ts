import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { CommentModel } from '@/models/comment'
import { getAccessToken } from '@/services/auth'
import { loadServerConfig } from '@/services/server/config'

export class CommentServerPresenter {
  static async selectModels (page: number, size: number): Promise<PLSelectResult<CommentModel>> {
    const accessToken = await getAccessToken()

    if (!accessToken) {
      throw new Error('not login')
    }

    let offset = (page - 1) * size
    if (offset < 0) {
      offset = 0
    }
    const serverConfig = await loadServerConfig()
    const response = await axios.get<PLSelectResult<CommentModel>>(
      serverConfig.SERVER + '/comments/select',
      {
        params: { offset, limit: size },
        headers: { Authorization: accessToken },
        withCredentials: true
      })
    return response.data
  }

  // 查询公开的分类列表
  static async selectModelsPublic (page: number, size: number): Promise<PLSelectResult<CommentModel>> {
    let offset = (page - 1) * size
    if (offset < 0) {
      offset = 0
    }
    const serverConfig = await loadServerConfig()
    const response = await axios.get<PLSelectResult<CommentModel>>(
      serverConfig.SERVER + '/comments/select/public',
      {
        params: { offset, limit: size },
        withCredentials: true
      })
    return response.data
  }

  static async getModel (pk: string): Promise<CommentModel> {
    const accessToken = await getAccessToken()

    if (!accessToken) {
      throw new Error('not login')
    }

    const serverConfig = await loadServerConfig()
    const url = serverConfig.SERVER + '/comments/' + pk
    const response = await axios.get<CommentModel>(
      url,
      {
        headers: { Authorization: accessToken },
        withCredentials: true
      })
    return response.data
  }
}
