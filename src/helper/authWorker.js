const jwt = require('jsonwebtoken');

const generateToken = (payload) =>{
    const verifyOpts ={
        expiresIn: "1day",
        issuer: 'lihat2'
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, verifyOpts)
    return token
}

const generateRefreshToken = (payload) =>{
    const verifyOpts = {
        expiresIn: "1day",
        issuer: 'Hiring'
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, verifyOpts)
    return token
}

module.exports = {
    generateToken,
    generateRefreshToken
}