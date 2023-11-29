import Image from 'next/image'
import {ResourceModel, selectResources} from '@/models/resource'
import {getJwtToken, getSession} from '@/services/auth'
import {formatRfc3339} from '@/utils/datetime'
import prettyBytes from 'pretty-bytes'

export default async function Page () {
  const session = await getSession()
  if (!session || !session.username) {
    return <div> 未登录
        </div>
  }

  const basicToken = getJwtToken()
  if (!basicToken) {
    return <div> 未登录
        </div>
  }


  const resources = await selectResources(1, 28, basicToken)

  console.debug('resources:', resources.count)

  return <div>
        <h1>资源管理</h1>
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                {/* head */}
                <thead>
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" className="checkbox"/>
                        </label>
                    </th>
                    <th>名称</th>
                    <th>修改时间</th>
                    <th>大小</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {
                    resources.list.map((item, index) => {
                      return <TableRow key={index} model={item}/>
                    })
                }

                </tbody>
                {/* foot */}
                <tfoot>
                </tfoot>

            </table>
        </div>
    </div>
}


function TableRow (props: { model: ResourceModel }) {
  const model = props.model
  let imgEl = <Image width={20} height={20} src="/icons/file-fill.svg"
                       alt={'icon'}/>
  if (model.mime && model.mime.startsWith('image/')) {
    imgEl = <Image width={20} height={20} src={model.parsed_uri} alt="picture"/>
  }
  const updateTimeString = formatRfc3339(props.model.update_time)
  const sizePretty = prettyBytes(props.model.size)
  return <tr>
        <th>
            <label>
                <input type="checkbox" className="checkbox"/>
            </label>
        </th>
        <td>
            <div className="flex items-center space-x-3">
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        {imgEl}
                    </div>
                </div>
                <div>
                    <div className="font-bold">{props.model.title}</div>
                </div>
            </div>
        </td>
        <td>
            {updateTimeString}
        </td>
        <td>{sizePretty}</td>
        <th>
            <button className="btn btn-ghost btn-xs">details</button>
        </th>
    </tr>
}
