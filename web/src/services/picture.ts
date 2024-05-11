import {serverMakeHttpGet} from './server/http'
import {serverConfig} from './server/config'
import {NSPictureModel} from "@/models/venus/picture";

export class PLPictureService {
    static async selectModels(queryString: string) {
        const url = serverConfig.NEXT_PUBLIC_SERVER + '/posts' + queryString
        return serverMakeHttpGet<NSPictureModel | undefined>(url)
    }
}
