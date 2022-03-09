const Router = require('express')
const discussionController = require('../controllers/dicsussionController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/create', discussionController.create)
router.get('/discussions', discussionController.getAll)
router.get('/discussions/:id', discussionController.getOne)


module.exports = router