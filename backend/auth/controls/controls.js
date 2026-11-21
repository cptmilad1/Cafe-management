require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const pool = require('../../../database/base/pool')
const signToken = require('../utils/signToken')
const insertToken = require('../utils/insertToken')
const getToken = require('../utils/getToken')
const Report = require('../../utils/reportSenter')
const AppError = require('../../utils/appError')

const JWT_SECRET = process.env.JWT_SECRET || 'my_super_secret_key'

function validateCredentials(body) {
    const fullName = body.full_name || body.Full_name
    const { email, password } = body
    if (!fullName || typeof fullName !== 'string' ||
        !email || typeof email !== 'string' ||
        !password || typeof password !== 'string' || password.length < 6)
        throw new AppError(400, 'full_name, email and password (min 6 chars) are required!')
    return { fullName, email: email.toLowerCase().trim(), password }
}

async function createUser(body, role) {
    const { fullName, email, password } = validateCredentials(body)
    const passwordHash = await bcrypt.hash(password, 10)
    const result = await pool.query(
        `INSERT INTO users (full_name, email, password_hash, role)
         VALUES ($1, $2, $3, $4)
         RETURNING id, full_name, email, role, is_active, created_at`,
        [fullName, email, passwordHash, role]
    )
    return result.rows[0]
}

function sendAuth(res, status, msg, user) {
    const token = signToken(user, JWT_SECRET)
    insertToken(res, token)
    return Report(status, msg, { user, token }, res)
}

async function signUp(req, res, next) {
    try {
        const user = await createUser(req.body, 'user')
        return sendAuth(res, 201, 'User Created Successfully', user)
    } catch (err) {
        next(err)
    }
}

async function bootstrap(req, res, next) {
    try {
        const count = await pool.query('SELECT COUNT(*)::int AS total FROM users')
        if (count.rows[0].total > 0)
            throw new AppError(403, 'Bootstrap is only allowed when no users exist!')
        const admin = await createUser(req.body, 'admin')
        return sendAuth(res, 201, 'Admin created successfully', admin)
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
            `SELECT id, full_name, email, role, is_active, password_hash FROM users WHERE email=$1`,
            [String(email).toLowerCase().trim()]
        )
        const user = result.rows[0]
        if (!user || !(await bcrypt.compare(String(password), user.password_hash)))
            throw new AppError(401, 'Invalid email or password!')
        if (!user.is_active)
            throw new AppError(403, 'This account is inactive!')

        delete user.password_hash
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

module.exports = { signIn, signUp, bootstrap, refreshToken }
