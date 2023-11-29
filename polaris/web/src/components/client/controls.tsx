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

export function TWButton (props: {children: React.ReactNode, className?: string,
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}) {
  return <button
          type="button"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
          {props.children}
        </button>
}

export function PSLinkButton (props: {href: string, children: React.ReactNode, className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}) {
  return <Link href={props.href} className={styles.linkButton + ' ' + props.className}>{props.children}</Link>
}

export function TWInput (props: {placeholder?: string,
  label?: string,
  value?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void, className?: string}) {
  return <div className="relative mb-3" data-te-input-wrapper-init>
  <label
    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
    >{props.label}
  <input
    type="text"
    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    value={props.value}
    placeholder={props.placeholder}
    onChange={props.onChange} />
  </label>
</div>
}
