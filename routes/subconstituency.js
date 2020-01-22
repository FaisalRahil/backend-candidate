const express = require('express')
const router = express.Router()

const { getSubconstituencies,
    getSubconstituency,
    createSubconstituency,
    updateSubconstituency,
    toggleSubconstituencyState,
    getSubconstituencyByElectionID,
    getSubconstituencyByBureauID,
    getSubconstituencyByConstituencyID } = require('../controllers/subconstituency')

router.route('/subconstituencies').get(getSubconstituencies)
router.route('/').post(createSubconstituency).get(getSubconstituency).put(updateSubconstituency)
router.route('/toggleRegionState').put(toggleSubconstituencyState)
router.route('/subconstituenciesByElection').get(getSubconstituencyByElectionID)
router.route('/subconstituenciesByBureau').get(getSubconstituencyByBureauID)
router.route('/subconstituenciesByConstituency').get(getSubconstituencyByConstituencyID)

module.exports = router;