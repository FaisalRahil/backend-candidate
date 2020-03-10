const express = require("express");
const router = express.Router();

const {
    checkVoterRegistartion,
    createCandidate,
    getCandidate,
    updateCandidate,
    getCandidates,
    updatePassword,
    toggleCandidateApproval
} = require("../controllers/candidate");

const authorize = require('../middleware/authorize')
const authenticate = require('../middleware/authenticate')

router
    .route("/checkVoterRegistartion")
    .get(checkVoterRegistartion)

router
    .route("/candidates")
    .get(authenticate, authorize, getCandidates)

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
