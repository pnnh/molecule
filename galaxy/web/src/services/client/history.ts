import axios from '~/axios'
import {InsertResult, UpdateResult} from '@/models/common_result'
import {HistoryModel} from '@/models/history'

export class HistoryClient {

  static async insertModel (model: HistoryModel) {
    const url = '/server/history/insert'
    const response = await axios.put<InsertResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }


  static async deleteModel (id: number) {
    const url = '/server/history/' + id.toString()
    const response = await axios.delete<UpdateResult>(
      url, {
        validateStatus: () => true,
      })
    return response.data
  }

  static async updateModel (model: HistoryModel) {
    const url = '/server/history/update'
    const response = await axios.post<UpdateResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }

}

