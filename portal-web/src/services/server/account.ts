 
import axios from 'axios' 
import { SelectResult } from '@/models/common-result'
import { AccountModel } from '@/models/account'
import { loadServerConfig } from './config'

export async function serverSelectAccounts (page: number, size: number, token: string) {
  let offset = (page - 1) * size
  if (offset < 0) {
    offset = 0
  }
  const serverConfig = await loadServerConfig()
  const response = await axios.get<SelectResult<AccountModel>>(serverConfig.SERVER + '/admin/accounts',
    {
      params: {offset, limit: size},
      headers: {Authorization: token},
      withCredentials: true,
    })
  return response.data
}
