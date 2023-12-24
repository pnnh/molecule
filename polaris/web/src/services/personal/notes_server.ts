import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { NoteModel } from '@/models/personal/note'

export async function getNoteByKey (pk: string, baseUrl = '') {
  const url = baseUrl + '/restful/console/notes/' + pk
  const response = await axios.get<NoteModel>(url)
  return response.data
}

export async function getNote (queryString: string, baseUrl = '') {
  const url = baseUrl + '/restful/console/notes/?' + queryString
  const response = await axios.get<NoteModel>(url)
  return response.data
}

export async function selectNotes (queryString: string, baseUrl = '') {
  const url = baseUrl + '/restful/console/notes?' + queryString
  const response = await axios.get<PLSelectResult<NoteModel>>(url)
  return response.data
}
