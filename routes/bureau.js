const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

const {getBureau, createBureau, updateBureau, getBureaus, toggleBureauState, getBureausByRegionID, getBureausByElectionID} = require('../controllers/bureau')

router.route('/').get(authenticate, authorize, getBureau).post(authenticate, authorize,createBureau).put(authenticate, authorize, updateBureau)
router.route('/bureaus').get(authenticate, authorize, getBureaus)
router.route('/toggleBureauState').put(authenticate, authorize, toggleBureauState)
router.route('/getBureausBasedOnRegion').get(authenticate, authorize, getBureausByRegionID)
router.route('/getBureausBasedOnElection').get(authenticate, authorize, getBureausByElectionID)

module.exports = router;