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
        rounds: 20000
    })
    const { rounds } = options

    if ( ! rounds || rounds <= 0 ) {
        throw new Error(`Rounds should be a positive integer. "${rounds}" passed`)
    }

    let currentRound = 0
    let prevHash = ''
    let _hash = ''

    while (currentRound < rounds) {
        prevHash = _hash = sha256(`${currentRound}${prevHash}${password}`)
        ++currentRound
    }

    return _hash
}

module.exports = clientPasswordHash
