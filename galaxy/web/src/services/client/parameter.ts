import axios from '~/axios'
import {InsertResult, UpdateResult} from '@/models/common_result'
import {ParameterModel} from '@/models/parameter'

export class ParameterClient {

  static async insertModel (model: ParameterModel) {
    const url = '/server/parameter/insert'
    const response = await axios.put<InsertResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }


  static async deleteModel (id: number) {
    const url = '/server/parameter/' + id.toString()
    const response = await axios.delete<UpdateResult>(
      url, {
        validateStatus: () => true,
      })
    return response.data
  }

  static async updateModel (model: ParameterModel) {
    const url = '/server/parameter/update'
    const response = await axios.post<UpdateResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }

}

