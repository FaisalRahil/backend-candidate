const express = require('express')
const router = express.Router()

const authonticate = require('../middleware/authentication')

const { getSubconstituencies,
    getSubconstituency,
    createSubconstituency,
    updateSubconstituency,
    toggleSubconstituencyState,
    getSubconstituencyByElectionID,
    getSubconstituencyByBureauID,
    getSubconstituencyByConstituencyID } = require('../controllers/subconstituency')

router.route('/subconstituencies').get(authonticate, getSubconstituencies)
router.route('/').post(authonticate, createSubconstituency).get(authonticate, getSubconstituency).put(authonticate, updateSubconstituency)
router.route('/toggleSubconstituencyState').put(authonticate, toggleSubconstituencyState)
router.route('/subconstituenciesByElection').get(authonticate, getSubconstituencyByElectionID)
router.route('/subconstituenciesByBureau').get(authonticate, getSubconstituencyByBureauID)
router.route('/subconstituenciesByConstituency').get(authonticate, getSubconstituencyByConstituencyID)

module.exports = router;