export class Pagination {
  totalCount: number = 0
  pageSize: number = 8
  currentPage: number = 1
  startPage: number = 1
  endPage: number = 1
  previousPage: number = 1
  nextPage: number = 1
  maxPage: number = 1
}

export function calcPagination (currentPage: number, totalCount: number, pageSize: number): Pagination {
  if (currentPage < 1) {
    currentPage = 1
  }
  let maxPage = Math.floor(totalCount / pageSize)
  if (totalCount % pageSize !== 0) {
    maxPage += 1
  }
  if (currentPage > maxPage) {
    currentPage = maxPage
  }
  let startPage = currentPage - 5
  if (startPage < 1) {
    startPage = 1
  }
  let endPage = currentPage + 5
  if (endPage > maxPage) {
    endPage = maxPage
  }
  const previousPage = currentPage - 1
  const nextPage = currentPage + 1

  const pagination = new Pagination()
  pagination.totalCount = totalCount
  pagination.pageSize = pageSize
  pagination.currentPage = currentPage
  pagination.startPage = startPage
  pagination.endPage = endPage
  pagination.previousPage = previousPage
  pagination.nextPage = nextPage
  pagination.maxPage = maxPage
  return pagination
}
