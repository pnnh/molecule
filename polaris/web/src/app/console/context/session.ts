import { createContext } from 'react'
import { SessionModel } from '@/models/session'
import { AccountModel } from '@/models/account'

const emptySession = new SessionModel(new AccountModel(), '')

export const AuthContext = createContext<SessionModel>(emptySession)
