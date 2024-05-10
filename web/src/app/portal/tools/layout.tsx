import React from 'react'
import {PublicNavbar} from "@/app/partials/navbar";
import {getIdentity} from "@/services/auth";
import {getPathname} from "@/services/server/pathname";

export default async function ToolsLayout({children}:{children: React.ReactNode}) {
    const identity = await getIdentity()
    return <div>
        <div>
            <PublicNavbar account={identity} pathname={getPathname()} />
        </div>
        <div>
            {children}
        </div>
    </div>
}
