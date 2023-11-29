import {RestfulAddress} from '@/utils/config'
import axios from 'axios'
import {CommonReslut} from './common-result'

export interface ResourceMetadata {
    key: string
}

export interface ResourceImageContent {
    src: string
}

export interface ResourceTextContent {
    text: string
}

export interface ResourceModel {
    pk: string
    title: string
    create_time: Date
    update_time: Date
    creator: string
    keywords: string
    description: string
    metadata: ResourceMetadata
    content: ResourceImageContent | ResourceTextContent
    size: number
    mime: string
    uri: string
    parsed_uri: string
}

export interface selectResultModel {
    count: number
    list: ResourceModel[]
}

export async function selectPublicResources (page: number, size: number): Promise<selectResultModel> {
  let offset = (page - 1) * size
  if (offset < 0) {
    offset = 0
  }
  const response = await axios.get<CommonReslut<selectResultModel>>(
    RestfulAddress.ServerUrl + '/public/resources/select',
    {
      params: {offset, limit: size},
    })
  return response.data.data
}

export async function selectResources (page: number, size: number, token: string): Promise<selectResultModel> {
  let offset = (page - 1) * size
  if (offset < 0) {
    offset = 0
  }
  const url = RestfulAddress.ServerUrl + '/resources/select'
  const response = await axios.get<CommonReslut<selectResultModel>>(
    url,
    {
      params: {offset, limit: size},
      headers: {Authorization: token},
      withCredentials: true,
    })
  return response.data.data
}


export async function getResourceModel (pk: string): Promise<ResourceModel> {
  const response = await axios.get<CommonReslut<ResourceModel>>(
    RestfulAddress.ServerUrl + '/public/resources/get', {params: {pk}})
  return response.data.data
}
