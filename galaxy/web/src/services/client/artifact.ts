import axios from '~/axios'
import {InsertResult, UpdateResult} from '@/models/common_result'
import {ArtifactDto} from '@/models/artifact'


export class ArtifactClient {

  static async insertModel (model: ArtifactDto) {
    const url = '/server/artifact/insert'
    const response = await axios.put<InsertResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }


  static async deleteModel (id: number) {
    const url = '/server/artifact/' + id.toString()
    const response = await axios.delete<UpdateResult>(
      url, {
        validateStatus: () => true,
      })
    return response.data
  }

  static async updateModel (model: ArtifactDto) {
    const url = '/server/artifact/update'
    const response = await axios.post<UpdateResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }

}

