import 'server-only'
import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { TagModel } from '@/models/tag'
import { getAccessToken } from '@/services/auth'
import { ServerService } from './server'
import { loadServerConfig } from './config'

export class TagServerService extends ServerService {
  constructor () {
    super('tag')
  }

  async selectModels (page: number, size: number): Promise<PLSelectResult<TagModel>> {
    const accessToken = await getAccessToken()

    if (!accessToken) {
      throw new Error('not login')
    }

    let offset = (page - 1) * size
    if (offset < 0) {
      offset = 0
    }
    const serverConfig = await loadServerConfig()
    const response = await axios.get<PLSelectResult<TagModel>>(
      serverConfig.SERVER + '/tags/select',
      {
        params: { offset, limit: size },
        headers: { Authorization: accessToken },
        withCredentials: true
      })
    return response.data
  }

  // 查询公开的分类列表
  async selectModelsPublic (page: number, size: number): Promise<PLSelectResult<TagModel>> {
    let offset = (page - 1) * size
    if (offset < 0) {
      offset = 0
    }
    const serverConfig = await loadServerConfig()
    const response = await axios.get<PLSelectResult<TagModel>>(
      serverConfig.SERVER + '/tags/select/public',
      {
        params: { offset, limit: size },
        withCredentials: true
      })
    return response.data
  }

  async getTag (pk: string): Promise<TagModel> {
    const accessToken = await getAccessToken()

    if (!accessToken) {
      throw new Error('not login')
    }

    const serverConfig = await loadServerConfig()
    const url = serverConfig.SERVER + '/tags/' + pk
    const response = await axios.get<TagModel>(
      url,
      {
        headers: { Authorization: accessToken },
        withCredentials: true
      })
    return response.data
  }
}
