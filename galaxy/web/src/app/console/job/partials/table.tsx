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
import {JobModel} from '@/models/job'
import Link from '~/next/link'

export function Table (props: {
  data: SelectResult<JobModel>,
  rawQuery: string,
}) {
  const router = useRouter()

  if (props.data.count <= 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
  }

  const goPage = (page: number, pageSize: number) => {
    const queryObject = queryString.parse(props.rawQuery, {arrayFormat: 'bracket'})
    queryObject.page = page.toString()
    queryObject.size = pageSize.toString()
    const redirectUrl = '/console/Job?' + queryString.stringify(queryObject)
    router.push(redirectUrl)
  }

  const PageRow = () => {
    if (props.data.count < 1) {
      return <></>
    }
    return <div className={styles.pagination}>
      {/* eslint-disable-next-line camelcase */}
      <ConfigProvider locale={zh_CN}>
        <Pagination current={props.data.page} pageSize={props.data.size} total={props.data.count}
          onChange={goPage}/>
      </ConfigProvider>
    </div>
  }
  return <>
    <div className={styles.table}>
      {
        props.data.range.map((item, index) => {
          return <TableRow key={index} model={item}/>
        })
      }
    </div>

    <PageRow/>

  </>
}


function TableRow (props: { model: JobModel }) {
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
            <label>ID</label>
            <div className={styles.content}>
              {props.model.id}
            </div>
          </div>
        </div>
        <div className={'col-2 col-xl-2'}>
          <div className={styles.fieldItem}>
            <label>名称</label>
            <div className={styles.content}>
              {props.model.name}
            </div>
          </div>
        </div>
        <div className={'col-2 col-xl-2'}>
          <div className={styles.fieldItem}>
            <label>构建任务</label>
            <div className={styles.content}>
              <Link href={'/console/task?job=' + props.model.id}>构建任务</Link>
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


function calcOperatorItems (model: JobModel): MenuProps {

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
          <DeleteButton model={model}/>
        ),
        key: '1',
      },
    ]
  }

  return items
}
