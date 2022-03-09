const Router = require('express')
const userRouter = require('./userRouter')
const discussionRouter = require('./dicussionRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/discussion', discussionRouter)

module.exports = router