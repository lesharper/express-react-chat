const knex = require('../db/knex')

class DiscussionService {

    async create(user) {
        try {
            return knex('discussions').insert(user).returning('*')
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getAll () {
        try {
            return knex('discussions')
        } catch (err) {
            console.log(err.stack)
        }
    }

    async findByOption(option) {
        try {
            return knex('discussions').where(option).first()

        } catch (err) {
            console.log(err.stack)
        }
    }

    async delete(id) {
        try {
            return knex('discussions').where({id}).del()
        } catch (err) {
            console.log(err.stack)
        }
    }

    async update(id, data) {
        try {
            return knex('discussions').where({id}).update(data).returning('*')
        } catch (err) {
            console.log(err.stack)
        }
    }

}

module.exports = new DiscussionService()
