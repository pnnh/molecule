
import { serverConfig } from '@/services/server/config'
import {FormEdit} from './partials/form'
import {ServerAuthParams} from '@/models/common/oauth2/auth'
 
interface AuthParams {
    searchParams: ServerAuthParams
}

export default async function Home ({searchParams}: AuthParams) {
  const scopes = searchParams.scope.split(',')

  return <div>
    <FormEdit params={searchParams} scopes={scopes} server={serverConfig.NEXT_PUBLIC_PORTAL_SERVER}/>
    </div>
}
