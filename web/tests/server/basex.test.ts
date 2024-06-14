import {stringToBase58} from "@/utils/basex";

describe('Page', () => {
    it('renders a heading', () => {
        const text = 'hello@world'
        const encoded = stringToBase58(text)
        expect(encoded).toBe('StVrDLa716RTh1M')
    })
})
