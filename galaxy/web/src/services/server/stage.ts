import axios from '~/axios/index'
import {ErrorResult, SelectResult} from '@/models/common_result' 
import {StageModel} from '@/models/stage'
import { loadServerConfig } from './config'

export class StageServer {
  static async getModel (accessToken: string, id: number): Promise<StageModel> {

    const serverConfig = await loadServerConfig()
    const url = serverConfig.SERVER + '/stage/' + id
    const response = await axios.get<StageModel>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }

  static async selectModels (accessToken: string, queryString: string): Promise<SelectResult<StageModel> | ErrorResult> {
    
    const serverConfig = await loadServerConfig()
    const url = `${serverConfig.SERVER}/stage/select?` + queryString
    const response = await axios.get<SelectResult<StageModel>>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }
}

