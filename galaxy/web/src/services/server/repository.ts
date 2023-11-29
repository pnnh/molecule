import axios from '~/axios/index'
import {ErrorResult, SelectResult} from '@/models/common_result' 
import {RepositoryDto} from '@/models/repository'
import { loadServerConfig } from './config'

export class RepositoryServer {
  static async getModel (accessToken: string, id: number): Promise<RepositoryDto> {

    const serverConfig = await loadServerConfig()
    const url = serverConfig.SERVER + '/repository/' + id
    const response = await axios.get<RepositoryDto>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }

  static async selectModels (accessToken: string, queryString: string): Promise<SelectResult<RepositoryDto> | ErrorResult> {
    
    const serverConfig = await loadServerConfig()
    const url = `${serverConfig.SERVER}/repository/select?` + queryString
    const response = await axios.get<SelectResult<RepositoryDto>>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }
}

