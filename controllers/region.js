const mongoose = require('mongoose')

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Region = require("../models/Region");
const Election = require("../models/Election");

exports.createRegion = asyncHandler(async (req, res, next) => {

    const newRegion = await Region.create(req.body)

    res.status(201).json({
        success: true,
        data: newRegion
    })

})

exports.getRegions = asyncHandler(async (req, res, next) => {

    const regions = await Region.find()
    res.status(200).json({ regions })
})


exports.getRegion = asyncHandler(async (req, res, next) => {

    const region = await Region.findById(req.body.regionID)

    if (!region) {
        return next(
            new ErrorResponse(
                `Region under this id ${req.body.regionID} was not found`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        data:region
    })

})

// Joining two collection
exports.getRegionsByElectionID = asyncHandler(async (req, res, next) => {


    let results = await Election.aggregate([

        {
            $match: { "_id": mongoose.Types.ObjectId(req.body.electionID), }
        },
        
        {
            $lookup: {
                from: "regions",
                localField: "_id",
                foreignField: "electionID",
                as: "regions"
            }
        },
        {
            $match: { "regions": { $ne: [] } }
        },
        
    ])

    if (!results || results.length === 0) {
        return next(
            new ErrorResponse(
                `Region under this election id ${req.body.electionID} was not found`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        data:results[0]
    })

})

// Joining three collection
exports.updateRegion = asyncHandler(async (req, res, next) => {
    const updatedRegion = await Region.findByIdAndUpdate(
        req.body.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    )
    if (!updatedRegion) {

        return next(
            new ErrorResponse(
                `Region under this id ${req.body.id} was not found`,
                404
            )
        )

    }
    res.status(200).json({
        success: true,
        data: updatedRegion
    })
})

exports.toggleRegionState = asyncHandler(async (req, res, next) => {
    const updatedRegion = await Region.findByIdAndUpdate(
        {
            _id: req.body.regionID,
        },
        {
            $set: { state: req.body.state }
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedRegion) {

        return next(
            new ErrorResponse(
                `Region under this id ${req.body.regionID} was not found`,
                404
            )
        )

    }
    res.status(200).json({
        success: true,
        data: updatedRegion
    })

})

