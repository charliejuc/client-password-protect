const clientPasswordProtect = require('../')

const randomInt = (max) => Math.floor(Math.random() * max)

test('clientPasswordProtect should be a function', () => {
    expect(clientPasswordProtect)
        .toBeInstanceOf(Function)
})

test('Hash match snapshot', () => {
    expect(clientPasswordProtect('Hello'))
        .toMatchSnapshot()

    expect(clientPasswordProtect('dsaFdsfsa97 //sas 2342sadfsa dasfsa**'))
        .toMatchSnapshot()
})

test('Hash mismatch when change rounds', () => {
    expect(clientPasswordProtect('Hello', { rounds: 20000 }))
        .not
        .toBe(clientPasswordProtect('Hello', { rounds: randomInt(19999) + 1 }))

    expect(clientPasswordProtect('Hello', { rounds: 20000 }))
        .not
        .toBe(clientPasswordProtect('Hello', { rounds: 20001 + randomInt(20000) }))
})

test('Called with no params', () => {
    expect(() => clientPasswordProtect())
        .toThrow("Password can't be empty")
})

test('Password as empty string', () => {
    expect(() => clientPasswordProtect(''))
        .toThrow("Password can't be empty")
})

test('Rounds option as null', () => {
    expect(() => clientPasswordProtect('Hello', { rounds: null }))
        .toThrow('should be a positive integer')
})

test('Options as empty object({})', () => {
    expect(() => clientPasswordProtect('Hello', {}))
        .not
        .toThrow()

    expect(clientPasswordProtect('Hello', {}))
        .toBe(clientPasswordProtect('Hello'))
})

test('Rounds option as undefined', () => {
    expect(() => clientPasswordProtect('Hello', { rounds: undefined }))
        .not
        .toThrow()

    expect(clientPasswordProtect('Hello', { rounds: undefined }))
        .toBe(clientPasswordProtect('Hello'))
})