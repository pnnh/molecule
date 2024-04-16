
import { ArticleModel } from '@/models/article'  
import { serverMakeHttpGet } from './server/http'
import { serverConfig } from './server/config'
 
export class PLPictureService {  
  static async selectModels (queryString: string) {
    const url = serverConfig.NEXT_PUBLIC_SERVER + '/posts' + queryString
    return serverMakeHttpGet<ArticleModel | undefined>(url)
  }

}
