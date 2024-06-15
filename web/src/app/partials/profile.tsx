import React from "react";
import styles from './profile.module.css'

export function UserProfileSelector({role}: { role: string }) {
    return <div className={styles.roleButtonContainer}>
        <span>启明星</span>
        <span>天狼星</span>
        <span>北极星</span>
    </div>
}
