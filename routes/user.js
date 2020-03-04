const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

const {getUserValidator,
       createUserValidator,
       updatePasswordValidator,
       updateUserValidator,
       toggleUserStateValidator} = require('../middleware/user')
const { createUser, getUser, getUsers, updateUser, updatePassword ,toggleUserState, logout } = require('../controllers/User')

router.route('/users').get(authenticate, authorize,getUsers)
router.route('/').post(authenticate, authorize, createUserValidator, createUser).get(getUserValidator, getUser).put(authenticate, authorize, updateUserValidator, updateUser)
router.route('/toggleUserState').put(authenticate, authorize, toggleUserStateValidator, toggleUserState)
router.route('/forgotPassword').put(authenticate, authorize, updatePasswordValidator, updatePassword)
router.route('/logout').get(logout)

module.exports = router;