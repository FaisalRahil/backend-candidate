const express = require('express')
const router = express.Router()
const authonticate = require('../middleware/authentication')

const { creatUser, getUser, getUsers, updateUser, changeUserState, logout } = require('../controllers/User')

router.route('/users').get(authonticate,getUsers)
router.route('/').post(creatUser).get(getUser).put(authonticate,updateUser)
router.route('/toggleUserState').put(authonticate, changeUserState)
router.route('/logout').get(authonticate, logout)

module.exports = router;