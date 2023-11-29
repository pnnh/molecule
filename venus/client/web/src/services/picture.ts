import { CommonResult } from '@/models/common-result'
import { PictureModel, SelectResultModel } from '@/models/picture'
import axios from 'axios'
import { serverConfig } from './server/config'

export async function selectPictureModels (page: number, size: number) {
  const response = await axios.get<SelectResultModel>(
    serverConfig.DATA_SERVER + '/pictures',
    { params: { page, size } })
  return response.data
}

export async function getPictureModel (pk: string): Promise<PictureModel> {
  const response = await axios.get<CommonResult<PictureModel>>(
    serverConfig.DATA_SERVER + '/restful/picture/get', { params: { pk } })
  return response.data.data
}
