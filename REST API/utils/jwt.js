const jwt = require('jsonwebtoken');
const config = require('../config/config');

function createToken(data) {
    return jwt.sign(data, config.jwtSecret, { expiresIn: '1h' });
}

function verifyToken(token) {
    return jwt.verify(token, config.jwtSecret)
}

module.exports = {
    createToken,
    verifyToken
}
