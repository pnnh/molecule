import axios from '~/axios'
import {InsertResult, UpdateResult} from '@/models/common_result'
import {TaskModel} from '@/models/task'

export class TaskClient {

  static async insertModel (model: unknown) {
    const url = '/server/task/insert'
    const response = await axios.put<InsertResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }


  static async deleteModel (id: number) {
    const url = '/server/task/' + id.toString()
    const response = await axios.delete<UpdateResult>(
      url, {
        validateStatus: () => true,
      })
    return response.data
  }

  static async updateModel (model: TaskModel) {
    const url = '/server/task/update'
    const response = await axios.post<UpdateResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }

}

