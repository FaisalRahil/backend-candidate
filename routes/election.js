const express = require('express')

const {getEelections, getElection, createElection, updateElection, changeElectionStatus} = require('../controllers/election')

const router = express.Router()


router.route('/elections').get(getEelections)
router.route('/').post(createElection).get(getElection).put(updateElection)
router.route('/changeElectionStatus').put(changeElectionStatus)


module.exports = router;