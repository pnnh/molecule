import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { RelationFullModel, RelationModel } from '@/models/relation'
import { ModelService } from './service'

export class RelationService extends ModelService {
  constructor (baseUrl = '') {
    super(baseUrl, 'relation')
  }

  static Instance (baseUrl = '') {
    return new RelationService(baseUrl)
  }

  async selectRelations<S, T> (queryString: string) {
    const response = await axios.get<PLSelectResult<RelationFullModel<S, T>>>(
      this.baseUrl + '/restful/relation?' + queryString)
    return response.data
  }

  async getRelation (pk: string) {
    const url = this.baseUrl + '/restful/relation/' + pk
    const response = await axios.get<RelationModel>(url)
    return response.data
  }

  async updateRelation (model: RelationModel) {
    const url = this.baseUrl + '/restful/relation'
    const response = await axios.put<RelationModel>(
      url, model)
    return response.data
  }

  async deleteRelation (pk: string) {
    const url = this.baseUrl + '/restful/relation/' + pk
    const response = await axios.delete<RelationModel>(url)
    return response.data
  }
}
