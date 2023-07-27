import { base64url } from "rfc4648"


export function encodeBase64String (state: string): string {
    const enc = new TextEncoder() 
    let base64State = base64url.stringify(enc.encode(state))
  
    return base64State
}

export function decodeBase64String (base64State: string): string {
  const stateData = base64url.parse(base64State)
  const decoder = new TextDecoder()
  const stateDecode = decoder.decode(stateData)
  return stateDecode
}

