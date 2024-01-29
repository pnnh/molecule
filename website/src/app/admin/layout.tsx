 
import React from 'react'   
import { getIdentity } from '@/services/auth'
import styles from './layout.module.scss'
import { ConsoleLeftNav, ConsoleTopNav } from './nav'
 

export default async function ConsoleLayout ({
  children,
}: {
  children: React.ReactNode
}) {  

  const identity = await getIdentity()

  if (!identity) {
    return <div > 未登录
    </div>
  }
  return ( 
    <>
    <ConsoleTopNav username={identity}></ConsoleTopNav>
        <main>
       
        <div className={styles.pageContainer}>
    <div className={styles.leftNav}><ConsoleLeftNav></ConsoleLeftNav></div>
    
    <div className={styles.rightBody}>
    {children}  
    </div>
  </div> </main> 
        <footer></footer>
    </>
    
  )
} 



