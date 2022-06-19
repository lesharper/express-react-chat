const Router = require('express')
const discussionController = require('../controllers/discussionController')

const router = new Router()

//Все
router.post('/add', discussionController.addDiscussion)
router.get('/all', discussionController.getAllDiscussions)
router.put('/update', discussionController.updateDiscussion)
router.delete('/remove/:id', discussionController.deleteDiscussion)
router.get('/byUser', discussionController.getDiscussionsByUser)
router.get('/byDiscussion/:id', discussionController.getUsersByDiscussion)
router.post('/join', discussionController.joinDiscussion)
router.delete('/leave/:id', discussionController.leaveDiscussion)


// //Администратор
// router.get('/all', userController.getAllUsers)
// router.delete('/remove/:id', userController.deleteUser)



module.exports = router
