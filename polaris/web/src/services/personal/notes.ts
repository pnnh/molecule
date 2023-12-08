import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { NoteModel } from '@/models/personal/note'
import { ModelService } from '../service'

export class NoteService extends ModelService {
  constructor (baseUrl = '') {
    super(baseUrl, 'article')
  }

  static Instance (baseUrl = '') {
    return new NoteService(baseUrl)
  }

  async selectNotes (queryString: string) {
    const url = this.baseUrl + '/restful/console/notes?' + queryString
    const response = await axios.get<PLSelectResult<NoteModel>>(url)
    return response.data
  }
}
