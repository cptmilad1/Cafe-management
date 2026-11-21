const test = require('node:test')
const assert = require('node:assert/strict')
const AppError = require('../utils/appError')
const Report = require('../utils/reportSenter')
const validatorColumns = require('../utils/validBodyColumns')

function fakeResponse() {
    return {
        statusCode: null,
        payload: null,
        status(code) {
            this.statusCode = code
            return this
        },
        json(payload) {
            this.payload = payload
            return this
        }
    }
}

test('AppError exposes status code and operational flag', () => {
    const error = new AppError(404, 'Not found')
    assert.equal(error.statusCode, 404)
    assert.equal(error.status, 'fail')
    assert.equal(error.isOperational, true)
})

test('Report sends msg and data with the response', () => {
    const res = fakeResponse()
    Report(200, 'OK', [1, 2], res)
    assert.equal(res.statusCode, 200)
    assert.deepEqual(res.payload, { msg: 'OK', data: [1, 2] })
})

test('Report tolerates a response passed in the data slot', () => {
    const res = fakeResponse()
    Report(201, 'Created', res)
    assert.equal(res.statusCode, 201)
    assert.deepEqual(res.payload, { msg: 'Created', data: [] })
})

test('validatorColumns accepts allowed and missing values', () => {
    assert.equal(validatorColumns('available', ['available', 'occupied']), true)
    assert.equal(validatorColumns(undefined, ['available']), true)
    assert.equal(validatorColumns(['available', 'occupied'], ['available', 'occupied']), true)
})

test('validatorColumns rejects unknown values', () => {
    assert.throws(() => validatorColumns('unknown', ['available']), AppError)
})
