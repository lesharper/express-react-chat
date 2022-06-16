const express = require('express');
const path = require("path");
const session = require("express-session");
const fileUpload = require('express-fileupload')
const cookieParser = require("cookie-parser");

const config = require('./config.json')
const router = require('./routers/root')
const cors = require("./middleware/cors");


const app = express();

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
app.use('/api', router)

app.listen(config.PORT, () => {
    console.log(`Server started on port: ${config.PORT}`)
})
