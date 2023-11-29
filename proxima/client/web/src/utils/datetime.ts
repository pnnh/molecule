import moment from 'moment'

export function formatRfc3339 (date: string | Date): string {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}
