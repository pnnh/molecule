import axios from '~/axios'
import {InsertResult, UpdateResult} from '@/models/common_result'
import {PipelineModel} from '@/models/pipeline'

export class PipelineClient {

  static async insertModel (model: unknown) {
    const url = '/server/pipeline/insert'
    const response = await axios.put<InsertResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }


  static async deleteModel (id: number) {
    const url = '/server/pipeline/' + id.toString()
    const response = await axios.delete<UpdateResult>(
      url, {
        validateStatus: () => true,
      })
    return response.data
  }

  static async runPipeline (id: number) {
    const url = '/server/pipeline/run?id=' + id.toString()
    const response = await axios.post<UpdateResult>(
      url, {
        validateStatus: () => true,
      })
    return response.data
  }

  static async updateModel (model: PipelineModel) {
    const url = '/server/pipeline/update'
    const response = await axios.post<UpdateResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }

}

