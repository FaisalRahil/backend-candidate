const express = require('express')
const router = express.Router()

const authonticate = require('../middleware/authentication')

const {getRegion, getRegions, getRegionsByElectionID,createRegion, updateRegion, toggleRegionState} = require('../controllers/region')

router.route('/regions').get(authonticate, getRegions)
router.route('/').post(authonticate, createRegion).get(authonticate, getRegion).put(authonticate, updateRegion)
router.route('/toggleRegionState').put(authonticate, toggleRegionState)
router.route('/regionsByElection').get(authonticate, getRegionsByElectionID)

module.exports = router;