'use client'

import axios from '~/axios'

export function getLoginSession () {
  const url = '/server/account/session'
  const response = axios.get<{
      account?: string
  }>(url)
  return response
}
