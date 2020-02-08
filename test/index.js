import { assert } from 'chai'
import deepDiver from '../src'

describe('Basic test', () => {
    it('should test deepDiver.get()', () => {
        const obj = {
            users: [
                {
                    name: 'Bob Smith',
                    age: 32,
                    address: {
                        line1: '1234 W Madison Ave.',
                        city: 'Chicago',
                        state: 'IL',
                        zipcode: '60606'
                    }
                }
            ]
        }

        assert(deepDiver(obj, ['users', 0, 'name']) === obj.users[0].name, 'Did not fetch expected value at path.')
    })
})
