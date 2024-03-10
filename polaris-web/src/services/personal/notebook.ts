import axios from '~/axios/index'
import { PLSelectResult } from '@/models/common-result'
import { NotebookModel } from '@/models/personal/notebook'

export async function selectNotebooks (queryString: string, baseUrl = '') {
    const url = baseUrl + '/restful/console/notebooks?' + queryString
    const response = await axios.get<PLSelectResult<NotebookModel>>(url)
    return response.data
}
