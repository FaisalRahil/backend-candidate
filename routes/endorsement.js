const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
//const {getElectionValidator, createElectionValidator, updateElectionValidator, toggleElectionStateValidator} = require('../middleware/')

const {getEndorsements, getEndorsement, createEndorsement, updateEndorsement, toggleEndorsementState} = require('../controllers/endorsement')


router.route('/endorsements').get(authenticate, authorize, getEndorsements)
router.route('/').post(authenticate, authorize, createEndorsement).get(authenticate, authorize, getEndorsement).put(authenticate, authorize, updateEndorsement)
router.route('/toggleEndorsementState').put(authenticate, authorize, toggleEndorsementState)


module.exports = router;