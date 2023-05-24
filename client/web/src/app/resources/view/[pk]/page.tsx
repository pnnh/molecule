export default async function Home ({params}: { params: { pk: string } }) {
  if (!params.pk) {
    return <div>用户不存在</div>
  }

  return <>用户详情页面: {params.pk}
    </>
}
