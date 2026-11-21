const jwt = require('jsonwebtoken')

function signToken(user, JWT_SECRET) {
    return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' })
}
module.exports = signToken
