const db = require("../db");


class DiscussionService {
    //Криво
    async create(title, description = null, password = null, anonymous, poster) {
        const query = {
            text: 'INSERT INTO discussions (title, description, password, anonymous, poster) values ($1, $2, $3, $4) RETURNING *',
            values: [title, description, password, anonymous, poster]
        }
        try {
            const res = await db.query(query)
            return res.rows[0]
        } catch (err) {
            console.log(err.stack)
        }
    }

    async getAll() {

    }

    async getOne(id) {

    }
}

module.exports = new DiscussionService()