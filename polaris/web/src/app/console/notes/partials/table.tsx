'use client'

import { ArticleModel } from '@/models/article'
import { formatRfc3339 } from '@/utils/datetime'
import styles from './table.module.scss'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Input,
  Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, SplitButton
} from '@fluentui/react-components'
import type { MenuButtonProps } from '@fluentui/react-components'
import { ArticleService } from '@/services/article'
import { PLSelectResult } from '@/models/common-result'

export function Table (props: { result: PLSelectResult<ArticleModel> }) {
  return <table className={styles.articleTable + ' table w-full'}>
    {/* head */}
    <thead>
      <tr>
        <th>标题</th>
        <th className={styles.columnTime}>修改时间</th>
        <th className={styles.columnOperator}>操作</th>
      </tr>
    </thead>
    <tbody>
      {
        props.result.range.map((item, index) => {
          return <TableRow key={index} model={item}/>
        })
      }

    </tbody>
    {/* foot */}
    <tfoot>
    </tfoot>

  </table>
}

function TableRow (props: { model: ArticleModel }) {
  const model = props.model
  const [shareOpen, setShareOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [address, setAddress] = useState('')
  // const menuRef = useRef();
  const router = useRouter()
  const updateTimeString = formatRfc3339(props.model.update_time)

  const service = ArticleService.Instance()
  const ShareButton = () => {
    return <Dialog open={shareOpen}>
    <DialogSurface>
      <DialogBody>

        <DialogTitle>
          <div>
                   分享文章
          </div>
        </DialogTitle>
        <DialogContent>
          <div>
              <Input value={address} onChange={(event) => setAddress(event.target.value)}/>
          </div>
        </DialogContent>
        <DialogActions>

          <Button appearance="primary" onClick={async () => {
            // const result = await browserPost<WriteResponse>(clientArticleUrl.consoleShareUrl, { address, pk: model.pk })
            // console.debug('share result', result)
            // if (result && result.pk) {
            //   setShareOpen(false)
            //   router.refresh()
            // }
          }}>
                    确定
          </Button>

          <DialogTrigger disableButtonEnhancement>
            <Button appearance="secondary" onClick={() => setShareOpen(false)}>取消</Button>
          </DialogTrigger>
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  </Dialog>
  }
  const DeleteButton = () => {
    return <Dialog open={deleteOpen}>
    <DialogSurface>
      <DialogBody>
        <DialogTitle>
          <div>
                   删除文章
          </div>
        </DialogTitle>
        <DialogContent>
          <div>
                    确定要删除吗？
          </div>
        </DialogContent>
        <DialogActions>

          <Button appearance="primary" onClick={async () => {
            const result = await service.deleteArticle(model.pk)
            console.debug('result', result)
            if (result && result.pk) {
              setDeleteOpen(false)
              router.refresh()
            }
          }}>
                    确定
          </Button>

          <DialogTrigger disableButtonEnhancement>
            <Button appearance="secondary" onClick={() => setDeleteOpen(false)}>取消</Button>
          </DialogTrigger>
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  </Dialog>
  }

  return <tr className={styles.articleRow}>
    <td className={styles.articleTitle}>
      <Link href={service.consoleViewUrl(props.model.pk)}
        title={props.model.title}>{props.model.title}</Link>
    </td>
    <td>
      {updateTimeString}
    </td>
    <td className={styles.actionCol}>
      <ShareButton/>
      <DeleteButton/>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => {
            return <SplitButton primaryActionButton={<span onClick={() => {
              router.push(service.consoleEditUrl(props.model.pk))
            }}>编辑</span>} menuButton={triggerProps} />
          }
          }
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>
              <Button appearance='transparent' onClick={() => setShareOpen(!shareOpen)}>分享</Button>
            </MenuItem>
            <MenuItem>
              <Button appearance='transparent' onClick={() => setDeleteOpen(!shareOpen)}>删除</Button>
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

    </td>
  </tr>
}
