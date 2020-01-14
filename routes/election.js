const express = require('express')
const router = express.Router()

const {getEelections, getElection, createElection, updateElection, toggleElectionState} = require('../controllers/election')


router.route('/elections').get(getEelections)
router.route('/').post(createElection).get(getElection).put(updateElection)
router.route('/toggleElectionState').put(toggleElectionState)


module.exports = router;