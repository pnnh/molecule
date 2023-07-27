 
import axios from 'axios'
import {CommonReslut} from './common-result'
import { serverConfig } from '@/services/server/config'

export interface RoleModel {
    pk: string
    id: string
    create_time: Date
    update_time: Date
    description: string
    name: string
}

interface selectResultModel {
    count: number
    list: RoleModel[]
}

export async function selectRoles (page: number, size: number, token: string): Promise<selectResultModel> {
  let offset = (page - 1) * size
  if (offset < 0) {
    offset = 0
  }
  const response = await axios.get<CommonReslut<selectResultModel>>(
    serverConfig.SERVER + '/roles/select',
    {
      params: {offset, limit: size},
      headers: {Authorization: token},
      withCredentials: true,
    })
  return response.data.data
}

