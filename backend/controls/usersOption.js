const pool = require('../../database/base/pool')
const Report = require('../utils/reportSenter.js')

async function getUsers(req,res,next) {
    try{
        const query = await pool.query(`SELECT * FROM users RETURNING *`)
        const users = query.rows[0]
        if(!users)return Report(404, "No user found!", res)
        return Report(200, "User Data Fetched", users, res)
    }catch(err){
        next(err)
    }
}

async function profile(req,res,next) {
    try{
        const {id} = req?.params
        const query = await pool.query(`SELECT full_name, email, role, is_active, created_at FROM users WHERE id=$1`, [id])
        const user = query.rows[0]
        if(!user) return Report(404, "User not found!", res)
        return Report(200, "User Details", user, res)
    }catch(err){
        next(err)
    }
}

async function editUser(req,res,next) {
    try{
        const {full_name} = req.body
        const {id} = req.params
        const query = await pool.query(`UPDATE users SET full_name=$1 WHERE id=$2`,[full_name, id])
        if(query.rowCount == 0) return Report(402, "Cannot Update user!")
        return Report(201, "User Updated!", res)
    }catch(err){
        next(err)
    }
}
async function deleteUser(req,res,next) {
    try{
        const {id} = req.params
        const query = await pool.query(`DELETE FROM users WHERE id=$1`, [id])
        if(query.rowCount == 0) return Report(403, 'Cannot Delete user now!', res)
        return Report(200, "User Deleted!", res)
    }catch(err){
        next(err)
    }
}

module.exports = {
    getUsers,
    profile,
    editUser,
    deleteUser
}