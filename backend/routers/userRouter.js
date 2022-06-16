const Router = require('express')
const userController = require('../controllers/userController')

const router = new Router()

//Все
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/check', userController.check)
router.get('/logout', userController.logout)
router.put('/update', userController.updateUser)

// //Администратор
// router.get('/all', userController.getAllUsers)
// router.delete('/remove/:id', userController.deleteUser)



module.exports = router
