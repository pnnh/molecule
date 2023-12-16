import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { DirectoryModel } from '@/models/personal/directory'
import { ModelService } from '../service'

export class DirectoryService extends ModelService {
  constructor (baseUrl = '') {
    super(baseUrl, 'article')
  }

  static Instance (baseUrl = '') {
    return new DirectoryService(baseUrl)
  }

  async selectDirectorys (queryString: string) {
    const url = this.baseUrl + '/restful/console/directories?' + queryString
    const response = await axios.get<PLSelectResult<DirectoryModel>>(url)
    return response.data
  }
}
