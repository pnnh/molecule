'use client'

import { Provider } from 'react-redux'
import React from 'react'
import { rootStore } from './store'

export function ConsoleReduxProvider ({ children }: { children: React.ReactNode }) {
  return <Provider store={rootStore}>{children}</Provider>
}
