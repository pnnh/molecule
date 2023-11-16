import { loadHeaderNav } from '@/components/nav'
import React from 'react'
import styles from './page.module.scss' 
import Image from 'next/image'
import Link from 'next/link'
import { serverSelectPublicApplications } from '@/services/server/application'
import { ApplicationModel } from '@/models/application'
import { imageUrl } from '@/utils/image'

export default async function Home () {
  const headerNav = await loadHeaderNav()

  const applications = await serverSelectPublicApplications()
  //const products = serverConfig.products
  return <div className={styles.indexPage}>
        <div className={styles.navRow}>
          {headerNav}
        </div>
        <div className={styles.layoutChildren}>
          <div className={styles.logoPng}>
            <Image className={styles.mainImage} src="/images/huable.png" alt="banner"
              fill={true}/>
          </div>
        </div>
        <div className={styles.mainText}>
          <div className={styles.mainTextTitle}>哈宝在线</div>
          {/* <div className={styles.mainTextSubTitle}>一个人的演武场</div> */}
  
        </div> 
        <div className={styles.productRow}>
          {/* <div className={styles.productCard}>
            <div className={styles.productImage}>
              <Image src="/images/star/polaris.jpg" alt="banner" fill={true}/>
            </div>
            <div className={styles.productName}>
              
          <Link href={products.polaris.url} target={'_blank'}>北极星
          </Link>
            </div>
            <div className={styles.productDesc}>
              时间静静地流淌，北斗星越来越高，它那巨大的勺把高高翘起，开始偏向南天。其他星星也都随着北斗星起舞，是的，它们都在旋转。
            </div>
          </div> */}
          {
            applications.list.map((item, index) => {
              return <AppCard key={index} {...item}/>
            })
          }
        </div>
  </div>
}


function AppCard (app: ApplicationModel) {

  return <div className={styles.productCard}>
  <div className={styles.productImage}>
    <Image src={imageUrl(app.image)} alt="banner" fill={true}/>
  </div>
  <div className={styles.productName}>
    
<Link href={app.site_url} target={'_blank'}>
  {app.title}
</Link>
  </div>
  <div className={styles.productDesc}>
    {app.description}
  </div>
</div>
}
