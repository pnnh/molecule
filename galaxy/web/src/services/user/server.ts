import {AccountDto} from '@/models/account'
import {NewBizError, SelectResult} from '@/models/common_result'
import axios from '~/axios' 
import { loadServerConfig } from '../server/config'

export class UserServer {
  static async searchUsers (accessToken: string, id?: number, keyword?: string) {
    const serverConfig = await loadServerConfig()
    const url = `${serverConfig.SERVER}/users/search`
    const response = await axios.get<SelectResult<AccountDto>>(
      url,
      {
        params: {
          id,
          keyword,
          page: 1,
          size: 10
        },
        headers: {Authorization: accessToken},
        withCredentials: true,
        validateStatus: () => true,
      })
    if (response.status !== 200) {
      throw NewBizError(response.status, '请求出错')
    }
    return response.data

  }
}

