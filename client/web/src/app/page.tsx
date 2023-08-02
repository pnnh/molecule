import { loadHeaderNav } from '@/components/nav'
import React from 'react'
import styles from './page.module.scss' 

export default async function Home () {
  const headerNav = await loadHeaderNav()
  return <div className={styles.indexPage}>
        <div className={styles.navRow}>
          {headerNav}
        </div>
        <div className={styles.layoutChildren}>
{/*           
          <Image className={styles.mainImage} src="/images/background/bear.webp" alt="banner"
            height={600} width={600}/>
            */}
           首页

        </div>
  </div>
}
