const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')


const {getRegion, getRegions, getRegionsByElectionID,createRegion, updateRegion, toggleRegionState} = require('../controllers/region')

router.route('/regions').get(authenticate, authorize, getRegions)
router.route('/').post(authenticate, authorize, createRegion).get(authenticate, authorize, getRegion).put(authenticate, authorize, updateRegion)
router.route('/toggleRegionState').put(authenticate, authorize, toggleRegionState)
router.route('/regionsByElection').get(authenticate, authorize, getRegionsByElectionID)

module.exports = router;