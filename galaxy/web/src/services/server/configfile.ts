import axios from '~/axios/index'
import {ErrorResult, SelectResult} from '@/models/common_result'
import {ConfigFileModel, ConfigFileSearchDto} from '@/models/configfile' 
import { loadServerConfig } from './config'

export class ConfigFileServer {
  static async getModel (accessToken: string, id: number): Promise<ConfigFileModel> {

    const serverConfig = await loadServerConfig()
    const url = serverConfig.SERVER + '/server/configfile/' + id
    const response = await axios.get<ConfigFileModel>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }

  static async selectModels (accessToken: string, queryObject: ConfigFileSearchDto): Promise<SelectResult<ConfigFileModel> | ErrorResult> {
    
    const serverConfig = await loadServerConfig()
    const url = `${serverConfig.SERVER}/operator/admin/configfile`
    const response = await axios.get<SelectResult<ConfigFileModel>>(
      url,
      {
        params: queryObject,
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }
}

