import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { NoteModel } from '@/models/personal/note' 

export class NoteService {
  static async getNoteByKey(pk: string, baseUrl = '') {
    const url = baseUrl + '/restful/console/notes/' + pk
    const response = await axios.get<NoteModel>(url)
    return response.data
  }

  static async getNote(queryString: string, baseUrl = '') {
    const url = baseUrl + '/restful/console/notes/?' + queryString
    const response = await axios.get<NoteModel>(url)
    return response.data
  }

  static async selectNotes(queryString: string) {
    const url = '/server/console/notes?' + queryString
    const response = await axios.get<PLSelectResult<NoteModel>>(url)
    return response.data
  } 
}
