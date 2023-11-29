export class PictureModel {
  pk: string = ''
  title: string = ''
  description: string = ''
  createTime?: Date = new Date()
  updateTime?: Date = new Date()
  file: string = ''
}

export class SelectResultModel {
  content: PictureModel[] = []
  totalElements: number = 0
  totalPages: number = 0
  size: number = 0
  numberOfElements: number = 0
}

export class TocItem {
  title: string = ''
  header: number = 0
}
