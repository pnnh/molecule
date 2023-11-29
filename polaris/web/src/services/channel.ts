import axios from '~/axios/index'
import { PLInsertResult, PLSelectResult } from '@/models/common-result'
import { ChannelModel } from '@/models/channel'
import { ModelService } from './service'

export function channelPageUrl (pk: string) {
  return '/content/channel/' + pk
}

export class ChannelService extends ModelService {
  constructor (baseUrl = '') {
    super(baseUrl, 'channel')
  }

  static Instance (baseUrl = '') {
    return new ChannelService(baseUrl)
  }

  async selectChannels (queryString: string) {
    const url = this.baseUrl + '/restful/channel?' + queryString
    const response = await axios.get<PLSelectResult<ChannelModel>>(url)
    return response.data
  }

  async getChannel (pk: string) {
    const url = this.baseUrl + '/restful/channel/' + pk
    const response = await axios.get<ChannelModel>(url)
    return response.data
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
