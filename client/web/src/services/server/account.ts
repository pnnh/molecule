 
import axios from 'axios'
import { serverConfig } from '@/services/server/config'
import { SelectResult } from '@/models/common-result'
import { AccountModel } from '@/models/account'

export async function serverSelectAccounts (page: number, size: number, token: string) {
  let offset = (page - 1) * size
  if (offset < 0) {
    offset = 0
  }
  const response = await axios.get<SelectResult<AccountModel>>(serverConfig.SERVER + '/admin/accounts',
    {
      params: {offset, limit: size},
      headers: {Authorization: token},
      withCredentials: true,
    })
  return response.data
}
