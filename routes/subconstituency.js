const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

const { getSubconstituencies,
    getSubconstituency,
    createSubconstituency,
    updateSubconstituency,
    toggleSubconstituencyState,
    getSubconstituencyByElectionID,
    getSubconstituencyByBureauID,
    getSubconstituencyByConstituencyID } = require('../controllers/subconstituency')

router.route('/subconstituencies').get(authenticate, authorize, getSubconstituencies)
router.route('/').post(authenticate, authorize, createSubconstituency).get(authenticate, authorize, getSubconstituency).put(authenticate, authorize, updateSubconstituency)
router.route('/toggleSubconstituencyState').put(authenticate, authorize, toggleSubconstituencyState)
router.route('/subconstituenciesByElection').get(authenticate, authorize, getSubconstituencyByElectionID)
router.route('/subconstituenciesByBureau').get(authenticate, authorize, getSubconstituencyByBureauID)
router.route('/subconstituenciesByConstituency').get(authenticate, authorize, getSubconstituencyByConstituencyID)

module.exports = router;