'use client'

import { formatRfc3339 } from '@/utils/datetime'
import styles from './table.module.scss'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CategoryModel } from '@/models/category'
import { CategoryClientPresenter } from '@/presenters/category/client'
import { Dialog, DialogActions, DialogBody, DialogContent, DialogTitle } from '@fluentui/react-components'
import { TWButton } from '@/components/client/controls'
import { PLSelectResult } from '@/models/common-result'

export function Table (props: { data: PLSelectResult<CategoryModel> }) {
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

function TableRow (props: { model: CategoryModel }) {
  const model = props.model

  const updateTimeString = formatRfc3339(props.model.update_time)
  return <tr className={styles.Row}>
    <th>
      <label>
        <input type="checkbox" className="checkbox"/>
      </label>
    </th>
    <td>
      <Link href={'/console/categories/update?pk=' + props.model.pk}
        title={props.model.title}>{props.model.title}</Link>
    </td>
    <td>
      {updateTimeString}
    </td>
    <th>

      <DeleteButton pk={model.pk}/>

    </th>
  </tr>
}

function DeleteButton (props: { pk: string }) {
  const [show, setShow] = React.useState(false)
  const router = useRouter()
  return <React.Fragment>
    <TWButton onClick={() => setShow(!show)}>
            删除
    </TWButton>
    <Dialog
      open={show}>
      <DialogBody>
      <DialogTitle>
                Terms of Service
      </DialogTitle>
        <DialogContent>

        <div className="space-y-6">
                    确定要删除吗？
        </div>
        </DialogContent>
      <DialogActions>
        <TWButton onClick={async () => {
          const result = await CategoryClientPresenter.deleteModel(props.pk)
          console.debug('result', result)
          if (result && result.pk) {
            router.refresh()
          }

          setShow(false)
        }}>
                    确定
        </TWButton>
        <TWButton
          onClick={() => {
            console.debug('click cancel')
            setShow(false)
          }}
        >
                    取消
        </TWButton>
      </DialogActions>
      </DialogBody>
    </Dialog>
  </React.Fragment>
}
