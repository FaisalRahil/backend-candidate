const express = require('express')
const router = express.Router()

const authonticate = require('../middleware/authentication')

const { createConstituency,
       getConstituency, 
       getConstituencies, 
       updateConsistuency, 
       toggleConstituencyState, 
       getConstituenciesBasedOnElectionID,
       getConstituenciesBasedOnRegionID,
       getConstituenciesBasedOnBureauID } = require('../controllers/constituency')


router.route('/constituencies').get(authonticate, getConstituencies)
router.route('/').post(authonticate, createConstituency).get(authonticate, getConstituency).put(authonticate, updateConsistuency)
router.route('/toggleConstituencyState').put(authonticate, toggleConstituencyState)
router.route('/getConstituenciesBasedOnElectionID').get(authonticate, getConstituenciesBasedOnElectionID)
router.route('/getConstituenciesBasedOnRegionID').get(authonticate, getConstituenciesBasedOnRegionID)
router.route('/getConstituenciesBasedOnBureauID').get(authonticate, getConstituenciesBasedOnBureauID)

module.exports = router;