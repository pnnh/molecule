import { ArticleModel } from '@/models/article'

export function articleContentViewUrl2 (model: ArticleModel) {
  return `/posts/${model.urn}`
}