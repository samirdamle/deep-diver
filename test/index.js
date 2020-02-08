import { assert } from 'chai'
import deepDiver from '../src'

const obj = {
    users: [
        {
            name: 'Bob Smith',
            age: 32,
            home: {
                address: {
                    line1: '699 Sheraton Dr.',
                    city: 'Sunnyvale',
                    state: 'CA',
                    zipcode: '94087',
                },
            },
            business: {
                address: {
                    line1: '801 Van Ness Ave.',
                    city: 'San Francisco',
                    state: 'CA',
                    zipcode: '94109',
                },
            },
        },
    ],
    enabled: true,
}

describe('Basic test', () => {
    it('should test deepDiver.get() for shallow path', () => {
        assert(deepDiver(obj, 'enabled') === obj.enabled, 'Did not fetch expected value of shallow property.')
    })

    it('should test deepDiver.get() for array path', () => {
        assert(deepDiver(obj, ['users', 0, 'name']) === obj.users[0].name, 'Did not fetch expected value at array path.')
    })

    it('should test deepDiver.get() for string path', () => {
        assert(deepDiver(obj, 'users.0.age') === obj.users[0].age, 'Did not fetch expected value at string path.')
    })
})
