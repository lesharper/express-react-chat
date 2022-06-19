const discussionService = require('../services/discussionService')
const user_discussionService = require('../services/user_discussionService')
const uuid = require('uuid')
const path = require('path')


class DiscussionController {

    async addDiscussion(req, res) {
        try {
            const {title, description, password, anonymous} = req.body
            const {poster} = req.files
            const user_id = req.session.user.id
            if (!user_id)
                return res.json({error: 'Ошибка авторизации'})

            let fileName = uuid.v4() + `.${poster.mimetype.split('/')[1]}`
            poster.mv(path.resolve(__dirname, '..', 'static', fileName))


            const discussion = await discussionService.create({title, description, password, anonymous, poster: fileName, creator_id: user_id})
            const user_discussion = await user_discussionService.create({user_id, discussion_id: discussion[0].id})
            return res.json({message: 'Беседа создана'})
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getAllDiscussions(req, res) {
        try {
            const products = await discussionService.getAll()
            return res.json(products)
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getDiscussionsByUser(req, res) {
        try {
            const user_id = req.session.user.id
            if (!user_id)
                return res.json({error: 'Ошибка авторизации'})
            const products = await user_discussionService.getAllByDiscussion({user_id})
            return res.json(products)
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getUsersByDiscussion(req, res) {
        try {
            const {id} = req.params
            if (!id)
                return res.json({error: 'Некорректные данные'})
            const products = await user_discussionService.getAllByUser({discussion_id: id})
            return res.json(products)
        } catch (err) {
            console.log(err.stack)
        }
    }

    async deleteDiscussion(req, res) {
        try {
            const {id} = req.params
            await discussionService.delete(id)
            return res.json({messages: `Продукт ${id} удален`})
        } catch (err) {
            console.log(err.stack)
        }
    }

    async joinDiscussion(req, res) {
        try {
            const user_id = req.session.user.id
            const {discussion_id} = req.body
            if (!user_id)
                return res.json({error: `Ошибка авторизации`})
            await user_discussionService.create({user_id, discussion_id})
            return res.json({messages: `Пользователь ${user_id} добавлен в беседу`})
        } catch (err) {
            console.log(err.stack)
        }
    }

    async leaveDiscussion(req, res) {
        try {
            const {id} = req.params
            await discussionService.delete(id)
            return res.json({messages: `Продукт ${id} удален`})
        } catch (err) {
            console.log(err.stack)
        }
    }

    async updateDiscussion(req, res) {
        try {
            const {id, title, description, password, anonymous} = req.body
            const {poster} = req.files
            const user_id = req.session.user.id

            if (!user_id)
                return res.json({error: 'Ошибка авторизации'})

            const candidate = await discussionService.findByOption({title, description, password, anonymous})
            if (candidate)
                return res.json({error: `Продукт уже существует`})

            let fileName = uuid.v4() + `.${poster.mimetype.split('/')[1]}`
            poster.mv(path.resolve(__dirname, '..', 'static', fileName))

            await discussionService.update(id, {title, description, password, anonymous, poster: fileName, creator_id: user_id})

            return res.json({messages: `Продукт ${id} обновлен`})
        } catch (err) {
            console.log(err.stack)
        }
    }

}

module.exports = new DiscussionController()
