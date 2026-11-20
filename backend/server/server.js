require('dotenv').config()
const express = require('express')
const app = express()
const AuthRouter = require('../auth/router/route')
const factoryRouter = require('../factory/factory')
const ErrorHandler = require('../middlewares/errorHandler')


app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/auth', AuthRouter)
app.use('/', factoryRouter)


app.use(ErrorHandler)

app.listen(3000, ()=>{
    console.log(3000)
})