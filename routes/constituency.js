const express = require('express')
const router = express.Router()

const {createConstituency ,getConstituency, getConstituencies, updateConsistuency, toggleConstituencyState} = require('../controllers/constituency')


router.route('/constituencies').get(getConstituencies)
router.route('/').post(createConstituency).get(getConstituency).put(updateConsistuency)
router.route('/toggleConstituencyState').put(toggleConstituencyState)


module.exports = router;