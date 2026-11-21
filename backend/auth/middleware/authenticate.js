require('dotenv').config()
const jwt = require('jsonwebtoken')
const getToken = require('../utils/getToken')
const AppError = require('../../utils/appError')

const JWT_SECRET = process.env.JWT_SECRET || 'my_super_secret_key'

function Authenticator(req, res, next) {
    try {
        const token = getToken(req)
        if (!token) return next(new AppError(401, 'ReLogin required'))
        req.user = jwt.verify(token, JWT_SECRET)
        next()
    } catch (err) {
        next(err)
    }
}
module.exports = Authenticator
