function getToken(req) {
    const authorization = req.headers.authorization || ''
    if (authorization.startsWith('Bearer '))
        return authorization.slice(7).trim()
    if (req.cookies && req.cookies.token)
        return req.cookies.token
    return null
}
module.exports = getToken
