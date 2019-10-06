const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token')

    // Check if not token
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied.' })

    try {
        // Nếu token ko hợp lệ thì vô catch
        const decodedPayload = jwt.verify(token, config.get('jwtSecret'))

        req.user = decodedPayload.user

        next()
    } catch (err) {
        console.error(err)
        res.status(401).json({ msg: 'Invalid token.' })
    }
}