require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const AuthRouter = require('../auth/router/route')
const factoryRouter = require('../factory/factory')
const ErrorHandler = require('../middlewares/errorHandler')
const Report = require('../utils/reportSenter')

const app = express()
const port = Number(process.env.PORT) || 4000
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: corsOrigin, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    const cookies = req.headers.cookie ? req.headers.cookie.split(';') : []
    req.cookies = {}
    for (const cookie of cookies) {
        const [name, ...rest] = cookie.trim().split('=')
        if (name) req.cookies[name] = decodeURIComponent(rest.join('='))
    }
    next()
})

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() })
})

app.use('/api/auth', AuthRouter)
app.use('/auth', AuthRouter)
app.use('/api', factoryRouter)
app.use('/', factoryRouter)

app.use((req, res) => Report(404, 'Route not found!', [], res))
app.use(ErrorHandler)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
