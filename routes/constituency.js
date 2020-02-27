const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

const { createConstituency,
       getConstituency, 
       getConstituencies, 
       updateConsistuency, 
       toggleConstituencyState, 
       getConstituenciesBasedOnElectionID,
       getConstituenciesBasedOnRegionID,
       getConstituenciesBasedOnBureauID } = require('../controllers/constituency')


router.route('/constituencies').get(authenticate, authorize, getConstituencies)
router.route('/').post(authenticate, authorize, createConstituency).get(authenticate, authorize, getConstituency).put(authenticate, authorize, updateConsistuency)
router.route('/toggleConstituencyState').put(authenticate, authorize, toggleConstituencyState)
router.route('/getConstituenciesBasedOnElectionID').get(authenticate, authorize, getConstituenciesBasedOnElectionID)
router.route('/getConstituenciesBasedOnRegionID').get(authenticate, authorize, getConstituenciesBasedOnRegionID)
router.route('/getConstituenciesBasedOnBureauID').get(authenticate, authorize, getConstituenciesBasedOnBureauID)

module.exports = router;