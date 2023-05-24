import {RestfulAddress} from '@/utils/config'
import axios from 'axios'
import {CommonReslut} from './common-result'

export interface PermissionModel {
    pk: string
    id: string
    create_time: Date
    update_time: Date
    description: string
    name: string
}

interface selectResultModel {
    count: number
    list: PermissionModel[]
}

export async function selectPermissions (page: number, size: number, token: string): Promise<selectResultModel> {
  let offset = (page - 1) * size
  if (offset < 0) {
    offset = 0
  }
  const response = await axios.get<CommonReslut<selectResultModel>>(
    RestfulAddress.ServerUrl + '/permissions/select',
    {
      params: {offset, limit: size},
      headers: {Authorization: token},
      withCredentials: true,
    })
  return response.data.data
}

