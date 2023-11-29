import axios from '~/axios'
import { TagModel } from '@/models/tag'

interface WriteResponse {
    pk: string
}

export class TagClientPresenter {
  static async createModel (model: TagModel) {
    const url = '/restful/tags/create'
    const response = await axios.put<WriteResponse>(
      url,
      model)
    return response.data
  }

  static async deleteModel (pk: string) {
    const url = '/restful/tags/' + pk
    const response = await axios.delete<WriteResponse>(
      url)
    return response.data
  }

  static async updateModel (model: TagModel) {
    const url = '/restful/tags/update'
    const response = await axios.post<WriteResponse>(
      url,
      model)
    return response.data
  }
}
