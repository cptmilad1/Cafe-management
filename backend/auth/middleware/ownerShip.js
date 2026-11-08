const Report = require("../../utils/reportSenter")

function OwnerShip(userRole){
    return function (req,res,next){
        if(req.user.role !== userRole || req.user.id !== req.params.id)
            return Report(403, "Access Denied!", res)
        next()
    }
}
module.exports = OwnerShip