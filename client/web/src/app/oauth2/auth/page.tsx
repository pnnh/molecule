import {ServerAuthParams} from '@/models/common/oauth2/auth'
import {FormEdit} from './partials/form'
import {RestfulAddress} from '@/utils/config'

interface AuthParams {
    searchParams: ServerAuthParams
}

export default async function Home ({searchParams}: AuthParams) {
  const scopes = searchParams.scope.split(',')
  return <div>
        <h1>授权</h1>
        <div>
            <h2>选择授权</h2>
            <FormEdit params={searchParams} scopes={scopes} server={RestfulAddress.ServerUrl}></FormEdit>
        </div>
    </div>
}
