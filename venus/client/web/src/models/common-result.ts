export class CommonResult<T> {
  code: number = 0
  message: string = ''
  data: T = {} as T
}
