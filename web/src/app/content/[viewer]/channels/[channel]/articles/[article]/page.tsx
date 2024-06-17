import '~/prism-themes/themes/prism-one-light.min.css'
import styles from './page.module.scss'
import React from 'react'
import {BuildBodyHtml} from '@/components/common/article'
import {TocInfo} from '@/components/common/toc'
import {headers} from 'next/headers'
import {formatRfc3339} from '@/utils/datetime'
import {Metadata} from 'next'
import {generatorRandomString} from "@/utils/string";
import {PSArticleModel} from "@/models/polaris/article";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import {TocItem} from "@/models/common/article";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {signinDomain} from "@/services/server/domain/domain";

export const metadata: Metadata = {
    title: '北极星笔记'
}

export default async function Home({params, searchParams}: {
    params: { viewer: string, channel: string, article: string },
    searchParams: Record<string, string>
}) {

    const domain = signinDomain(params.viewer)
    const url = `/channels/${params.channel}/articles/${params.article}`
    const articleModel = await domain.makeGet<PSArticleModel | undefined>(url)

    if (articleModel == null) {
        return <div>遇到错误</div>
    }
    metadata.title = articleModel.title + ' - 北极星笔记'
    const article = articleModel
    const tocList: TocItem[] = []
    const titleId = generatorRandomString(8)
    tocList.push({title: article.title, header: 0, id: titleId})
    if (!article.body) {
        return <div>暂不支持的文章类型</div>
    }
    const headersList = headers()
    const clientIp = headersList.get('x-ip') || 'unknown'
    console.log('clientIp', clientIp)
    // 更新文章阅读次数
    if (clientIp) {
        await domain.makePost(`/polaris/channels/${params.channel}/articles/${params.article}/view`, {ip: clientIp})
    }
    const readUrl = `/polaris/channels/${params.channel}/articles/${params.article}`
    return <div className={styles.mainContainer}>
        <div className={styles.articleContainer}>
            <div className={styles.leftArea}>
                <div className={styles.articleInfo}>
                    <h1 className={styles.articleTitle} id={titleId}>{article.title}</h1>
                    <div className={styles.action}>
                        <RemoveRedEyeIcon fontSize={'small'}/><span>{article.discover}</span>&nbsp;
                        <AccessAlarmIcon fontSize={'small'}/><span>{formatRfc3339(article.update_time)}</span>
                    </div>
                    <div className={styles.articleBody}>
                        <BuildBodyHtml tocList={tocList} header={article.header} body={article.body}/>
                    </div>
                </div>
            </div>
            <div className={styles.rightArea}>
                <TocInfo readurl={readUrl} model={tocList}/>
            </div>
        </div>
    </div>
}
