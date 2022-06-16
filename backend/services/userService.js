const knex = require('../db/knex')


class UserService {
    async create(user) {
        try {
            return knex('users').insert(user).returning('*')
        } catch (err) {
            console.log(err.stack)
        }
    }

    async findByOption(option) {
        try {
            return knex('users').where(option).first()

        } catch (err) {
            console.log(err.stack)
        }
    }

    async delete(id) {
        try {
            return knex('users').where({id}).del()
        } catch (err) {
            console.log(err.stack)
        }
    }

    async update(id, data) {
        try {
            return knex('users').where({id}).update(data).returning('*')
        } catch (err) {
            console.log(err.stack)
        }
    }

}

module.exports = new UserService()
