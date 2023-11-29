import React from 'react' 
import { selectPublicResources, ResourceModel } from '@/models/resource'
import styles from './page.module.scss'
import { calcPagination } from '@/utils/helpers'
import Link from 'next/link'
import { PSCard } from '@/components/client/controls' 

export async function LoadResourceList (page = 1) {
  const pageSize = 8
  const result = await selectPublicResources(page, pageSize)
  const pagination = calcPagination(page, result.count, pageSize)
  
  return <div className={styles.articleContainer}>
      <div className={styles.articleList}>
        {result.list.map((model) => {
          return <ResourceItem key={model.pk} model={model} />
        })
        }
      </div>
        <div className={styles.pageList}>
        <div className={styles.pageContent}>
        {pagination.previousPage >= 1
          ? (<Link href={'/' + pagination.previousPage}
          className={styles.pageItem}>上一页</Link>)
          : (<></>)}
        {[...Array(pagination.endPage - pagination.startPage + 1).keys()].map((_, index) => {
          return <Link key={index} href={'/' + (pagination.startPage + index)}
            className={pagination.currentPage === pagination.startPage + index
              ? styles.pageItemActive
              : styles.pageItem}>{pagination.startPage + index}</Link>
        })}
        {pagination.nextPage <= pagination.maxPage
          ? (<Link href={'/' + pagination.nextPage}
          className={styles.pageItem}>下一页</Link>)
          : (<></>)}
          </div>
          </div>
    </div>
}

export function ResourceItem (props: { model: ResourceModel }) {
  const readUrl = '/resources/' + props.model.pk
  return <PSCard className={styles.articleItem}>
    <div className={styles.articleContent}>
      <h1 className={styles.articleTitle}> 
        <Link className={styles.articleLink} href={readUrl}>{props.model.title}</Link>
      </h1>
      <div className={styles.articleDescription}>
        {props.model.description}
      </div>
    </div>
  </PSCard>
}

export default async function Home () {
  const piclist = await LoadResourceList()
  return piclist
}
