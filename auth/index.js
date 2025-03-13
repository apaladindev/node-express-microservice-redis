const jwt = require('jsonwebtoken');
const config = require('./../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        // console.log(decoded);
        // console.log('check owner: ' + owner);

        if (decoded.id !== owner) {
            throw error('Action not allowed', 401);
        }
    },
    logged: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
        
    },
}

function getToken(auth) {
    if (!auth) {
        throw error('Token not found', 400);
    }
    if (auth.indexOf('Bearer') === -1) {
        throw error('Invalid token', 401);
    }
    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoder = verify(token);
    req.user = decoder;

    return decoder;
}

module.exports = { sign, check };