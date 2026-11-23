require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const pool = require('../../utils/pool')
const signToken = require('../utils/signToken')
const insertToken = require('../utils/insertToken')
const getToken = require('../utils/getToken')
const Report = require('../../utils/reportSenter')
const AppError = require('../../utils/appError')
const cryptoToken = require('../../utils/crypto')

const JWT_SECRET = process.env.JWT_SECRET


async function createUser(body) {
    const {fullName, email, password} = body
    const token = cryptoToken()
    const passwordHash = await bcrypt.hash(password, 10)
    const result = await pool.query(
        `INSERT INTO users (full_name, email, password_hash)
         VALUES ($1, $2, $3)
         RETURNING id, full_name, email, role, is_active, created_at;`,
        [fullName, email, passwordHash]
    )
    const insertTokens = await pool.query(`INSERT INTO access_token(user_id, token) VALUES ($1, $2)`, [result.rows[0].id, token])
    if(result.rowCount == 0 && insertTokens.rowCount == 0){
        throw new AppError(404, "database error cannot add user")
    }
    return result.rows[0]
}

function sendAuth(res, status, msg, user) {
    const token = signToken(user, JWT_SECRET)
    insertToken(res, token)
    return Report(status, msg, { user, token }, res)
}

async function signUp(req, res, next) {
    try {
        const user = await createUser(req.body)
        return sendAuth(res, 201, 'User Created Successfully', user)
    } catch (err) {
        next(err)
    }
}


async function signIn(req, res, next) {
    try {
        const { email, password } = req.body
        if (!email || !password)
            throw new AppError(400, 'Email and password are required!')

        const result = await pool.query(
            `SELECT id, full_name, email, role, is_active, password_hash FROM users WHERE email=$1`,[email]
        )
        const user = result.rows[0]
        if (!user || !(await bcrypt.compare(String(password), user.password_hash)))
            throw new AppError(401, 'Invalid email or password!')
        if (!user.is_active)
            throw new AppError(403, 'This account is inactive!')
        const validUser = await pool.query(`select token from access_token where user_id=$1`,[user.id])
        if(validUser.rowCount == 0)
            throw new AppError(404, "User cannot Logged in!")
        delete user.password_hash
        const token = signToken(user, JWT_SECRET)
        insertToken(res, token)
        return sendAuth(res, 200, 'User signed in successfully', user)
    } catch (err) {
        next(err)
    }
}

async function refreshToken(req, res, next) {
    try {
        const token = getToken(req)
        if (!token) throw new AppError(401, 'No token provided!')
        const decoded = jwt.verify(token, JWT_SECRET)
        const user = { id: decoded.id, role: decoded.role }
        return sendAuth(res, 200, 'Token refreshed successfully', user)
    } catch (err) {
        next(err)
    }
}

module.exports = { signIn, signUp, refreshToken }
