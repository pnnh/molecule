import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { LibraryModel } from '@/models/personal/library' 

export class LibraryService {
  static async selectLibraries(uid: string, queryString: string = '') {
    const url = `/server/console/accounts/${uid}/libraries?${queryString}`
    const response = await axios.get<PLSelectResult<LibraryModel>>(url)
    return response.data
  } 
}
