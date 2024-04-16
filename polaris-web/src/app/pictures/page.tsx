// import { calcPagination } from '@/utils/helpers' 
// import React from 'react'
// import styles from './page.module.css'  
// import { PSImage } from '@/components/client/image'  
// import { PLPictureService } from '@/services/picture'

export default async function Home ({ searchParams }: {
  searchParams: Record<string, string>
}) {
  console.debug('searchParams', searchParams)
  return <div>hello</div>
  // const pageSize = 24
  // let page = Number(searchParams.page)
  // if (isNaN(page)) {
  //   page = 1
  // }
  // const result = await PLPictureService.selectModels('') 
  // const pagination = calcPagination(page, result.totalElements, pageSize)
  // console.log('pagination', pagination)
  // return <div className={styles.indexPage}> 
  //       <div className={styles.indexBody}>
  //     <div className={styles.pictureList}>
  //       {result.content.map((model) => {
  //         return <div key={model.pk} className={styles.pictureCard}>
  //         <a className={styles.pictureLink} href={model.file}>
  //           <PSImage src={model.file} alt={model.description} fill={true}
  //           sizes='200px'/>
  //         </a>
  //   </div>
  //       })
  //       }
  //     </div>
  //     <div className={styles.pageContainer}> 
  //     </div>
  //         </div>
  // </div>
}
