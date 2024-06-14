import {base58ToString, stringToBase58} from "@/utils/basex";
import {describe} from "@jest/globals";

const rawText = 'anonymous@system'
const encodedText = 'DpFauiFYHooGwi9QD2N6VW'

describe('stringToBase58', () => {
    it('renders a heading', () => {
        const encoded = stringToBase58(rawText)
        expect(encoded).toBe(encodedText)
    })
})

describe('base58ToString', () => {
    it('renders a heading', () => {
        const decoded = base58ToString(encodedText)
        expect(decoded).toBe(rawText)
    })
})
