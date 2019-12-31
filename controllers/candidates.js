const Candidate = require("../models/Candidate");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Get all candidates
// @route     GET /api/v1/candidates
// @access    Public
exports.getCandidates = asyncHandler(async (req, res, next) => {
    const candidates = await Candidate.find();
    res.status(200).json({
        success: true,
        count: candidates.length,
        data: candidates
    });
});

// @desc      Get all candidate
// @route     GET /api/v1/candidates/:id
// @access    Public
exports.getCandidate = asyncHandler(async (req, res, next) => {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
        return next(
            new ErrorResponse(
                `Candidate not found with id of ${req.params.id}`,
                404
            )
        );
    }

    res.status(200).json({
        success: true,
        data: candidate
    });
});

// @desc      Create new candidate
// @route     POST /api/v1/candidates
// @access    Privete
exports.createCandidate = asyncHandler(async (req, res, next) => {
    const candidate = await Candidate.create(req.body);
    res.status(201).json({
        success: true,
        data: candidate
    });
});

// @desc      Update candidate
// @route     PUT /api/v1/candidates/:id
// @access    Privete
exports.updateCandidate = asyncHandler(async (req, res, next) => {
    const candidate = await Candidate.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );
    if (!candidate) {
        return next(
            new ErrorResponse(
                `Candidate not found with id of ${req.params.id}`,
                404
            )
        );
    }
    res.status(200).json({
        success: true,
        data: candidate
    });
});

// @desc      Delete candidate
// @route     DELETE /api/v1/candidates/:id
// @access    Privete
exports.deleteCandidate = asyncHandler(async (req, res, next) => {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
        return next(
            new ErrorResponse(
                `Candidate not found with id of ${req.params.id}`,
                404
            )
        );
    }
    res.status(200).json({
        success: true,
        data: {}
    });
});
