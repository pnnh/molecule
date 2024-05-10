'use client'

import React from "react";
import { Popper} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './profile.module.css'
import Link from "~/next/link";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { usePathname } from 'next/navigation'

export function UserProfileSelector({role}: { role: string }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const pathname = usePathname()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClickAway = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return <div>
        <ClickAwayListener onClickAway={handleClickAway}>
            <button aria-describedby={id} onClick={handleClick}>
                <RoleButton role={role} pathname={pathname} />
                <KeyboardArrowDownIcon fontSize="small"/>
            </button>
        </ClickAwayListener>
        <Popper id={id} open={open} anchorEl={anchorEl} placement={'bottom-start'}>
            <RoleBox role={role} pathname={pathname} />
        </Popper>
    </div>
}

function RoleButton({role, pathname}: {role: string, pathname: string}) {
    if (pathname.startsWith("/venus") || role === 'venus') {
        return <span>启明星</span>
    }
    if (pathname.startsWith("/portal") || role === 'portal') {
        return <span>天狼星</span>
    }
    return <span>北极星</span>
}

function RoleBox({role, pathname}: {role: string, pathname: string}) {
    const linkList = [
        {name: '文章', code: 'polaris', href: '/polaris/channels'},
        {name: '图片', code: 'venus', href: '/venus/channels'},
        {name: '工具', code: 'portal', href: '/portal/tools'},
    ]
    if (pathname.startsWith("/venus") || role === 'venus') {
        return <div className={styles.selectorBox}>
            {
                linkList.map((item) => {
                    if (item.code === 'venus') {
                        return null
                    }
                    return <Link key={item.code} className={styles.navLink} href={item.href}>{item.name}</Link>
                })
            }
        </div>
    }
    if (pathname.startsWith("/portal") || role === 'portal') {
        return <div className={styles.selectorBox}>
            {
                linkList.map((item) => {
                    if (item.code === 'portal') {
                        return null
                    }
                    return <Link key={item.code} className={styles.navLink} href={item.href}>{item.name}</Link>
                })
            }
        </div>
    }
    return <div className={styles.selectorBox}>
        {
            linkList.map((item) => {
                if (item.code === 'polaris') {
                    return null
                }
                return <Link key={item.code} className={styles.navLink} href={item.href}>{item.name}</Link>
            })
        }
    </div>
}
