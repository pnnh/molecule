import React from 'react'
import EditPartial from './partials/edit'
import {serverConfig} from '@/services/server/config'
import {ChannelService} from '@/services/channel'

interface IReadRequest {
    searchParams: { pk: string }
}

export default async function Page(request: IReadRequest) {
    const pk = request.searchParams.pk
    const channelService = ChannelService.Instance(serverConfig.SERVER)
    const result = await channelService.getChannel(pk)
    if (result == null) {
        return <div>遇到错误</div>
    }
    const model = result
    if (!model) {
        return <div>无效文章</div>
    }

    return <div>
        <div>
            <EditPartial model={model}/>
        </div>
    </div>
}
