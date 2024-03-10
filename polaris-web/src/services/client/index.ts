export function indexReadUrl (channel: string) {
  if (!channel) {
    return '/'
  }
  return '/?channel=' + channel
}
