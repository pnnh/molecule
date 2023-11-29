import axios from '~/axios'

export class ClientService {

  static async insertModel<T, R> (url: string, model: T) {
    const response = await axios.put<R>(url, model)
    return response.data
  }

  static async deleteModel<R> (url: string) {
    const response = await axios.delete<R>(url)
    return response.data
  }

  static async updateModel<T, R> (url: string, model: T) {
    const response = await axios.post<R>(url, model)
    return response.data
  }
}

