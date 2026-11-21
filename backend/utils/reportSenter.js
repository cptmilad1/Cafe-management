function Report(status, msg, data = [], res) {
    if (!res && data && typeof data.status === 'function' && typeof data.json === 'function') {
        res = data
        data = []
    }
    if (!res || typeof res.status !== 'function') return undefined
    return res.status(status).json({ msg, data })
}
module.exports = Report
