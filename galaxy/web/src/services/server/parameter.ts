import axios from '~/axios/index'
import {ErrorResult, SelectResult} from '@/models/common_result' 
import {ParameterModel} from '@/models/parameter'
import { loadServerConfig } from './config'

export class ParameterServer {
  static async getModel (accessToken: string, id: number): Promise<ParameterModel> {

    const serverConfig = await loadServerConfig()
    const url = serverConfig.SERVER + '/parameter/' + id
    const response = await axios.get<ParameterModel>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }

  static async selectModels (accessToken: string, queryString: string): Promise<SelectResult<ParameterModel> | ErrorResult> {
    
    const serverConfig = await loadServerConfig()
    const url = `${serverConfig.SERVER}/parameter/select?` + queryString
    const response = await axios.get<SelectResult<ParameterModel>>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }
}

