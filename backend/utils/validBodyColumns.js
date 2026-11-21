const AppError = require('./appError')

function validatorColumns(params, args) {
    const validInputs = [...args]
    const values = Array.isArray(params) ? params : [params]

    for (const value of values) {
        if (value !== undefined && value !== null && !validInputs.includes(value))
            throw new AppError(400, 'Invalid Data!')
    }
    return true
}
module.exports = validatorColumns
