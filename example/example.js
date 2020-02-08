/* eslint-disable no-console */
import defaultAwesomeFunction, { awesomeFunction } from '../lib'

const defaultVal = defaultAwesomeFunction('Samir')
const val = awesomeFunction()

// defaultVal === 'I am the Default Awesome Function, fellow comrade! - Samir'
console.log(defaultVal)
// val === 'I am just an Awesome Function'
console.log(val)
