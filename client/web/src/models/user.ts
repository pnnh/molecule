 
import axios from 'axios'
import {CommonReslut} from './common-result'
import { serverConfig } from '@/services/server/config'

export interface ResourceModel {
    pk: string
    username: string
    create_time: Date
    update_time: Date
    description: string
    size: number
    mail: string
    nickname: string
}

export interface selectResultModel {
    count: number
    list: ResourceModel[]
}

export async function selectUsers (page: number, size: number, token: string): Promise<selectResultModel> {
  let offset = (page - 1) * size
  if (offset < 0) {
    offset = 0
  }
  const response = await axios.get<CommonReslut<selectResultModel>>(serverConfig.SERVER + '/users/select',
    {
      params: {offset, limit: size},
      headers: {Authorization: token},
      withCredentials: true,
    })
  return response.data.data
}
