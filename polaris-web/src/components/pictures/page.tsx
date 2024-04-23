import { PicturesBody } from "./picture";

export default async function Home({searchParams}: {
    searchParams: Record<string, string>
}) {
    return <PicturesBody searchParams={searchParams} withNavbar={false} />
}