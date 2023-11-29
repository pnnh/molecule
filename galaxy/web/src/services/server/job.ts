import axios from '~/axios/index'
import {ErrorResult, SelectResult} from '@/models/common_result' 
import {JobModel} from '@/models/job'
import { loadServerConfig } from './config'

export class JobServer {
  static async getModel (accessToken: string, id: number): Promise<JobModel> {

    const serverConfig = await loadServerConfig()
    const url = serverConfig.SERVER + '/job/' + id
    const response = await axios.get<JobModel>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }

  static async selectModels (accessToken: string, queryString: string): Promise<SelectResult<JobModel> | ErrorResult> {
    
    const serverConfig = await loadServerConfig()
    const url = `${serverConfig.SERVER}/job/select?` + queryString
    const response = await axios.get<SelectResult<JobModel>>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }
}

