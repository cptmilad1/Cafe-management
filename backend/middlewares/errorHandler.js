const AppError = require('../utils/appError')

function ErrorHandler(err, req, res, next) {
    if (res.headersSent) return next(err)

    let statusCode = err.statusCode || 500
    let message = err.message || 'Internal Server Error'

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        statusCode = 400
        message = 'Invalid JSON payload!'
    } else if (err.code === '23505') {
        statusCode = 409
        message = 'This record already exists!'
    } else if (err.code === '23503') {
        statusCode = 400
        message = 'Related record not found!'
    } else if (err.code === '23502' || err.code === '23514' || err.code === '22P02' || err.code === '22001') {
        statusCode = 400
        message = 'Invalid value provided!'
    } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        statusCode = 401
        message = 'Invalid or expired token!'
    }

    if (statusCode >= 500) console.error(err.stack)

    return res.status(statusCode).json({
        msg: message,
        data: []
    })
}
module.exports = ErrorHandler
