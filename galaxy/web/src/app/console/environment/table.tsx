'use client'

import React, { useEffect } from 'react'
import {useRouter} from 'next/navigation'
import {SelectResult} from '@/models/common_result'
import Image from 'next/image'
import styles from './table.module.scss'
import {formatRfc3339} from '@/utils/datetime'
import {MenuProps } from 'antd'
import {EditButton} from './edit'
import {DeleteButton} from './delete'
import {Dropdown, Empty} from '~/antd'
import {EditOutlined} from '~/@ant-design/icons' 
import { EnvironmentClientService } from '@/services/client/environment'
import { EnvironmentModel } from '@/models/environment'

export function Table () {
  const [result, setResult] = React.useState<SelectResult<EnvironmentModel>>()

  useEffect(() => {
    const load = async () => {
      const service = new EnvironmentClientService()
      const result = await service.selectModels()

      if (!result || ('status' in result && result.status !== 200)) {
        throw new Error('查询失败')
      }
      setResult(result)

    }
    load()
  }, [])

  if (!result || result.count <= 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
  }
 
  return <>
    <div className={styles.table}>
      {
        result.range.map((item, index) => {
          return <TableRow key={index} model={item}/>
        })
      }
    </div>
  </>
}


function TableRow (props: { model: EnvironmentModel }) {
  const [open, setOpen] = React.useState(false)

  const tagOrDetails = () => {
    return <>
      {open
        ? <div className={styles.detailsTable}>
          <div className={styles.detailsRow}>
            <div className={styles.detailsCellStart}>
              创建时间
            </div>
            <div className={styles.detailsCellEnd}>
              {formatRfc3339(props.model.create_time)}
            </div>
          </div>
          <div className={styles.detailsRow}>
            <div className={styles.detailsCellStart}>
              仓库描述
            </div>
            <div className={styles.detailsCellEnd}>
              {props.model.description}
            </div>
          </div>
        </div>
        : null}
    </>
  }

  return <div className={styles.tableRow}>
    <div className={styles.dataRow}>
      <div className={styles.rowStart}>
        <div className={styles.rowStartContent}>
          <div>
            <Image className={open ? styles.rowOpen : ''} src={'/icons/angle-right.svg'} alt={''} height={10} width={12}
              onClick={() => {
                setOpen(!open)
              }}></Image></div>
        </div>
      </div>
      <div className={styles.rowContent + ' row'}>

        <div className={'col-2 col-xl-2'}>
          <div className={styles.fieldItem}>
            <label>KEY</label>
            <div className={styles.content}>
              {props.model.pk}
            </div>
          </div>
        </div>
        <div className={'col-2 col-xl-2'}>
          <div className={styles.fieldItem}>
            <label>标题</label>
            <div className={styles.content}>
              {props.model.name}
            </div>
          </div>
        </div>
        <div className={'col-2 col-xl-2'}>
          <div className={styles.fieldItem}>
            <label>创建人</label>
            <div className={styles.content}>
              {props.model.creator_name}
            </div>
          </div>
        </div>
        <div className={'col-2 col-xl-2'}>
          <div className={styles.fieldItem}>
            <label>更新时间</label>
            <div className={styles.content}>
              {formatRfc3339(props.model.update_time)}
            </div>
          </div>
        </div>
        <div className={'col-2 col-xl-2'}>
          <div className={styles.fieldItem}>
            <label>状态</label>
            <div className={styles.content}>
              {props.model.status_name}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rowEnd}>
        <div className={'mt-3'}>
          <Dropdown menu={calcOperatorItems(props.model)}>
            <a onClick={(e) => e.preventDefault()}>
              <EditOutlined/>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
    {tagOrDetails()}
  </div>
}


function calcOperatorItems (model: EnvironmentModel): MenuProps {

  const items: MenuProps = {
    items: [
      {
        label: (
          <EditButton model={model}/>
        ),
        key: '0',
      },
      {
        label: (
          <EditButton model={model}/>
        ),
        key: '0',
      },
      {
        label: (
          <DeleteButton model={model}/>
        ),
        key: '1',
      },
    ]
  }

  return items
}
