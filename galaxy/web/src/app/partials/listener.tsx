'use client'

import {useEffect} from 'react'
import Cookies from 'js-cookie'
import {screenSize} from '@/utils/screen'

export function WindowListener () {
  calcScreenSize()

  useEffect(() => {
    const winType = typeof window
    if (!winType) return
    window.addEventListener('resize', () => calcScreenSize)
  }, [])

  return <div></div>
}

function calcScreenSize () {
  const winType = typeof window
  if (!winType) return
  const isWidthXl = window.innerWidth >= screenSize.xl
  const isHeightMd = window.innerHeight >= screenSize.md
  const screenWidthSize = isWidthXl ? 'xl' : 'lg'
  const screenHeightSize = isHeightMd ? 'md' : 'sm'
  console.log('resize111', screenWidthSize, screenHeightSize)
  Cookies.set('screen', `${screenWidthSize},${screenHeightSize}`)
}
