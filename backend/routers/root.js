const Router = require('express')
const userRouter = require('./userRouter')
const discussionRouter = require('./discussionRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/discussion', discussionRouter)
// router.use('/message', subcategoryRouter)

module.exports = router
