import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { ArticleModel } from '@/models/article'
import { ModelService } from './service'

export function articleContentViewUrl (profile: string, channel: string, path: string, page: string) {
  return `/posts/${profile}/${channel}${path}/` + page
}

export function articleContentViewUrl2 (model: ArticleModel) {
  if (model.name) {
    return `/posts/${model.name}`
  }
  return `/posts/${model.url_name}`
}

export class ArticleService extends ModelService {
  constructor (baseUrl = '') {
    super(baseUrl, 'article')
  }

  static Instance (baseUrl = '') {
    return new ArticleService(baseUrl)
  }

  async selectArticles (queryString: string) {
    const response = await axios.get<PLSelectResult<ArticleModel>>(
      this.baseUrl + '/restful/posts?' + queryString)
    return response.data
  }

  async getArticle (pk: string, queryString: string = '') {
    const url = this.baseUrl + '/restful/posts/' + pk + '?' + queryString
    const response = await axios.get<ArticleModel>(url)
    return response.data
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
