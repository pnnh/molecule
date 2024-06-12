export default function Page({params, searchParams}: {
    params: { uname: string },
    searchParams: Record<string, string> & { query: string | undefined }
}) {
    console.debug('params', params)
    console.debug('searchParams', searchParams)
    return <div>
        <div>markdown文档列表</div>
        <div>
            <a href={'/localhost/documents'}>示例远程markdown页面</a>
        </div>
    </div>
}
