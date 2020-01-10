const express = require('express')

const {getEelections, getElection, createElection, updateElection} = require('../controllers/election')

const router = express.Router()


router.route('/elections').get(getEelections)
router.route('/').get(getElection).put(updateElection)
router.route('/').post(createElection)


module.exports = router;