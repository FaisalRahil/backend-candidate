const express = require('express')
const router = express.Router()

const {getSubconstituencies, getSubconstituency, createSubconstituency, updateSubconstituency, toggleSubconstituencyState} = require('../controllers/subconstituency')

router.route('/subconstituencies').get(getSubconstituencies)
router.route('/').post(createSubconstituency).get(getSubconstituency).put(updateSubconstituency)
router.route('/toggleRegionState').put(toggleSubconstituencyState)
//router.route('/regionsByElection').get(getRegionsByElectionID)

module.exports = router;