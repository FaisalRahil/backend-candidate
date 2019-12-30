// @desc      Get all candidates
// @route     GET /api/v1/candidates
// @access    Public
exports.getCandidates = (req, res, next) => {
    res.status(200).json({
        seccess: true,
        msg: "Sho all candidates"
    });
};

// @desc      Get all candidate
// @route     GET /api/v1/candidates/:id
// @access    Public
exports.getCandidate = (req, res, next) => {
    res.status(200).json({
        seccess: true,
        msg: `Show candidate${req.params.id}`
    });
};

// @desc      Create new candidate
// @route     POST /api/v1/candidates
// @access    Privete
exports.createCandidate = (req, res, next) => {
    res.status(200).json({ seccess: true, msg: "create new candidates" });
};

// @desc      Update candidate
// @route     PUT /api/v1/candidates/:id
// @access    Privete
exports.updateCandidate = (req, res, next) => {
    res.status(200).json({
        seccess: true,
        msg: `Update candidate${req.params.id}`
    });
};

// @desc      Delete candidate
// @route     DELETE /api/v1/candidates/:id
// @access    Privete
exports.deleteCandidate = (req, res, next) => {
    res.status(200).json({
        seccess: true,
        msg: `delete candidate${req.params.id}`
    });
};
