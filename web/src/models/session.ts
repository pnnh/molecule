import { AccountModel } from '@/models/account'

export interface SessionModel {
  account: AccountModel
  token: string
}
