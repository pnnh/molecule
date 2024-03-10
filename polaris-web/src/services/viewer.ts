import { CommonUrl } from './common/curd'
import axios from 'axios'
import { PLInsertResult } from '@/models/common-result'

export class ViewerService {
  baseUrl: string
  constructor (baseUrl = '') {
    this.baseUrl = baseUrl
  }

  static Instance (baseUrl = ''): ViewerService {
    return new ViewerService(baseUrl)
  }

  async newArticleViewer (channel: string, article: string, clientIp: string) {
    const requestForm = new FormData()
    requestForm.append('channel', channel)
    requestForm.append('article', article)
    requestForm.append('client_ip', clientIp)
    const serverViewerUrl = new CommonUrl(this.baseUrl, 'viewer')
    const url = serverViewerUrl.contentPostUrl
    const response = await axios.post<PLInsertResult>(
      url,
      requestForm
    )
    return response.data
  }
}
