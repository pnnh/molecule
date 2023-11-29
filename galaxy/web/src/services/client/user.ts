import axios from '~/axios'
import {NewBizError, SelectResult} from '@/models/common_result'
import {AccountDto} from '@/models/account'

export class UserClient {
  static async findUser (id?: number, pk?: string, cached = true) {
    const url = '/server/users/find'
    const response = await axios.get<AccountDto>(
      url,
      {
        params: {
          id,
          pk,
          cached
        },
        validateStatus: () => true,
      })
    if (response.status !== 200) {
      throw NewBizError(response.status, 'findUser请求出错')
    }

    return response.data
  }

  static async searchUsers (keyword?: string, includes?: number[]) {
    const url = '/server/users/search'
    const response = await axios.get<SelectResult<AccountDto>>(
      url,
      {
        params: {
          keyword,
          includes
        },
        validateStatus: () => true,
      })
    if (response.status !== 200) {
      throw NewBizError(response.status, '请求出错')
    }
    return response.data
  }


  static async handleUserSearch (newValue: string, includes?: number[]) {
    if ((!newValue || newValue.length < 1) && includes?.length === 0) {
      return []
    }

    const result = await UserClient.searchUsers(newValue, includes)

    const realData = result.range.map((item) => {
      return {
        label: item.username,
        value: item.id
      }
    })
    return realData
  }

}

