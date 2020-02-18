const express = require('express')
const router = express.Router()

const authonticate = require('../middleware/authentication')

const {getBureau, createBureau, updateBureau, getBureaus, toggleBureauState, getBureausByRegionID, getBureausByElectionID} = require('../controllers/bureau')

router.route('/').get(authonticate, getBureau).post(authonticate, createBureau).put(authonticate, updateBureau)
router.route('/bureaus').get(authonticate, getBureaus)
router.route('/toggleBureauState').put(authonticate, toggleBureauState)
router.route('/getBureausBasedOnRegion').get(authonticate, getBureausByRegionID)
router.route('/getBureausBasedOnElection').get(authonticate, getBureausByElectionID)

module.exports = router;