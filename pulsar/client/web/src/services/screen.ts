import {cookies} from '~/next/headers'

export enum ScreenSizeEnum {
  xs,
  sm,
  md,
  lg,
  xl,
  xxl
}

function queryScreenSize () {
  const cookieStore = cookies()
  const screenSize = cookieStore.get('screen')?.value
  if (screenSize) {
    const slice = screenSize.split(',')
    const screenWidth = slice[0]
    const screenHeight = slice[1]
    return {
      width: screenWidth,
      height: screenHeight
    }
  }
}

export function isWidthXl () {

  const screenSize = queryScreenSize()

  return screenSize?.width === 'xl'
}

export function isHeightMd () {
  const screenSize = queryScreenSize()

  return screenSize?.height === 'md'
}

