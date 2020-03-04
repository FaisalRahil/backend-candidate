const express = require('express')
const router = express.Router()

const { getVoter, createVoter } = require('../controllers/vr')

router.route('/').post(createVoter).get(getVoter)


module.exports = router;