'use strict'

const shajs = require('sha.js')
const defaults = require('defaults')

function sha256(str) {
    return shajs('sha256')
            .update(str)
            .digest('hex')
}

function clientPasswordHash(password, options) {
    if ( ! password ) {
        throw new Error("Password can't be empty")
    }

    options = defaults(options, {
        rounds: 250000
    })
    let { rounds } = options

    if ( ! rounds || rounds <= 0 ) {
        throw new Error(`Rounds should be a positive integer. "${rounds}" passed`)
    }

    let _hash = sha256(`${rounds}${password}`)

    while ( --rounds ) {
        _hash = sha256(`${rounds}${password}${_hash}`)
    }

    return _hash
}

module.exports = clientPasswordHash