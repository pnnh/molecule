import axios from '~/axios'
import {InsertResult, UpdateResult} from '@/models/common_result'
import {ConfigFileModel} from '@/models/configfile'

export interface IModel {
  name(): string
}

export class ConfigFileClient {

  static async insertModel (model: ConfigFileModel) {
    const url = '/restful/console/configfile/insert'
    const response = await axios.put<InsertResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }


  static async deleteModel (id: string) {
    const url = '/restful/configfile/' + id
    const response = await axios.delete<UpdateResult>(
      url, {
        validateStatus: () => true,
      })
    return response.data
  }

  static async updateModel (model: ConfigFileModel) {
    const url = '/restful/configfile/update'
    const response = await axios.post<UpdateResult>(
      url,
      model, {
        validateStatus: () => true,
      })
    return response.data
  }

}

