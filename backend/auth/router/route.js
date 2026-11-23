const express = require('express')
const { signIn, signUp, refreshToken } = require('../controls/controls')
const registerSchema = require('../schema/signupSchema')
const loginSchema = require('../schema/loginSchema')
const validator = require('../middleware/validator')
const AuthRoutes = express.Router()

AuthRoutes.post('/signup', validator(registerSchema), signUp)
AuthRoutes.post('/signin', validator(loginSchema), signIn)
AuthRoutes.get('/refresh-token', refreshToken)

module.exports = AuthRoutes
