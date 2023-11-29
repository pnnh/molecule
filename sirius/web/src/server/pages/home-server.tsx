import React from "react";
import { HeaderPartial } from "./partial/header";
import { MetaPartial } from "./partial/meta";
import { PictureModel } from "../../models/picture";


export function HomeServerPage() {
    return <html lang="zh">
        <head>
            <MetaPartial />
            <title>天狼星</title>
        </head>
        <body className="home-page">
            <div>
                <HeaderPartial />
                <main>
                    <div id="root"></div>
                </main>
            </div>
            <script type='module' src='/src/entry-client.tsx'></script>
        </body>
    </html>;
}