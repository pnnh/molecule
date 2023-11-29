export const CodeOk = 200
export const CodeNotFound = 404

export interface ErrorResult {
  status: number
  title: string
}


export interface SelectResult<T> {
  page: number
  size: number
  count: number
  range: T[]
}

export interface InsertResult {
  id: number
  changes: number
}

export interface DeleteResult {
  id: number
  changes: number
}

export interface UpdateResult {
  id: number
  changes: number
}

export interface BizError {
  code: number
  message: string
}

export function NewBizError (code: number, message: string): Error {
  const fullMessage = JSON.stringify({
    code,
    message
  })
  return new Error(fullMessage)
}

export function ParseBizError (text: string) {
  try {
    return JSON.parse(text) as BizError
  } catch (e) {
    return {
      code: 500,
      message: text
    } as BizError
  }
}
