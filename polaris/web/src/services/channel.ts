import axios from '~/axios/index'
import { PLInsertResult, PLSelectResult } from '@/models/common-result'
import { ChannelModel } from '@/models/channel'
import { ModelService } from './service'
import { serverConfig } from './server/config'
import { makeHttpGet } from './server/http'

export function channelPageUrl (name: string) {
  return '/channels/' + name
}

export class ChannelService extends ModelService {
  constructor (baseUrl = '') {
    super(baseUrl, 'channel')
  }

  static Instance (baseUrl = '') {
    return new ChannelService(baseUrl)
  }

  async selectChannels (queryString: string) {

    const url = serverConfig.SERVER + '/channels/?' + queryString
    return makeHttpGet<PLSelectResult<ChannelModel>>(url)


  }

  async getChannel (pk: string) {
    const url = this.baseUrl + '/restful/channels/' + pk
    return makeHttpGet<PLSelectResult<ChannelModel>>(url)
  }

  async selectPosts (urn: string) {
    const url = this.baseUrl + `/channels/${urn}/posts`
    return makeHttpGet<PLSelectResult<ChannelModel>>(url)
  }

  async insertChannel (model: ChannelModel) {
    const url = this.baseUrl + '/restful/channel'
    const response = await axios.post<PLInsertResult>(
      url,
      model)
    return response.data
  }

  async updateChannel (model: ChannelModel) {
    const url = this.baseUrl + '/restful/channel'
    const response = await axios.put<ChannelModel>(
      url, model)
    return response.data
  }

  async deleteChannel (pk: string) {
    const url = this.baseUrl + '/restful/channel/' + pk
    const response = await axios.delete<ChannelModel>(url)
    return response.data
  }
}
