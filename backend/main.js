const express = require('express');
const http = require('http')
const path = require("path");
const session = require("express-session");
const fileUpload = require('express-fileupload')
const cookieParser = require("cookie-parser");
const {Server} = require('socket.io')

const config = require('./config.json')
const router = require('./routers/root')
const cors = require("./middleware/cors");
const socket = require('./socket')

const app = express();
const server = http.createServer(app)

app.use(cors)
app.use(express.json())
app.use(fileUpload())
app.use(cookieParser(config.SECRET));
app.use(express.static(path.join(`${__dirname}/static`)));
app.use(
    session({
        key: "user",
        secret: config.SECRET,
        resave: false,
        saveUninitialized: false,
        domain: "http://localhost",
        path: "/",
        cookie: { maxAge: 86400000, httpOnly: true },
    })
);

const io = new Server(server, {
    cookie: true,
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

socket(io)
app.use('/api', router)


server.listen(config.PORT, () => {
    console.log(`Server started on port: ${config.PORT}`)
})
