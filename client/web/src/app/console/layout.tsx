import { getIdentity } from '@/services/auth'
import React from 'react'   
import styles from './layout.module.scss'
import { ConsoleLeftNav, ConsoleTopNav } from './nav'
 

export default async function ConsoleLayout ({
  children,
}: {
  children: React.ReactNode
}) {  

  const session = await getIdentity()
  console.log('auth:', session)

  if (!session) {
    return <div > 未登录
    </div>
  }
  return ( 
    <>
    <ConsoleTopNav username={session}></ConsoleTopNav>
        <main>
       
        <div className={styles.pageContainer}>
    <div className={styles.leftNav}><ConsoleLeftNav></ConsoleLeftNav></div>
    
    <div className={styles.rightBody}>
    {children}  
    </div>
  </div> </main>  
    </>
    
  )
} 



