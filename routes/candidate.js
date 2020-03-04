const express = require("express");
const router = express.Router();

const {
    createCandidate,
    getCandidate,
    updateCandidate,
    updatePassword,
    toggleCandidateApproval
} = require("../controllers/candidate");

const authorize = require('../middleware/authorize')
const authenticate = require('../middleware/authenticate')




router
    .route("/")
    .post(authenticate, authorize, createCandidate)
    .get(authenticate, authorize, getCandidate)
    .put(authenticate, authorize, updateCandidate)

router
    .route("/forgotPassword")
    .put(updatePassword)

router.route("/toggleCandidateApproval")
    .put(authenticate, authorize, toggleCandidateApproval);

module.exports = router;
