import axios from 'axios' 

export interface IClientConfig {
    SERVER: string,
    SELF_URL: string,
    AUTH_SERVER: string,
    SIGN: {
      PASSWORD: {
        ENABLE: boolean,
      },
      WEBAUTHN: {
        ENABLE: boolean,
      },
      EMAIL: {
        ENABLE: boolean,
      },
    }
}

export async function fetchConfig () {
  const configUrl = '/restful/config'
  const response = await axios.get<IClientConfig>(configUrl)
  return response.data
}
