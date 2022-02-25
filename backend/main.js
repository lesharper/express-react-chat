const express = require('express');
const cors = require('cors')
const config = require('./config.json')
const router = require('./routes/root')
const errorHandler = require('./middleware/errorMiddleware')
const app = express();

app.use(cors())
app.use(express.json())
app.use('/api', router)

//Обработка ошибок. Всегда последняя
app.use(errorHandler)

app.listen(config.PORT, () => {
    console.log(`Server started on port: ${config.PORT}`)
})