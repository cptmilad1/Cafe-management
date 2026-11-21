const AppError = require('../../utils/appError')

function OwnerShip(req, res, next) {
    if (!req.user) return next(new AppError(401, 'ReLogin required'))
    const isOwner = String(req.user.id) === String(req.params.id)
    if (!isOwner && req.user.role !== 'admin')
        return next(new AppError(403, 'Access Denied!'))
    next()
}
module.exports = OwnerShip
