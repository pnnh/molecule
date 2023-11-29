import Link from 'next/link'
import React, { MouseEventHandler } from 'react'  
import styles from './controls.module.css'

export function PSCard (props: { children: React.ReactNode, className?: string }) {
  return <div className={styles.card + ' ' + props.className}>
        {props.children}
    </div>
}

export function PSButton (props: {children: React.ReactNode, className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}) {
  return <button className={styles.button + ' ' + props.className}
  onClick={props.onClick}>{props.children}</button>
}

export function PSLinkButton (props: {href: string, children: React.ReactNode, className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}) { 
  return <Link href={props.href} className={styles.linkButton + ' ' + props.className}>{props.children}</Link>
}
