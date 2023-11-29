export function calcLevelColor (level: number) {
  if (level === 5) {
    return '#f8f9fa'
  }
  if (level === 4) {
    return '#6c757d'
  }
  if (level === 3) {
    return '#17a2b8'
  }
  if (level === 2) {
    return '#007bff'
  }
  if (level === 1) {
    return '#ffc107'
  }
  return '#dc3545'
}
