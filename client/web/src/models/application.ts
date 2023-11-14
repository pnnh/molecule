
import axios from 'axios'
import {CommonResult} from './common-result'
import { serverConfig } from '@/services/server/config'

export interface ApplicationModel {
    pk: string
    id: string
    create_time: Date
    update_time: Date
    description: string
    title: string
    site_url: string
    status: number
    image: string
}

interface selectResultModel {
    count: number
    list: ApplicationModel[]
}

export async function selectPublicApplications (page: number, size: number): Promise<selectResultModel> {
  let offset = (page - 1) * size
  if (offset < 0) {
    offset = 0
  }
  const response = await axios.get<CommonResult<selectResultModel>>(
    serverConfig.SERVER + '/public/applications/select',
    {
      params: {offset, limit: size},
    })
  return response.data.data
}

export async function selectApplications (page: number, size: number, token: string): Promise<selectResultModel> {
  let offset = (page - 1) * size
  if (offset < 0) {
    offset = 0
  }
  const response = await axios.get<CommonResult<selectResultModel>>(
    serverConfig.SERVER + '/applications/select',
    {
      params: {offset, limit: size},
      headers: {Authorization: token},
      withCredentials: true,
    })
  return response.data.data
}

