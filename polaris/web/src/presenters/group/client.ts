import axios from '~/axios'
import { GroupModel } from '@/models/group'

interface WriteResponse {
    pk: string
}

export class GroupClientPresenter {
  static async createModel (model: GroupModel) {
    const url = '/restful/groups/create'
    const response = await axios.put<WriteResponse>(
      url,
      model)
    return response.data
  }

  static async deleteModel (pk: string) {
    const url = '/restful/groups/' + pk
    const response = await axios.delete<WriteResponse>(
      url)
    return response.data
  }

  static async updateModel (model: GroupModel) {
    const url = '/restful/groups/update'
    const response = await axios.post<WriteResponse>(
      url,
      model)
    return response.data
  }
}
