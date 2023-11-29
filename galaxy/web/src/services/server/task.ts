import axios from '~/axios/index'
import {ErrorResult, SelectResult} from '@/models/common_result' 
import {TaskModel} from '@/models/task'
import { loadServerConfig } from './config'

export class TaskServer {
  static async getModel (accessToken: string, id: number): Promise<TaskModel> {

    const serverConfig = await loadServerConfig()
    const url = serverConfig.SERVER + '/task/' + id
    const response = await axios.get<TaskModel>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }

  static async selectModels (accessToken: string, queryString: string): Promise<SelectResult<TaskModel> | ErrorResult> {
    
    const serverConfig = await loadServerConfig()
    const url = `${serverConfig.SERVER}/task/select?` + queryString
    const response = await axios.get<SelectResult<TaskModel>>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }
}

