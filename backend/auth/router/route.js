const express = require('express')
const { signIn, signUp, bootstrap, refreshToken } = require('../controls/controls')

const AuthRoutes = express.Router()

AuthRoutes.post('/signup', signUp)
AuthRoutes.post('/signin', signIn)
AuthRoutes.post('/login', signIn)
AuthRoutes.post('/bootstrap', bootstrap)
AuthRoutes.get('/refresh-token', refreshToken)

module.exports = AuthRoutes
