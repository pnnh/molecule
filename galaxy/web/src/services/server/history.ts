import axios from '~/axios/index'
import {ErrorResult, SelectResult} from '@/models/common_result' 
import {HistoryModel} from '@/models/history'
import { loadServerConfig } from './config'

export class HistoryServer {
  static async getModel (accessToken: string, id: number): Promise<HistoryModel> {

    const serverConfig = await loadServerConfig()
    const url = serverConfig.SERVER + '/history/' + id
    const response = await axios.get<HistoryModel>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }

  static async selectModels (accessToken: string, queryString: string): Promise<SelectResult<HistoryModel> | ErrorResult> {
    
    const serverConfig = await loadServerConfig()
    const url = `${serverConfig.SERVER}/history/select?` + queryString
    const response = await axios.get<SelectResult<HistoryModel>>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }
}

