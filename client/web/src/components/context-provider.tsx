'use client'

import { createContext, useContext, useEffect, useState } from 'react'
// import { 
//   fluentButton,
//   provideFluentDesignSystem
// } from '@fluentui/web-components'
const IsClientCtx = createContext(false)

export const IsClientCtxProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
    // provideFluentDesignSystem().register(
    //   fluentButton()
    // )
  }, [])
  return (
    <IsClientCtx.Provider value={isClient}>{children}</IsClientCtx.Provider>
  )
}

export function useIsClient () {
  return useContext(IsClientCtx)
}
