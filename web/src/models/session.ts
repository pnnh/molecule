import { AccountModel } from '@/models/account'

export class SessionModel {
  Account: AccountModel
  Token: string

  constructor (account: AccountModel, token: string) {
    this.Account = account
    this.Token = token
  }
}
