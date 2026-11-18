const pool = require('../../database/base/pool')
const AppError = require('../utils/appError.js')
const Report = require('../utils/reportSenter.js')
const crudFactory = require('../factory/crudFactory.js')

function getUsers(req,res) {
        const query = crudFactory.get('users')
        return Report(200, "User Data Fetched", query, res)
}

function profile(req,res) {
        const query = crudFactory.getOne(req, 'users')
        const user = query.map((user)=>({
                id : user.id,
                full_name : user.full_name,
                email : user.email,
                role : user.role,
                is_active : user.is_active,
                created_at : user.created_at
        }))
        if(!user) throw new AppError(404, "User not found!")
        return Report(200, "User Details", {user}, res)
}

async function addUser(req, res){
        const {full_name, email, password} = req.body
        const hashedPassword = bcrypt.hash(password, 10)
        const normlizeEmail = email.trim().toLowerCase()
        const query = await pool.query(`INSERT INTO users 
                (full_name, email, password)
                VALUES($1, $2, $3)
                `, [full_name, normlizeEmail, hashedPassword])
        if(query.rowCount == 0) return AppError(404, "Invalid user data")
        return Report(201, "User Added", res)
}

async function login(req, res) {
        const {email, password} = req.body
        const normlizeEmail = email.trim().toLowerCase()
        const emailExists = await pool.query(`SELECT email, password_hash FROM users WHERE email=$1`, [normlizeEmail])
        if(emailExists.rowCount == 0) return AppError(404, 'Invalid email or password')
        const comparePassword = bcrypt.compare(password, emailExists.password_hash)
        if(!comparePassword) return AppError(404, "Invalid email or password") 
        return Report(200, "user logged in", res)
}

function editUser(req,res) {
        crudFactory.put(req, 'users')
        return Report(201, "User Updated!", res)
}

function deleteUser(req,res) {
        crudFactory.delete(req, 'users')
        return Report(200, "User Deleted!", res)
}

module.exports = {
    addUser,
    login,
    getUsers,
    profile,
    editUser,
    deleteUser
}