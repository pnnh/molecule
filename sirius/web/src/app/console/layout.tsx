import React from 'react'   
import styles from './layout.module.scss'
import { ConsoleLeftNav, ConsoleTopNav } from './nav'
 

export default async function ConsoleLayout ({
  children,
}: {
  children: React.ReactNode
}) { 
  return ( 
    <>
    <ConsoleTopNav username={'auth.username'}></ConsoleTopNav>
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



