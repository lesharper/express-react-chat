const ApiError = require('../error/ApiError')
const discussionService = require('../service/discussionService')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const path = require('path')

class UserController {

    async create(req, res, next) {
        //Криво
        try {
            const {title, description, password, anonymous} = req.body
            const {poster} = req.files
            let fileName = uuid.v4() + '.jpg'
            poster.mv(path.resolve(__dirname, '..', 'static', fileName))

            if(!title )
                return next(ApiError.BAD_REQUEST('Некорректный title'))
            if(password) {
                const hashPassword = await bcrypt.hash(password, 5)
            }
            const discussion = await discussionService.create(title, description, hashPassword, anonymous, fileName)
            return res.json({token})
        } catch (err) {
            return next(ApiError.BAD_REQUEST(err.message))
        }

    }

    async getAll(req, res, next) {

    }

    async getOne(req, res, next) {
    }
}

module.exports = new UserController()