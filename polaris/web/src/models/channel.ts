import { ArticleModel } from "./article"
import { PLSelectResult } from "./common-result"

export class ChannelModel {
  uid = ''
  nid = 0
  urn = ''
  name = ''
  create_time = ''
  update_time = ''
  creator = ''
  description = ''
  image = ''
  profile = '' 
}

export interface ChannelPostsView {
  channel: ChannelModel
  posts: PLSelectResult<ArticleModel>
}