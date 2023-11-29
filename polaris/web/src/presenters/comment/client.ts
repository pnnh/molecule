import axios from '~/axios'
import { CommentModel } from '@/models/comment'

interface WriteResponse {
    pk: string
}

export class CommentClientPresenter {
  static async createModel (model: CommentModel) {
    const url = '/restful/comments/create'
    const response = await axios.put<WriteResponse>(
      url,
      model)
    return response.data
  }

  static async deleteModel (pk: string) {
    const url = '/restful/comments/' + pk
    const response = await axios.delete<WriteResponse>(
      url)
    return response.data
  }

  static async updateModel (model: CommentModel) {
    const url = '/restful/comments/update'
    const response = await axios.post<WriteResponse>(
      url,
      model)
    return response.data
  }
}
