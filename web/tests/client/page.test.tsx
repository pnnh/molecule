import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {PSSTextLink} from '@/components/link'

describe('Page', () => {
    it('renders a heading', () => {
        render(<PSSTextLink href={'localhost'} className={''}><span>Link</span></PSSTextLink>)
        const heading = screen.getByRole('link', {name: 'Link'})
        expect(heading).toBeInTheDocument()
    })
})

