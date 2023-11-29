import axios from '~/axios'
import {InsertResult, UpdateResult} from '@/models/common_result'
import {RepositoryDto} from '@/models/repository'

export class RepositoryClient {

  static async insertModel (model: RepositoryDto) {
    const url = '/server/repository/insert'
    const response = await axios.put<InsertResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }


  static async deleteModel (id: number) {
    const url = '/server/repository/' + id.toString()
    const response = await axios.delete<UpdateResult>(
      url, {
        validateStatus: () => true,
      })
    return response.data
  }

  static async updateModel (model: RepositoryDto) {
    const url = '/server/repository/update'
    const response = await axios.post<UpdateResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }

}

