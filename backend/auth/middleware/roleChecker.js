const jwt = require("jsonwebtoken");
const Errors = require("../middleware/sentError");
const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";

async function CheckRole(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) return Errors(401, "Access denied. No token provided.", res);
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        if (req.user.role !== 'admin') return Errors(403, "Access denied. You do not have permission to perform this action.", res);
        next();
    } catch (err) {
        next(err);
    }
}
module.exports = CheckRole;