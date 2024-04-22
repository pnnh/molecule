import { PostsBody } from "./post";

export default async function Home({searchParams}: {
    searchParams: Record<string, string>
}) {
    return <PostsBody searchParams={searchParams} withNavbar={false} />
}