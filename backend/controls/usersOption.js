const crudFactory = require('../factory/crudFactory')
const Report = require('../utils/reportSenter')

function withoutPassword(user) {
    const { password_hash, ...safeUser } = user
    return safeUser
}

async function getUsers(req, res) {
    const users = await crudFactory.get('users')
    return Report(200, 'User Data Fetched', users.map(withoutPassword), res)
}

async function profile(req, res) {
    const user = await crudFactory.getOne(req, 'users')
    return Report(200, 'User Details', withoutPassword(user), res)
}

async function editUser(req, res) {
    const user = await crudFactory.put(req, 'users')
    return Report(200, 'User Updated!', withoutPassword(user), res)
}

async function deleteUser(req, res) {
    const user = await crudFactory.delete(req, 'users')
    return Report(200, 'User Deleted!', withoutPassword(user), res)
}

module.exports = { getUsers, profile, editUser, deleteUser }
