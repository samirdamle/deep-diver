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
     * @param {string | Array}    path=[ ]          Path of the value specified as string -
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

    // if value is not provided, deepDiver will fetch and return the value of the node at the path given in pathArray
    const get = (srcObject, path) => {
        /* const getValueAtProp = (node, prop) => {
            return node[prop]
        } */

        const pathArray = typeof path === 'string' ? path.split('.') : Array.isArray(path) ? path : []
        return pathArray.reduce((item, prop) => {
            // console.log('item = ')
            // console.log(item)
            if (item && prop != null) {
                // filter item array if prop is a filter callback
                if (Array.isArray(item)) {
                    if (typeof prop === 'function') {
                        return item.filter(prop)
                    }

                    if (typeof prop === 'number') {
                        return item[prop]
                    }

                    if (Array.isArray(prop)) {
                        return item.map(node =>
                            prop.reduce((returnObj, key) => {
                                returnObj[key] = node[key]
                                return returnObj
                            }, {}),
                        )
                    }
                    return item.map(node => node[prop])
                }
                return item[prop]
            }
            return null
        }, srcObject)
    }

    if (value === undefined) {
        return get(obj, pathArg)
    }
    // if value is provided, deepr will set the value of the node at the path given in pathArray
    const [lastProp] = pathArg.slice(-1)
    const node = get(obj, pathArg.slice(0, -1))

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
