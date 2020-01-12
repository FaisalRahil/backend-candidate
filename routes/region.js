const express = require('express')

const {getRegion, getRegions, getRegionsByElectionID,createRegion, updateRegion, changeRegionStatus} = require('../controllers/region')

const router = express.Router()


router.route('/regions').get(getRegions)
router.route('/').post(createRegion).get(getRegion).put(updateRegion)
router.route('/changeRegionStatus').put(changeRegionStatus)
router.route('/regionsByElection').get(getRegionsByElectionID)

module.exports = router;