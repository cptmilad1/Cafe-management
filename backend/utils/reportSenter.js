const Report = (status, msg, data=[], res)=>{
    return res.status(status).json({msg, data});
}
module.exports = Report;