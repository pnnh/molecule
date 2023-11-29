import axios from '~/axios'
import {InsertResult, UpdateResult} from '@/models/common_result'
import {StageModel} from '@/models/stage'

export class StageClient {

  static async insertModel (model: unknown) {
    const url = '/server/stage/insert'
    const response = await axios.put<InsertResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }


  static async deleteModel (id: number) {
    const url = '/server/stage/' + id.toString()
    const response = await axios.delete<UpdateResult>(
      url, {
        validateStatus: () => true,
      })
    return response.data
  }

  static async updateModel (model: StageModel) {
    const url = '/server/stage/update'
    const response = await axios.post<UpdateResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }

}

