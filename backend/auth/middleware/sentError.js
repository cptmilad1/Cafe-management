const Errors = (status, msg , res)=>{
    return res.status(status).json({error: msg});
}
module.exports = Errors;