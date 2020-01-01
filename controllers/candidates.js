
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require('../utils/geocoder');
const Candidate = require("../models/Candidate");

// @desc      Get all candidates
// @route     GET /api/v1/candidates
// @access    Public
exports.getCandidates = asyncHandler(async (req, res, next) => {
    
    let query;

    // Copy req.query
    reqQuery = {...req.query};

    const removeFields = ['select', 'sort'];

    removeFields.forEach(param => delete reqQuery[param]);

    // Create Query string 
    let queryStr = JSON.stringify(reqQuery);

    // Create operaters like ($gt, $gte,)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // finding recorce select field
    query = Candidate.find(JSON.parse(queryStr));

    // select Fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else{
        query = query.sort('-createdAt');
    }

    // pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 2;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Candidate.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const candidates = await query;

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


// @desc      Get candidates within a radius
// @route     GET /api/v1/candidates/radius/:zipcode/:distance
// @access    Privete
exports.getCandidatesInRadius = asyncHandler(async (req, res, next) => {
    const {zipcode, distance} = req.params;

    // get len/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    const radius = distance / 3963;

    const candidates = await Candidate.find({
        location:{ $geoWithin: { centerSphere: [[lng, lat], radius]}}
    });

    res.status(200).json({
        seccess: true,
        count: candidates.length,
        data: candidates
    })
});