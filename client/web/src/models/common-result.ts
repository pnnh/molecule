
export class CommonResult<T> {
  code = 0
  message = ''
  data: T = {} as T
}
