const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

const {getEelections, getElection, createElection, updateElection, toggleElectionState} = require('../controllers/election')


router.route('/elections').get(authenticate, authorize, getEelections)
router.route('/').post(authenticate, authorize, createElection).get(authenticate, authorize, getElection).put(authenticate, authorize, updateElection)
router.route('/toggleElectionState').put(authenticate, authorize, toggleElectionState)


module.exports = router;