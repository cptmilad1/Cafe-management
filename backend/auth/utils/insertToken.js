function insertToken(req ,token) {
    return req.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
}
module.exports = insertToken;