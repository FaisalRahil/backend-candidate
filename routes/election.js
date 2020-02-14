const express = require('express')
const router = express.Router()

const authonticate = require('../middleware/authentication')

const {getEelections, getElection, createElection, updateElection, toggleElectionState} = require('../controllers/election')


router.route('/elections').get(authonticate, getEelections)
router.route('/').post(authonticate, createElection).get(authonticate, getElection).put(authonticate, updateElection)
router.route('/toggleElectionState').put(authonticate, toggleElectionState)


module.exports = router;