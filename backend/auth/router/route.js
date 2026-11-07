const express = require('express');
const { signIn, signUp } = require('../controls/controls');
const AuthRoutes = express.Router()

AuthRoutes.post('/signup', signUp)
AuthRoutes.post('/login', signIn)

module.exports =  AuthRoutes;