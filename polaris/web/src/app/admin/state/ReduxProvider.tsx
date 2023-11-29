'use client'

import { Provider } from 'react-redux'
import React from 'react'
import { rootStore } from './Store'

export function AdminReduxProvider ({ children }: { children: React.ReactNode }) {
  return <Provider store={rootStore}>{children}</Provider>
}
