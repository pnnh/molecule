import { calcPagination } from '@/models/pagination'
import { PictureModel } from '@/models/picture'
import React from 'react'
import styles from './page.module.css'
import { selectPictureModels } from '@/services/picture'
import { PaginationPartial } from '@/components/client/pagination'
import { PSImage } from '@/components/client/image'
import { NavHeader } from './partials/navbar'
import { replaceSearchParams } from '@/utils/query'

export default async function Home ({ searchParams }: {
  searchParams: Record<string, string>
}) {
  const pageSize = 24
  let page = Number(searchParams.page)
  if (isNaN(page)) {
    page = 1
  }
  const result = await selectPictureModels(page, pageSize)
  // console.debug('result', JSON.stringify(result))
  const pagination = calcPagination(page, result.totalElements, pageSize)
  console.log('pagination', pagination)
  return <div className={styles.indexPage}>
    <header className={styles.navHeader}>
          <NavHeader />
        </header>
        <div className={styles.indexBody}>
      <div className={styles.pictureList}>
        {result.content.map((model) => {
          return <div key={model.pk} className={styles.pictureCard}>
          <a className={styles.pictureLink} href={model.file}>
            <PSImage src={model.file} alt={model.description} fill={true}
            sizes='200px'/>
          </a>
    </div>
        })
        }
      </div>
      <div className={styles.pageContainer}>
        <PaginationPartial pagination={pagination} calcUrl={(page) => replaceSearchParams(searchParams, 'page', page.toString())} />
      </div>
          </div>
  </div>
}
