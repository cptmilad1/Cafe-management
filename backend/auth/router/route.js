const express = require('express');
const { signIn, signUp, refreshToken } = require('../controls/controls');
const AuthRoutes = express.Router()

AuthRoutes.post('/signup', signUp)
AuthRoutes.post('/login', signIn)
AuthRoutes.get('/refresh-token', refreshToken)

module.exports =  AuthRoutes;