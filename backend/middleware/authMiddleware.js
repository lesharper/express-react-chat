const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const config = require('../config.json')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") next()

    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token)
            next(ApiError.UNAUTHORIZED('Пользователь не авторизован'))
        const decoded = jwt.verify(token, config.SECRET)
        req.user = decoded
        next()
    }catch (err){
        next(ApiError.UNAUTHORIZED('Пользователь не авторизован'))
    }
}