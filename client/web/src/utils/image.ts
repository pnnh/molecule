import { clientConfig } from 'gen/config.client'

export function imageUrl (url: string) {
  const defaultUrl = clientConfig.SELF_URL + '/images/default.png'
  if (!url || url.trim().length === 0) {
    return defaultUrl
  }
  return url
}
