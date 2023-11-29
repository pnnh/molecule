'use client'
import React from 'react'
import {useRouter} from 'next/navigation'
import {SelectResult} from '@/models/common_result'
import Image from 'next/image'
import styles from './table.module.scss'
import {formatRfc3339} from '@/utils/datetime'
import {ConfigProvider, MenuProps, Pagination} from 'antd'
import {EditButton} from './edit'
import {DeleteButton} from './delete'
import queryString from '~/query-string'
// eslint-disable-next-line camelcase
import zh_CN from 'antd/es/locale/zh_CN'
import {Dropdown, Empty} from '~/antd'
import {EditOutlined} from '~/@ant-design/icons'
import Link from 'next/link'
import {ConfigFileModel, ConfigFileSearchModel} from '@/models/configfile'

export function Table (props: {
  data: SelectResult<ConfigFileModel>,
  rawQuery: string,
}) {
  const router = useRouter()
  const queryObject = ConfigFileSearchModel.fromDto(queryString.parse(props.rawQuery, {arrayFormat: 'bracket'}))
  console.debug('queryObject6', queryObject)

  if (props.data.count <= 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
  }

  return <>
    <div className={styles.table}>
      {
        props.data.range.map((item, index) => {
          return <TableRow key={index} model={item}/>
        })
      }
    </div>
  </>
}


function TableRow (props: { model: ConfigFileModel }) {
  const [open, setOpen] = React.useState(false)

  const tagOrDetails = () => {
    return <>
      {open
        ? <div className={styles.detailsTable}>
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


function calcOperatorItems (model: ConfigFileModel): MenuProps {

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
