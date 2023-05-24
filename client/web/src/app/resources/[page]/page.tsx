import { LoadResourceList } from '../page' 


export default async function Home ({ params }: { params: { page: number } }) {
  
  let page = Number(params.page)
  if (isNaN(page)) {
    page = 1
  }
  const piclist = await LoadResourceList(page)
  return piclist 
}
