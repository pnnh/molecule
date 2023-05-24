import Image from 'next/image'
import {genBasicToken} from '@/models/session'
import {getSession} from '@/services/auth'
import {formatRfc3339} from '@/utils/datetime'
import {RoleModel, selectRoles} from '@/models/role'

export default async function Page () {
  const session = await getSession()
  if (!session || !session.username) {
    return <div> 未登录
        </div>
  }

  const basicToken = genBasicToken(session.username)
  if (!basicToken) {
    return <div> 未登录
        </div>
  }
  const resources = await selectRoles(1, 28, basicToken)

  console.debug('resources:', resources.count)

  return <div>
        <h1>角色管理</h1>
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


function TableRow (props: { model: RoleModel }) {
  const model = props.model
  const imgEl = <Image width={20} height={20} src="/icons/file-fill.svg"
                         alt={'icon'}/>

  const updateTimeString = formatRfc3339(props.model.update_time)
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
                    <div className="font-bold">{props.model.name}</div>
                </div>
            </div>
        </td>
        <td>
            {updateTimeString}
        </td>
        <th>
            <button className="btn btn-ghost btn-xs">details</button>
        </th>
    </tr>
}
