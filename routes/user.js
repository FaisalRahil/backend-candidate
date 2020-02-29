const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

const {getUserValidator} = require('../middleware/user')
const { createUser, getUser, getUsers, updateUser, toggleUserState, logout } = require('../controllers/User')

router.route('/users').get(authenticate, authorize,getUsers)
router.route('/').post(authenticate, authorize, createUser).get(getUserValidator, getUser).put(authenticate, authorize,updateUser)
router.route('/toggleUserState').put(authenticate, authorize, toggleUserState)
router.route('/logout').get(logout)

module.exports = router;