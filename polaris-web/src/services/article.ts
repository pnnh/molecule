import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { ArticleModel } from '@/models/article'
import { ModelService } from './service'

export function articleContentViewUrl2 (model: ArticleModel) {
  return `/posts/${model.urn}`
}

export class ArticleService extends ModelService {
  constructor (baseUrl = '') {
    super(baseUrl, 'article')
  }

  static Instance (baseUrl = '') {
    return new ArticleService(baseUrl)
  }

  async selectArticles (queryString: string) {
    const url = this.baseUrl + '/posts?' + queryString
    const response = await axios.get<PLSelectResult<ArticleModel>>(url)
    return response.data
  }
  
  async deleteArticle (pk: string) {
    const url = this.baseUrl + '/restful/page/' + pk
    const response = await axios.delete<ArticleModel>(url)
    return response.data
  }
}
