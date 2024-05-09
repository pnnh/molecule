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
            </button>
        </ClickAwayListener>
        <Popper id={id} open={open} anchorEl={anchorEl} placement={'bottom-start'}>
            <RoleBox role={role} pathname={pathname} />
        </Popper>
    </div>
}

function RoleButton({role, pathname}: {role: string, pathname: string}) {
    if (role === 'venus' || pathname.startsWith("/venus")) {
        return <>
            <span>启明星</span>
            <KeyboardArrowDownIcon fontSize="small"/>
        </>
    }
    return <>
        <span>北极星</span>
        <KeyboardArrowDownIcon fontSize="small"/>
    </>
}

function RoleBox({role, pathname}: {role: string, pathname: string}) {
    if (role === 'venus' || pathname.startsWith("/venus")) {
        return <div className={styles.selectorBox}>
            <Link className={styles.navLink} href={'/polaris/channels'}>北极星</Link>
        </div>
    }
    return <div className={styles.selectorBox}>
        <Link className={styles.navLink} href={'/venus/channels'}>启明星</Link>
    </div>
}
