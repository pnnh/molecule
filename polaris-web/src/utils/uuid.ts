import { parse as uuidParse } from 'uuid'; 
import {
  base58xrp,
} from '@scure/base';

export function fromString(uuidString: string) {
    return uuidParse(uuidString);
}

export function stringToBase58(uuidString: string) { 
    const data = uuidParse(uuidString);
    // 需要和服务器上的实现保持一致
    return base58xrp.encode(data);
}