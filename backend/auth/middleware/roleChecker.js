const AppError = require('../../utils/appError')

function CheckRole(req, res, next) {
    if (!req.user) return next(new AppError(401, 'ReLogin required'))
    if (req.user.role !== 'admin')
        return next(new AppError(403, 'Access denied. You do not have permission to perform this action.'))
    next()
}
module.exports = CheckRole
