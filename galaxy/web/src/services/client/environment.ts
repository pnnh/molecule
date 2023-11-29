import axios from '~/axios'
import {InsertResult, SelectResult, UpdateResult} from '@/models/common_result' 
import { EnvironmentModel } from '@/models/environment'

export class EnvironmentClientService {

  async insertModel (model: EnvironmentModel) {
    const url = '/restful/console/environment/insert'
    const response = await axios.put<InsertResult>(
      url,
      model)
    return response.data
  }

  async deleteModel (pk: string) {
    const url = '/restful/environment/' + pk
    const response = await axios.delete<UpdateResult>(
      url)
    return response.data
  }

  async selectModels () {
    const url = '/restful/console/environment'
    const response = await axios.get<SelectResult<EnvironmentModel>>(url)
    return response.data
  }

  async updateModel (model: EnvironmentModel) {
    const url = '/restful/environment/update'
    const response = await axios.post<UpdateResult>(
      url, model)
    return response.data
  }

}

