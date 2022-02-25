const express = require('express');
const config = require("./config.json")
const app = express();


app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(config.port, () => {
    console.log(`SERVER HAS BEEN STARTED - ${config.port} PORT`)
})