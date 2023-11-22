import axios from 'axios' 
import { CommonResult, SelectResult } from '@/models/common-result'
import { ApplicationModel } from '@/models/application'
import { loadServerConfig } from './config'
 
export async function serverSelectPublicApplications (): Promise<SelectResult<ApplicationModel>> {
  
  const serverConfig = await loadServerConfig()
  const url = serverConfig.SERVER + '/public/applications'
  const response = await axios.get<CommonResult<SelectResult<ApplicationModel>>>(url)
  return response.data.data
}
