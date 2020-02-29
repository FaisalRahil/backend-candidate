const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const {getElectionValidator, createElectionValidator, updateElectionValidator, toggleElectionStateValidator} = require('../middleware/election')

const {getEelections, getElection, createElection, updateElection, toggleElectionState} = require('../controllers/election')


router.route('/elections').get(authenticate, authorize, getEelections)
router.route('/').post(authenticate, createElectionValidator, authorize, createElection).get(authenticate, authorize, getElectionValidator, getElection).put(authenticate, authorize, updateElectionValidator, updateElection)
router.route('/toggleElectionState').put(authenticate, authorize, toggleElectionStateValidator, toggleElectionState)


module.exports = router;