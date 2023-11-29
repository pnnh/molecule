import dayjs from '~/dayjs'
import {ParsedQuery} from '~/query-string'

export interface ConfigFileModel { 
  pk: string
  name: string
  description: string
  create_time: string
  update_time: string
  creator: number
  status: number
  status_name: string
  creator_name: string
}

export class ConfigFileSearchDto {
  page?: number
  size?: number
  creator?: number[]
  keyword?: string
}

export class ConfigFileSearchModel extends ConfigFileSearchDto {
  begin_time_parsed?: dayjs.Dayjs
  end_time_parsed?: dayjs.Dayjs

  static fromDto (query?: ConfigFileSearchDto) {
    const instance = new ConfigFileSearchModel()
    if (!query) return instance
    instance.page = Number(query.page)
    instance.page = Number(query.size)
    return instance
  }

  // 将模型转换为dto对象，确保有合理的默认值，检测边界条件
  static toDto (query: ConfigFileSearchModel | ParsedQuery) {
    const parsedQuery: ConfigFileSearchDto = new ConfigFileSearchDto()
    parsedQuery.page = query.page && !isNaN(Number(query.page)) ? Number(query.page) : undefined
    parsedQuery.size = query.size && !isNaN(Number(query.size)) ? Number(query.size) : undefined

    return parsedQuery
  }

  isEmpty () {
    return !this.page && !this.size
  }
}
