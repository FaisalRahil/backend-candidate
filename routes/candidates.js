const express = require("express");
const {
    getCandidates,
    getCandidate,
    createCandidate,
    updateCandidate,
    deleteCandidate
} = require("../controllers/candidates");

const router = express.Router();

router
    .route("/")
    .get(getCandidates)
    .post(createCandidate);

    router
    .route("/:id")
    .get(getCandidate)
    .put(updateCandidate)
    .delete(deleteCandidate);

module.exports = router;
