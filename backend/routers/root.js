const Router = require('express')
const userRouter = require('./userRouter')

const router = new Router()

router.use('/user', userRouter)
// router.use('/discussion', categoryRouter)
// router.use('/message', subcategoryRouter)

module.exports = router
