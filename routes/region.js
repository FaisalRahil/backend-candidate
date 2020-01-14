const express = require('express')
const router = express.Router()

const {getRegion, getRegions, getRegionsByElectionID,createRegion, updateRegion, toggleRegionState} = require('../controllers/region')

router.route('/regions').get(getRegions)
router.route('/').post(createRegion).get(getRegion).put(updateRegion)
router.route('/toggleRegionState').put(toggleRegionState)
router.route('/regionsByElection').get(getRegionsByElectionID)

module.exports = router;