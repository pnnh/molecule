import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { ArticleModel } from '@/models/article'
import { ModelService } from './service'
import { serverConfig } from './server/config'
import { makeHttpGet } from './server/http'

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

  async getArticle (name: string) {
    const url = serverConfig.SERVER + '/posts/' + name
    return makeHttpGet<ArticleModel | undefined>(url)
  }

  async updateArticle (model: ArticleModel) {
    const url = this.baseUrl + '/restful/article'
    const response = await axios.put<ArticleModel>(
      url, model)
    return response.data
  }

  async deleteArticle (pk: string) {
    const url = this.baseUrl + '/restful/page/' + pk
    const response = await axios.delete<ArticleModel>(url)
    return response.data
  }
}
