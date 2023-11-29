import axios from '~/axios'
import {InsertResult, UpdateResult} from '@/models/common_result'
import {JobModel} from '@/models/job'

export class JobClient {

  static async insertModel (model: unknown) {
    const url = '/server/job/insert'
    const response = await axios.put<InsertResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }


  static async deleteModel (id: number) {
    const url = '/server/job/' + id.toString()
    const response = await axios.delete<UpdateResult>(
      url, {
        validateStatus: () => true,
      })
    return response.data
  }

  static async updateModel (model: JobModel) {
    const url = '/server/job/update'
    const response = await axios.post<UpdateResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }

}

