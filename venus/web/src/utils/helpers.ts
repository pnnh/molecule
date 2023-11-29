// 获取服务端以json格式传输的状态数据
export function getJsonData<T> (name = 'data'): T {
  const dataEl = document.getElementById(name)
  if (!dataEl) {
    return {} as T
  }
  return JSON.parse(dataEl.innerText)
}

export class Pagination {
  totalCount = 0
  pageSize = 8
  currentPage = 1
  startPage = 1
  endPage = 1
  previousPage = 1
  nextPage = 1
  maxPage = 1
}

export function setLocalStorage (key: string, value: unknown) {
  const stringValue = JSON.stringify(value)
  localStorage.setItem(key, stringValue)
}

export function getLocalStorage (key: string) {
  const stringValue = localStorage.getItem(key) ?? 'null'
  return JSON.parse(stringValue)
}
