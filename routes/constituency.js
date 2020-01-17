const express = require('express')
const router = express.Router()

const { createConstituency,
       getConstituency, 
       getConstituencies, 
       updateConsistuency, 
       toggleConstituencyState, 
       getConstituenciesBasedOnElectionID,
       getConstituenciesBasedOnRegionID,
       getConstituenciesBasedOnBureauID } = require('../controllers/constituency')


router.route('/constituencies').get(getConstituencies)
router.route('/').post(createConstituency).get(getConstituency).put(updateConsistuency)
router.route('/toggleConstituencyState').put(toggleConstituencyState)
router.route('/getConstituenciesBasedOnElectionID').get(getConstituenciesBasedOnElectionID)
router.route('/getConstituenciesBasedOnRegionID').get(getConstituenciesBasedOnRegionID)
router.route('/getConstituenciesBasedOnBureauID').get(getConstituenciesBasedOnBureauID)

module.exports = router;