import { loadHeaderNav } from '@/components/nav'
import React from 'react'
import styles from './page.module.scss' 
import Image from 'next/image'

export default async function Home () {
  const headerNav = await loadHeaderNav()
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
          <div className={styles.productCard}>
            <div className={styles.productImage}>
              <Image src="/images/star/polaris.jpg" alt="banner" fill={true}/>
            </div>
            <div className={styles.productName}>
              北极星
            </div>
            <div className={styles.productDesc}>
              时间静静地流淌，北斗星越来越高，它那巨大的勺把高高翘起，开始偏向南天。其他星星也都随着北斗星起舞，是的，它们都在旋转。
            </div>
          </div>
          <div className={styles.productCard}>
            <div className={styles.productImage}>
              <Image src="/images/star/venus.webp" alt="banner" fill={true}/>
            </div>
            <div className={styles.productName}>
              启明星
            </div>
            <div className={styles.productDesc}>
              启明星虽然观测耀目，但并非总是代表着吉祥。它时而在东方高悬，时而在西方闪耀，让人捉摸不透，恐惧也就因此而生。
            </div>
          </div>
        </div>
  </div>
}
