require('dotenv').config();
const pool = require('../../../database/base/pool');
const signToken = require('../utils/signToken');
const Errors = require('../middleware/sentError')
const insertToken = require('../utils/insertToken')
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";


async function signUp(req, res, next) {
    try{
        const {Full_name, username, email, password} = req.body;
        const normalizedEmail = email.toLowerCase();
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = await pool.query(
            `INSERT INTO users (Full_name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
            [Full_name, username, normalizedEmail, hashedPassword]
        );
        if(!query.rows[0]) return Errors(400, "User not created", res);
        res.status(201).json({ msg: "User created successfully", user: query.rows[0] });
    }catch(err){
        next(err)
    }
}
async function signIn(req, res, next) {
    try{
        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase();
        const query = await pool.query(`SELECT * FROM users WHERE email = $1 RETURNING *`, [normalizedEmail]);
        const user = query.rows[0];
        if(!user) return Errors(404, "User not found", res);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return Errors(401, "Invalid password", res);
        const token = signToken(user, JWT_SECRET);
        insertToken(req, token)
        res.status(200).json({ msg: "User signed in successfully"});
    }catch(err){
        next(err)
    }
}
async function refreshToken(req, res, next) {
    try{
        const token = req.cookies.token;
        if(!token) return Errors(401, "No token provided", res);
        const decoded = jwt.verify(token, JWT_SECRET);
        const newToken = signToken(decoded, JWT_SECRET);
        insertToken(req, newToken)
        res.status(200).json({ msg: "Token refreshed successfully"});
    }catch(err){
        next(err)
    }
}



module.exports = {
    signIn,
    signUp,
    
}