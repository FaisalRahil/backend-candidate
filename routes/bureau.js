const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const {getBureauValidator, createBureauValidator, updateBureauValidator,toggleBureauStateValidator, getBureausByRegionIDValidator, getBureausByElectionIDValidator} = require('../middleware/bureau')

const {getBureau, createBureau, updateBureau, getBureaus, toggleBureauState, getBureausByRegionID, getBureausByElectionID} = require('../controllers/bureau')

router.route('/').get(authenticate, authorize, getBureauValidator, getBureau).post(authenticate, authorize, createBureauValidator, createBureau).put(authenticate, authorize, updateBureauValidator, updateBureau)
router.route('/bureaus').get(authenticate, authorize, getBureaus)
router.route('/toggleBureauState').put(authenticate, authorize, toggleBureauStateValidator,toggleBureauState)
router.route('/getBureausBasedOnRegion').get(authenticate, authorize, getBureausByRegionIDValidator, getBureausByRegionID)
router.route('/getBureausBasedOnElection').get(authenticate, authorize, getBureausByElectionIDValidator, getBureausByElectionID)

module.exports = router;