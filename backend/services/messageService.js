const knex = require('../db/knex')

class DiscussionService {

    async create(message) {
        try {
            return knex('messages').insert(message).returning('*')
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getAllByOption (option) {
        try {
            return knex('messages').where(option)
                .leftJoin('users', 'messages.user_id', 'users.id')
                .select('users.*', 'messages.*' )
                .orderBy('messages.date_send')
        } catch (err) {
            console.log(err.stack)
        }
    }

    async findByOption(option) {
        try {
            return knex('messages').where(option).first()

        } catch (err) {
            console.log(err.stack)
        }
    }

    async delete(id) {
        try {
            return knex('messages').where({id}).del()
        } catch (err) {
            console.log(err.stack)
        }
    }

    async update(id, data) {
        try {
            return knex('messages').where({id}).update(data).returning('*')
        } catch (err) {
            console.log(err.stack)
        }
    }

}

module.exports = new DiscussionService()
