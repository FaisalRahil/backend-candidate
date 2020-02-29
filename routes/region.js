const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const {getRegionValidator,createRegionValidator, updateRegionValidator, toggleRegionStateValidator, getRegionsByElectionIDValidator} = require('../middleware/region')


const {getRegion, getRegions, getRegionsByElectionID,createRegion, updateRegion, toggleRegionState} = require('../controllers/region')

router.route('/regions').get(authenticate, authorize, getRegions)
router.route('/').post(authenticate, authorize, createRegionValidator, createRegion).get(authenticate, authorize, getRegionValidator, getRegion).put(authenticate, authorize, updateRegionValidator, updateRegion)
router.route('/toggleRegionState').put(authenticate, authorize, toggleRegionStateValidator, toggleRegionState)
router.route('/regionsByElection').get(authenticate, authorize, getRegionsByElectionIDValidator, getRegionsByElectionID)

module.exports = router;