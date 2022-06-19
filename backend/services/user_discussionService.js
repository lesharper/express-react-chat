const knex = require('../db/knex')

class DiscussionService {

    async create(option) {
        try {
            return knex('users_discussion').insert(option).returning('*')
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getAllByDiscussion (option) {
        try {
            return knex('users_discussion').where(option)
                .leftJoin('discussions', 'users_discussion.discussion_id', 'discussions.id')
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getAllByUser (option) {
        try {
            return knex('users_discussion').where(option)
                .leftJoin('users', 'users_discussion.user_id', 'users.id')
        } catch (err) {
            console.log(err.stack)
        }
    }

    async findByOption(option) {
        try {
            return knex('users_discussion').where(option).first()

        } catch (err) {
            console.log(err.stack)
        }
    }

    async delete(option) {
        try {
            return knex('users_discussion').where(option).del()
        } catch (err) {
            console.log(err.stack)
        }
    }
}

module.exports = new DiscussionService()
