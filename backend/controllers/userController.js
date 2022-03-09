const ApiError = require('../error/ApiError')
const userService = require('../service/userService')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const path = require('path')

class UserController {

    async registration(req, res, next) {
        try {
            const {username, email, password} = req.body
            const {avatar} = req.files
            let fileName = uuid.v4() + '.jpg'
            avatar.mv(path.resolve(__dirname, '..', 'static', fileName))

            if(!email || !password)
                return next(ApiError.BAD_REQUEST('Некорректный email или password'))

            const candidate = await userService.findByEmail(email)

            if(candidate)
                return next(ApiError.BAD_REQUEST('Пользователь уже существует'))

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await userService.create(username, email, hashPassword, fileName)
            const token = userService.generateJwt(user.id, username, email, user.avatar)
            return res.json({token})
        } catch (err) {
            return next(ApiError.BAD_REQUEST(err.message))
        }

    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await userService.findByEmail(email)

            if(!user)
                return next(ApiError.BAD_REQUEST('Пользователя не существует'))

            let comparePassword = bcrypt.compareSync(password, user.password)

            if(!comparePassword)
                return next(ApiError.BAD_REQUEST('Указан не верный пароль'))

            const token = userService.generateJwt(user.id, user.username, email, user.avatar)
            return res.json({token})
        } catch (err) {
            return next(ApiError.BAD_REQUEST(err.message))
        }
    }

    async check(req, res, next) {
        const token = userService.generateJwt(req.user.id, req.user.username, req.user.email, req.user.avatar)
        return res.json({token})
    }
}

module.exports = new UserController()