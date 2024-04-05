'use client'

import { SessionModel } from '@/models/session'
import axios from '~/axios'

export function getLoginSession () {
  const url = '/server/account/session'
  const response = axios.get<SessionModel>(url)
  return response
}
