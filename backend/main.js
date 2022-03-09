const express = require('express');
const cors = require('cors')
const config = require('./config.json')
const router = require('./routes/root')
const errorHandler = require('./middleware/errorMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

//Обработка ошибок. Всегда последняя
app.use(errorHandler)

app.listen(config.PORT, () => {
    console.log(`Server started on port: ${config.PORT}`)
})