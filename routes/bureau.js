const express = require('express')
const router = express.Router()

const {getBureau, createBureau, updateBureau, getBureaus, changeBureauState, getBureausByRegionID} = require('../controllers/bureau')

router.route('/').get(getBureau).post(createBureau).put(updateBureau)
router.route('/bureaus').get(getBureaus)
router.route('/toggleBureauState').put(changeBureauState)
router.route('/bureausByRegions').get(getBureausByRegionID)

module.exports = router;