const crypto = require('crypto-js')

const cryptoToken = async()=>{
    const key = await crypto.lib.WordArray.random(32)
    return key
}
module.exports = cryptoToken