import dayjs from '~/dayjs'
import {ParsedQuery} from '~/query-string'

export interface ArtifactDto {
  id: number
  name: string
  description: string
  create_time: string
  update_time: string
  mime: string
  size: number
  url: string
  body: string
  creator: number
}

export class ArtifactSearchDto {
  page?: number
  size?: number
  creator?: number[]
  keyword?: string
}


export class ArtifactSearchModel extends ArtifactSearchDto {
  begin_time_parsed?: dayjs.Dayjs
  end_time_parsed?: dayjs.Dayjs

  static fromDto (query?: ArtifactSearchDto) {
    const instance = new ArtifactSearchModel()
    if (!query) return instance
    instance.page = Number(query.page)
    instance.page = Number(query.size)
    return instance
  }

  // 将模型转换为dto对象，确保有合理的默认值，检测边界条件
  static toDto (query: ArtifactSearchModel | ParsedQuery) {
    const parsedQuery: ArtifactSearchDto = new ArtifactSearchDto()
    parsedQuery.page = query.page && !isNaN(Number(query.page)) ? Number(query.page) : undefined
    parsedQuery.size = query.size && !isNaN(Number(query.size)) ? Number(query.size) : undefined

    return parsedQuery
  }

  isEmpty () {
    return !this.page && !this.size
  }
}
