
import { getResourceModel } from '@/models/resource'

export default async function Home ({ params }: { params: { pk: string } }) { 
  if (!params.pk) {
    return <div>资源不存在</div>
  }
  const resource = await getResourceModel(params.pk)
  return <>资源详情页面: {resource.pk}
    </>
}
