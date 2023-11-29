import axios from '~/axios'
import { CategoryModel } from '@/models/category'

interface WriteResponse {
    pk: string
}

export class CategoryClientPresenter {
  static async createModel (model: CategoryModel) {
    const url = '/restful/categories/create'
    const response = await axios.put<WriteResponse>(
      url,
      model)
    return response.data
  }

  static async deleteModel (pk: string) {
    const url = '/restful/categories/' + pk
    const response = await axios.delete<WriteResponse>(
      url)
    return response.data
  }

  static async updateModel (model: CategoryModel) {
    const url = '/restful/categories/update'
    const response = await axios.post<WriteResponse>(
      url,
      model)
    return response.data
  }
}
