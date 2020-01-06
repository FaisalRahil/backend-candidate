const express = require("express");
const {
    getCandidates,
    getCandidate,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidatesInRadius
} = require("../controllers/candidates");

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getCandidatesInRadius);

router
    .route("/")
    .get(getCandidates)
    .post(createCandidate);

    router
    .route("/parm/:parameter").get((req,res) => {
        res.status(200).json({hi:req.params.parameter})
    })
    
    router.route("/test").get((req,res) => {
        res.status(200).json({hi:"hi"})
    })

    router
    .route("/:id")
    .get(getCandidate)
    .put(updateCandidate)
    .delete(deleteCandidate);

module.exports = router;
