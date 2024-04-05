import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { DirectoryModel } from '@/models/personal/directory'

export class DirectoryService {
  static async selectDirectorys (queryString: string) {
    const url = '/server/console/directories?' + queryString
    const response = await axios.get<PLSelectResult<DirectoryModel>>(url)
    return response.data
  }
}
