export class AccountModel {
  pk = ''
  create_time: Date = new Date()
  update_time: Date = new Date()
  username = ''
  image = ''
  description = ''
  mail = ''
  nickname = ''
}

export interface makeAssertionResult {
    authorization: string
}
