import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { ArticleModel } from '@/models/article'
import { ModelService } from './service'

export function articleContentViewUrl (profile: string, channel: string, partition: string, page: string) {
  return `/profile/${profile}/channel/${channel}/partition/${partition}/page/` + page
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
      this.baseUrl + '/restful/article?' + queryString)
    return response.data
  }

  async getArticle (pk: string, queryString: string = '') {
    const url = this.baseUrl + '/restful/article/' + pk + '?' + queryString
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
    const url = this.baseUrl + '/restful/article/' + pk
    const response = await axios.delete<ArticleModel>(url)
    return response.data
  }
}
