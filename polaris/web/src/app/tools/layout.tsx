import React from 'react'
import {PublicNavbar} from "@/app/partials/navbar";
import {getIdentity} from "@/services/auth";

export default async function ToolsLayout({
                                              children
                                          }: {
    children: React.ReactNode
}) {
    const identity = await getIdentity()
    return <div>
        <div>
            <PublicNavbar account={identity}/>
        </div>
        <div>
            {children}
        </div>
    </div>
}
