
export class CommonResult<T> {
  code = 0
  message = ''
  data: T = {} as T
}


export interface SelectResult<T> {
  count: number
  list: T[]
}
