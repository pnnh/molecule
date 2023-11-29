export interface AccountDto {
  id: number
  create_time: string
  update_time: string
  username: string
  image: string
  description: string
  mail: string
  nickname: string
}

export class AccountModel {
  id = 0

  pk = ''

  create_time: Date = new Date()

  update_time: Date = new Date()

  username = ''

  description = ''

  nickname = ''

  cache_time: Date = new Date()
}
