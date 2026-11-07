require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key"

function Authenticator(req,res,next){
    try {
        const token = req.cookies.token;
        if (!token) return Errors(401, "ReLogin required", res);
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        next(err);
    }
}
module.exports = Authenticator;