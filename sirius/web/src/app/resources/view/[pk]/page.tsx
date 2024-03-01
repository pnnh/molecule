
export default async function Home ({ params }: { params: { pk: string } }) { 
  if (!params.pk) {
    return <div>资源不存在</div>
  }
  return <div>资源详情页面</div>
}
