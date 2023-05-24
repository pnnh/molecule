import crypto from 'crypto'
import {loadConfig} from '@/utils/config'

const config = loadConfig()
const algorithm = 'aes-256-ctr'
const secretKey = config.AES_KEY
const iv = Buffer.from(config.AES_IV ?? '', 'utf-8')

if (!secretKey) throw new Error('AES_KEY is not defined')
if (!iv) throw new Error('AES_IV is not defined')

const encryptAes = (text: string) => {

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

  return encrypted.toString('hex')
}

const decryptAes = (hash: string) => {

  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv.toString('hex'), 'hex'))

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()])

  return decrpyted.toString()
}

export {encryptAes, decryptAes}
