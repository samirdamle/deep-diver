const defaultAwesomeFunction = name => {
    const returnStr = `I am the default function! - ${name}`
    return returnStr
}

const awesomeFunction = () => 'I am just an awesome function.'

export default defaultAwesomeFunction

export { awesomeFunction }
