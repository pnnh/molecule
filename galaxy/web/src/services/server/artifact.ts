import axios from '~/axios/index'
import {ErrorResult, SelectResult} from '@/models/common_result'
import {ArtifactDto, ArtifactSearchDto} from '@/models/artifact' 
import { loadServerConfig } from './config'

export class ArtifactServer {
  static async getModel (accessToken: string, id: number): Promise<ArtifactDto> {

    const serverConfig = await loadServerConfig()
    const url = serverConfig.SERVER + '/artifact/' + id
    const response = await axios.get<ArtifactDto>(
      url,
      {
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    return response.data
  }

  static async selectModels (accessToken: string, queryObject: ArtifactSearchDto): Promise<SelectResult<ArtifactDto> | ErrorResult> {
    
    const serverConfig = await loadServerConfig()
    const url = `${serverConfig.SERVER}/artifact/select`
    const response = await axios.get<SelectResult<ArtifactDto>>(
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

