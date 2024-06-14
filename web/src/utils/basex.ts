import {base64url} from 'rfc4648'
import {parse as uuidParse} from 'uuid';
import {
    base58xrp,
} from '@scure/base';

export function encodeBase64String(state: string): string {
    const enc = new TextEncoder()
    const base64State = base64url.stringify(enc.encode(state))

    return base64State
}

export function decodeBase64String(base64State: string): string {
    const stateData = base64url.parse(base64State)
    const decoder = new TextDecoder()
    const stateDecode = decoder.decode(stateData)
    return stateDecode
}

export function binaryToBase58(data: Uint8Array): string {
    return base58xrp.encode(data)
}

export function stringToUuid(uuidString: string) {
    return uuidParse(uuidString);
}

export function uuidToBase58(uuidString: string) {
    const data = uuidParse(uuidString);
    // 需要和服务器上的实现保持一致
    return base58xrp.encode(data);
}

/**
 * 将字符串转换为base58编码的字符串
 * @param data - 待编码的字符串
 * @returns base58编码的字符串
 */
export function stringToBase58(data: string): string {
    const enc = new TextEncoder()
    return base58xrp.encode(enc.encode(data))
}

/**
 * 将base58编码的字符串转换为字符串
 * @param data - 待解码的base58编码的字符串
 * @returns 解码后的字符串
 */
export function base58ToString(data: string): string {
    const dec = new TextDecoder()
    return dec.decode(base58xrp.decode(data))
}
