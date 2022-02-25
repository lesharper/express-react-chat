const ApiError = require('../error/ApiError')
const userService = require('../service/userService')
const bcrypt = require('bcrypt')

class UserController {

    async registration(req, res, next) {
        const {name, email, password, gender_id} = req.body

        if(!email || !password)
            return next(ApiError.BAD_REQUEST('Некорректный email или password'))

        const candidate = await userService.findByEmail(email)

        if(candidate)
            return next(ApiError.BAD_REQUEST('Пользователь уже существует'))

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await userService.create(name, email, hashPassword, gender_id)
        const token = userService.generateJwt(user.id, name, email, user.role_id, gender_id)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await userService.findByEmail(email)

        if(!user)
            return next(ApiError.BAD_REQUEST('Пользователя не существует'))

        let comparePassword = bcrypt.compareSync(password, user.password)

        if(!comparePassword)
            return next(ApiError.BAD_REQUEST('Указан не верный пароль'))

        const token = userService.generateJwt(user.id, user.name, email, user.role_id, user.gender_id)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = userService.generateJwt(req.user.id, req.user.name, req.user.email, req.user.role_id, req.user.gender_id)
        return res.json({token})
    }
}

module.exports = new UserController()