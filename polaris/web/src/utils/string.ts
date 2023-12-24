export function psSubString (str: string, length: number) {
  if (!str) return ''
  if (str.length <= length) return str
  return str.substring(0, length) + '...'
}
