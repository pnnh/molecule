export function imageUrl (url: string) {
  const defaultUrl = '/images/default.png'
  if (!url || url.trim().length === 0) {
    return defaultUrl
  }
  return url
}
