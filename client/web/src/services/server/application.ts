import axios from 'axios'
import { serverConfig } from './config'
import { CommonResult, SelectResult } from '@/models/common-result'
import { ApplicationModel } from '@/models/application'

export async function serverSelectPublicApplications (): Promise<SelectResult<ApplicationModel>> {
  const url = serverConfig.SERVER + '/public/applications'
  const response = await axios.get<CommonResult<SelectResult<ApplicationModel>>>(url)
  return response.data.data
}
