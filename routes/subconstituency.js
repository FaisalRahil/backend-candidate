const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const { getSubconstituencyValidator,
    createConstituencyValidator,
    updateSubconstituencyValidator,
    toggleSubconstituencyStateValidator,
    getSubconstituenciesBasedOnBureauIDValidator,
    getSubconstituenciesBasedOnElectionIDValidator,
    getSubconstituenciesBasedOnConstituencyIDValidator } = require('../middleware/subconstituency')

const { getSubconstituencies,
    getSubconstituency,
    createSubconstituency,
    updateSubconstituency,
    toggleSubconstituencyState,
    getSubconstituencyByElectionID,
    getSubconstituencyByBureauID,
    getSubconstituencyByConstituencyID } = require('../controllers/subconstituency')

router.route('/subconstituencies').get(authenticate, authorize, getSubconstituencies)
router.route('/').post(authenticate, authorize, createConstituencyValidator, createSubconstituency)
    .get(authenticate, authorize, getSubconstituencyValidator, getSubconstituency)
    .put(authenticate, authorize, updateSubconstituencyValidator, updateSubconstituency)
router.route('/toggleSubconstituencyState').put(authenticate, authorize, toggleSubconstituencyStateValidator, toggleSubconstituencyState)
router.route('/subconstituenciesByElection').get(authenticate, authorize, getSubconstituenciesBasedOnElectionIDValidator, getSubconstituencyByElectionID)
router.route('/subconstituenciesByBureau').get(authenticate, authorize, getSubconstituenciesBasedOnBureauIDValidator, getSubconstituencyByBureauID)
router.route('/subconstituenciesByConstituency').get(authenticate, authorize, getSubconstituenciesBasedOnConstituencyIDValidator, getSubconstituencyByConstituencyID)

module.exports = router;