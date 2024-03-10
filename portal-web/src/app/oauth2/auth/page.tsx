
import {FormEdit} from './partials/form'
import {ServerAuthParams} from '@/models/common/oauth2/auth'
import {loadServerConfig} from '@/services/server/config'
 
interface AuthParams {
    searchParams: ServerAuthParams
}

export default async function Home ({searchParams}: AuthParams) {
  const scopes = searchParams.scope.split(',')
  const serverConfig = await loadServerConfig()

  return <div>
    <FormEdit params={searchParams} scopes={scopes} server={serverConfig.SERVER}/>
    </div>
}
