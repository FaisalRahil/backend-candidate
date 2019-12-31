const Candidate = require("../models/Candidate");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all candidates
// @route     GET /api/v1/candidates
// @access    Public
exports.getCandidates = async (req, res, next) => {
    try {
        const candidates = await Candidate.find();

        res.status(200).json({
            success: true,
            count: candidates.length,
            data: candidates
        });
    } catch (err) {
        next(err);
    }
};

// @desc      Get all candidate
// @route     GET /api/v1/candidates/:id
// @access    Public
exports.getCandidate = async (req, res, next) => {
    try {
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
    } catch (err) {
        // res.status(400).json({ success: false });
        next(err);
    }
};

// @desc      Create new candidate
// @route     POST /api/v1/candidates
// @access    Privete
exports.createCandidate = async (req, res, next) => {
    try {
        const candidate = await Candidate.create(req.body);
        res.status(201).json({
            success: true,
            data: candidate
        });
    } catch (err) {
        next(err);
    }
};

// @desc      Update candidate
// @route     PUT /api/v1/candidates/:id
// @access    Privete
exports.updateCandidate = async (req, res, next) => {
    try {
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
    } catch (err) {
        next(err);
    }
};

// @desc      Delete candidate
// @route     DELETE /api/v1/candidates/:id
// @access    Privete
exports.deleteCandidate = async (req, res, next) => {
    try {
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
    } catch (err) {
        next(err);
    }
};
