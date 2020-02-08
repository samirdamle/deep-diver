/*
const defaultAwesomeFunction = name => {
    const returnStr = `I am the default function! - ${name}`
    return returnStr
}

const awesomeFunction = () => 'I am just an awesome function.'
*/

// const clone = obj => JSON.parse(JSON.stringify(obj))

const deepDiver = (obj = {}, pathArg = [], value) => {
    /*
     * @param {object}            obj={ }           Object in which you want to find a value or set a value deep inside.
     *
     * @param {string | Array}    pathArg=[ ]       Path of the value specified as string -
     *                                              e.g. 'users.2.address.city' will get/set the city of the address of the 3rd user in the users array in obj.
     *                                              or an array -
     *                                              e.g. ['users', 2, 'address', 'city'] does the same as above.
     *
     * @param {any}               [value]           Optional value - if provided - will set the value of the node found at path to provided value.
     *                                              e.g. if path is 'users.2.address.city' and value is 'New York', then
     *                                              obj.users[2].address.city will be set to 'New York'.
     *                                              If value is not provided, then deeValue will get the value of the node at path and return it.
     *
     * @return {any}              val | obj | null  If value argument is not provided, returns the value of the node located at the path inside the object.
     *                                              e.g. path 'users.2.address.city' or ['users', 2, 'address', 'city'] will return obj.users[2].address.city.
     *
     *                                              If value argument is provided, returns the obj (that was provided as the first argument) modified with the
     *                                              value of the node located at the path inside the object set to value.
     *                                              e.g. path 'users.2.address.city' with value='New York' will return obj back with
     *                                              obj.users[2].address.city as 'New York'.
     *
     *                                              If a node is not found at the provided path, then null is return.
     * */

    const pathArray = typeof pathArg === 'string' ? pathArg.split('.') : Array.isArray(pathArg) ? pathArg : []

    // if value is not provided, deepDiver will fetch and return the value of the node at the path given in pathArray
    const get = (rootNode, path) => {
        /* const getValueAtProp = (node, prop) => {
            return node[prop]
        } */

        const props = typeof path === 'string' ? path.split('.') : Array.isArray(path) ? path : []

        console.log('props = ')
        console.log(props)

        return props.reduce((node, prop) => {
            // prop is a path segment e.g. if path is ['users', 0, 'name', 'firstName'] or 'users.0.name.firstName'
            // then prop is 'user', 0, 'name' and 'firstName'
            if (node && prop != null) {
                // if node is an array
                if (Array.isArray(node)) {
                    const arr = node

                    // if the prop is a filter function, then filter the array to return an array of matching items
                    if (typeof prop === 'function') {
                        return arr.filter(prop)
                    }

                    // if the prop is a number, use it as an index for the array to return the nth item
                    if (typeof prop === 'number' || !isNaN(parseInt(prop, 10))) {
                        console.log('node[prop] = ')
                        console.log(arr[prop])

                        return arr[prop]
                    }

                    // if the prop is an array of keys, then return an object with those keys only (pluck properties)
                    if (Array.isArray(prop)) {
                        return arr.map(item =>
                            prop.reduce((returnObj, key) => {
                                returnObj[key] = item[key]
                                return returnObj
                            }, {}),
                        )
                    }

                    // if the prop is a string which is not a number, then use it as a key and pluck value of item.key to return an array of values
                    // e.g. if arr is [{a: 1, b: 'hi'}, {a: 2, b: 'hello'}] and prop is a, then return [1, 2]
                    return arr.map(item => item[prop])
                }

                // if node is an object
                return node[prop]
            }
            return null
        }, rootNode)
    }

    if (value === undefined) {
        return get(obj, pathArray)
    }

    // if value is provided, deepr will set the value of the node at the path given in pathArray
    const [lastProp] = pathArray.slice(-1)
    const node = get(obj, lastProp)

    /* const setValue = (node, prop, value) => {
            if (Array.isArray(value)) {
            } else {
                node[prop] = value
            }
        } */

    if (Array.isArray(node)) {
        if (typeof lastProp === 'number') {
            node[lastProp] = value
        } else if (Array.isArray(lastProp)) {
            if (Array.isArray(value)) {
                node.forEach(item => {
                    lastProp.forEach((prop, i) => {
                        item[prop] = value[i]
                    })
                })
            } else if (typeof value === 'function') {
                node.forEach(item => {
                    lastProp.forEach((prop, i) => {
                        item[prop] = value(prop, i)
                    })
                })
            } else {
                node.forEach(item => {
                    lastProp.forEach(prop => {
                        item[prop] = value
                    })
                })
            }
        } else {
            node.forEach(item => {
                item[lastProp] = value
            })
        }
        return obj
    }

    if (node && typeof node === 'object') {
        node[lastProp] = value
        return obj
    }

    return null
}

export default deepDiver
