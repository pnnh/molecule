import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { GroupModel } from '@/models/group'
import { getAccessToken } from '@/services/auth'
import { loadServerConfig } from '@/services/server/config'

export class GroupServerPresenter {
  static async selectModels (page: number, size: number): Promise<PLSelectResult<GroupModel>> {
    const accessToken = await getAccessToken()

    if (!accessToken) {
      throw new Error('not login')
    }

    let offset = (page - 1) * size
    if (offset < 0) {
      offset = 0
    }
    const serverConfig = await loadServerConfig()
    const response = await axios.get<PLSelectResult<GroupModel>>(
      serverConfig.SERVER + '/groups/select',
      {
        params: { offset, limit: size },
        headers: { Authorization: accessToken },
        withCredentials: true
      })
    return response.data
  }

  // 查询公开的分类列表
  static async selectModelsPublic (page: number, size: number): Promise<PLSelectResult<GroupModel>> {
    let offset = (page - 1) * size
    if (offset < 0) {
      offset = 0
    }
    const serverConfig = await loadServerConfig()
    const response = await axios.get<PLSelectResult<GroupModel>>(
      serverConfig.SERVER + '/groups/select/public',
      {
        params: { offset, limit: size },
        withCredentials: true
      })
    return response.data
  }

  static async getModel (pk: string): Promise<GroupModel> {
    const accessToken = await getAccessToken()

    if (!accessToken) {
      throw new Error('not login')
    }

    const serverConfig = await loadServerConfig()
    const url = serverConfig.SERVER + '/groups/' + pk
    const response = await axios.get<GroupModel>(
      url,
      {
        headers: { Authorization: accessToken },
        withCredentials: true
      })
    return response.data
  }
}
