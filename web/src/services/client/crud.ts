import axios from '~/axios'
import { CommonUrl } from '../common/curd'

export async function browserPost<T> (url: string, model: unknown) {
  const response = await axios.post<T>(
    url, model)
  return response.data
}

export const clientArticleUrl = new CommonUrl('/restful', 'article')
