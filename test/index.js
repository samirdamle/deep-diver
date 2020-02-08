import { assert } from 'chai'
import defaultAwesomeFunction, { awesomeFunction } from '../src'

describe('Awesome test.', () => {
    it('should test default awesome function', () => {
        const expectedVal = 'I am the default function! - Samir'
        assert(defaultAwesomeFunction('Samir') === expectedVal, 'Default not awesome :(')
    })

    it('should test awesome function', () => {
        const expectedVal = 'I am just an awesome function.'
        assert(awesomeFunction() === expectedVal, 'Named awesome :)')
    })
})
