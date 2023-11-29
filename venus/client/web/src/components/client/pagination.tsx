import Link from 'next/link'
import styles from './pagination.module.scss'
import { Pagination } from '@/utils/helpers'

export function PaginationPartial (props: {pagination:Pagination, calcUrl:(page:number)=>string}) {
  const pagination = props.pagination
  return <div className={styles.pageList}>
      <div className={styles.pageContent}>
        {pagination.previousPage >= 1
          ? (<Link href={props.calcUrl(pagination.previousPage)}
            className={styles.pageItem}>上一页</Link>)
          : (<></>)}
        {[...Array(pagination.endPage - pagination.startPage + 1).keys()].map((_, index) => {
          return <Link key={index} href={props.calcUrl(pagination.startPage + index)}
            className={pagination.currentPage === pagination.startPage + index
              ? styles.pageItemActive
              : styles.pageItem}>{pagination.startPage + index}</Link>
        })}
        {pagination.nextPage <= pagination.maxPage
          ? (<Link href={props.calcUrl(pagination.nextPage)}
            className={styles.pageItem}>下一页</Link>)
          : (<></>)}
      </div>
    </div>
}
