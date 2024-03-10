'use client'

import { formatRfc3339 } from '@/utils/datetime'
import styles from './table.module.scss'
import React from 'react'
import Link from 'next/link'
import { ChannelModel } from '@/models/channel'
import { PLSelectResult } from '@/models/common-result'

export function Table (props: { data: PLSelectResult<ChannelModel> }) {
  return <table className={styles.Table + ' table w-full'}>
    {/* head */}
    <thead>
      <tr>
        <th className={styles.columnCheck}>
          <label>
            <input type="checkbox" className="checkbox"/>
          </label>
        </th>
        <th>标题</th>
        <th className={styles.columnTime}>修改时间</th>
        <th className={styles.columnOperator}>操作</th>
      </tr>
    </thead>
    <tbody>
      {
        props.data.range.map((item, index) => {
          return <TableRow key={index} model={item}/>
        })
      }

    </tbody>
    {/* foot */}
    <tfoot>
    </tfoot>

  </table>
}

function TableRow (props: { model: ChannelModel }) {
  const updateTimeString = formatRfc3339(props.model.update_time)
  return <tr className={styles.Row}>
    <th>
      <label>
        <input type="checkbox" className="checkbox"/>
      </label>
    </th>
    <td>
      <Link href={'/console/channel/update?pk=' + props.model.uid}
        title={props.model.name}>{props.model.name}</Link>
    </td>
    <td>
      {updateTimeString}
    </td>
    <th>

      <DeleteButton />

    </th>
  </tr>
}

function DeleteButton () {
  return <div>删除</div>
  // const [show, setShow] = React.useState(false)
  // const router = useRouter()
  // return <React.Fragment>
  //   <Button color={'red'} size={'xs'} onClick={() => setShow(!show)}>
  //           删除
  //   </Button>
  //   <Modal
  //     show={show}>
  //     <Modal.Header>
  //               Terms of Service
  //     </Modal.Header>
  //     <Modal.Body>
  //       <div className="space-y-6">
  //                   确定要删除吗？
  //       </div>
  //     </Modal.Body>
  //     <Modal.Footer>
  //       <Button onClick={async () => {
  //         const result = await ChannelClientPresenter.deleteModel(props.pk)
  //         console.debug('result', result)
  //         if (result && result.pk) {
  //           router.refresh()
  //         }

  //         setShow(false)
  //       }}>
  //                   确定
  //       </Button>
  //       <Button
  //         color="gray"
  //         onClick={() => {
  //           console.debug('click cancel')
  //           setShow(false)
  //         }}
  //       >
  //                   取消
  //       </Button>
  //     </Modal.Footer>
  //   </Modal>
  // </React.Fragment>
}
