export class ArticleModel {
  pk = ''
  title = ''
  header = ''
  body = ''
  create_time: Date = new Date()
  update_time: Date = new Date()
  creator = ''
  keywords = ''
  description = ''
  cover = ''
  relation = ''
  discover = 0
  channel = ''
  profile = ''
  name = ''
}

// Deprecated
export class SelectResultModel {
  count = 0
  list: ArticleModel[] = []
}

export class TocItem {
  title = ''
  header = 0
  id = ''
}
