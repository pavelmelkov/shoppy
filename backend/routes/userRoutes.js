const express = require('express')
const router = express.Router()
const {protect, admin} = require('../middleware/authMiddleware')

const {getUserProfile} = require('../controllers/userController')
const {authUser} = require('../controllers/userController')
const {registerUser} = require('../controllers/userController')
const {updateUserProfile} = require('../controllers/userController')
const {getUsers} = require('../controllers/userController')
const {deleteUser} = require('../controllers/userController')
const {getUserById} = require('../controllers/userController')
const { updateUser } = require('../controllers/userController')

router.route('/').get(protect, admin, getUsers)
router.post('/login' , authUser)
router.route('/').post(registerUser)
router.route('/profile')
        .get(protect, getUserProfile)
        .put(protect, updateUserProfile)
router.route('/:id')
        .delete(protect, admin, deleteUser)
        .put(protect, admin, updateUser)
        .get(protect, admin, getUserById)


module.exports = router