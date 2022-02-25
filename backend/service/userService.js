const db = require('../db.js')
const jwt = require("jsonwebtoken");
const config = require("../config.json");

class UserService {

    async create(name, email, password, gender_id) {
        const query = {
            text: 'INSERT INTO users (name, email, password, gender_id) values ($1, $2, $3, $4) RETURNING *',
            values: [name, email, password, gender_id]
        }
        try {
            const res = await db.query(query)
            return res.rows[0]
        } catch (err) {
            console.log(err.stack)
        }
    }

    async findByEmail(email) {
        const query = {
            text: 'SELECT * FROM users WHERE email = $1',
            values: [email]
        }
        try {
            const res = await db.query(query)
            return res.rows[0]
        } catch (err) {
            console.log(err.stack)
        }
    }

    async delete() {

    }

    async update() {

    }

    generateJwt(id, name, email, role_id, gender_id) {
        return jwt.sign({id,name,email, role_id, gender_id}, config.SECRET, {expiresIn: '24h'})
    }
}

module.exports = new UserService()