import React from 'react'
import { ToolNavbar } from './navbar';

export default async function ToolsLayout({children}:{children: React.ReactNode}) {
    return <div>
        <div>
            <ToolNavbar/>
        </div>
        <div>
            {children}
        </div>
    </div>
}
