const AppError = require("./appError")

function validatorColumns (params, args){
    const validInputs = [...args]
    if(!params.includes(validInputs))
        throw new AppError(404, "Invalid Data!")
}
module.exports = validatorColumns