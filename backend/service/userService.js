const db = require('../db.js')
const jwt = require("jsonwebtoken");
const config = require("../config.json");

class UserService {

    async create(username, email, password, avatar) {
        const query = {
            text: 'INSERT INTO users (username, email, password, avatar) values ($1, $2, $3, $4) RETURNING *',
            values: [username, email, password, avatar]
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

    generateJwt(id, username, email, avatar) {
        return jwt.sign({id,username,email,avatar}, config.SECRET, {expiresIn: '24h'})
    }
}

module.exports = new UserService()