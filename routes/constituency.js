const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

const {getConstituencyValidator, createConstituencyValidator, updateConstituencyValidator, toggleConstituencyStateValidator, getConstituenciesBasedOnBureauIDValidator, getConstituenciesBasedOnElectionIDValidator, getConstituenciesBasedOnRegionIDValidator} = require('../middleware/constituency')

const { createConstituency,
       getConstituency, 
       getConstituencies, 
       updateConsistuency, 
       toggleConstituencyState, 
       getConstituenciesBasedOnElectionID,
       getConstituenciesBasedOnRegionID,
       getConstituenciesBasedOnBureauID } = require('../controllers/constituency')


router.route('/constituencies').get(authenticate, authorize, getConstituencies)
router.route('/').post(authenticate, authorize, createConstituencyValidator, createConstituency).get(authenticate, authorize, getConstituencyValidator, getConstituency).put(authenticate, authorize, updateConstituencyValidator, updateConsistuency)
router.route('/toggleConstituencyState').put(authenticate, authorize, toggleConstituencyStateValidator, toggleConstituencyState)
router.route('/getConstituenciesBasedOnElectionID').get(authenticate, authorize, getConstituenciesBasedOnElectionIDValidator, getConstituenciesBasedOnElectionID)
router.route('/getConstituenciesBasedOnRegionID').get(authenticate, authorize, getConstituenciesBasedOnRegionIDValidator, getConstituenciesBasedOnRegionID)
router.route('/getConstituenciesBasedOnBureauID').get(authenticate, authorize, getConstituenciesBasedOnBureauIDValidator, getConstituenciesBasedOnBureauID)

module.exports = router;