const userService = require('../services/userService')
const bcrypt = require("bcrypt");
const uuid = require('uuid')
const path = require('path')

class UserController {

    async registration(req, res) {
        const {username, email, password} = req.body
        const {avatar} = req.files
        const fileName = uuid.v4() + `.${avatar.mimetype.split('/')[1]}`

        if (!username || !password) return res.json({error: 'Некорректные данные'})

        const candidate = await userService.findByOption({email})

        if (candidate) return res.json({error: 'Пользователь уже существует'})

        const hashPassword = await bcrypt.hash(password, 5)

        avatar.mv(path.resolve(__dirname, '..', 'static', fileName))

        const user = await userService.create({username, email, password: hashPassword, avatar: fileName})
        req.session.user = {...user[0], password: ''};
        return res.json({...user[0], password: ''})
    }

    async login(req, res) {
        const {email, password} = req.body
        const user = await userService.findByOption({email})

        if (!user) return res.json({error: 'Пользователя не существует'})

        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) return res.json({error: 'Не верный пароль'})

        req.session.user = {...user, password: ''};
        return res.json({...user, password: ''})
    }

    async check(req, res) {
        if (req.session.user)
            return res.json(req.session.user);
        else
            return res.json({error: 'Пользователь не авторизован'});
    }

    async logout(req, res) {
        if (req.session.user) {
            res.clearCookie("user");
            res.status(200).json({isAuth: false});
        }
    }

    async updateUser(req, res) {
        const {username, email, password} = req.body
        const {avatar} = req.files

        const fileName = uuid.v4() + `.${avatar.mimetype.split('/')[1]}`
        const user_id = req.session.user.id

        if (!username || !password) return res.json({error: 'Некорректные данные'})

        const candidate = await userService.findByOption({email})

        if (candidate) return res.json({error: 'Пользователь уже существует'})

        const hashPassword = await bcrypt.hash(password, 5)
        avatar.mv(path.resolve(__dirname, '..', 'static', fileName))

        const newUser = await userService.update(user_id, {username, email, password: hashPassword, avatar: fileName})
        req.session.user = {...newUser[0], password: ''};
        return res.json({...newUser[0], password: ''})
    }
}

module.exports = new UserController()
