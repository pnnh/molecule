import axios from '~/axios/index'
import {ErrorResult, SelectResult} from '@/models/common_result' 
import {PipelineModel} from '@/models/pipeline'
import { loadServerConfig } from './config'

export class PipelineServer {
  static async getModel (accessToken: string, id: number): Promise<PipelineModel> {

    const serverConfig = await loadServerConfig()
    const url = serverConfig.SERVER + '/pipeline/' + id
    const response = await axios.get<PipelineModel>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }

  static async selectModels (accessToken: string, queryString: string): Promise<SelectResult<PipelineModel> | ErrorResult> {
   
    const serverConfig = await loadServerConfig()
    const url = `${serverConfig.SERVER}/pipeline/select?` + queryString
    const response = await axios.get<SelectResult<PipelineModel>>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }
}

