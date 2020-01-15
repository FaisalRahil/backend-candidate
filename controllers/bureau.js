const mongoose = require('mongoose')

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bureau = require('../models/Bureau')
const Region = require("../models/Region");
const Election = require("../models/Election");



exports.createBureau = asyncHandler(async (req, res, next) => {

    const newBureau = await Bureau.create(req.body)

    res.status(201).json({
        success: true,
        data: newBureau
    })

})

exports.getBureau = asyncHandler(async (req, res, next) => {

    const bureau = await Bureau.findById(req.body.bureauID)

    if (!bureau) {
        return next(
            new ErrorResponse(
                `Bureau under this id ${req.body.bureauID} was not found`,
                404
            )
        )
    }

    return res.status(200).json({
        success: true,
        data: bureau
    })

})


exports.getBureaus = asyncHandler(async (req, res, next) => {
    const bureau = await Bureau.find()

    return res.status(200).json(bureau)
})

exports.getBureausByRegionID = asyncHandler(async (req, res, next) => {

    let results = await Region.aggregate([

        {
            $match: { "_id": mongoose.Types.ObjectId(req.body.regionID), }
        },

        {
            $lookup: {
                from: "bureaus",
                localField: "_id",
                foreignField: "regionID",
                as: "bureaus"
            }
        },
        {
            $match: { "bureaus": { $ne: [] } }
        }

    ])

    if (!results || results.length === 0) {
        return next(
            new ErrorResponse(
                `Region under this region id ${req.body.regionID} was not found`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        data: results
    })

})

exports.getBureausInfoWithRegionAndElection = asyncHandler(async (req, res, next) => {
    let results = await Region.aggregate([

        {
            $match: { "_id": mongoose.Types.ObjectId(req.body.regionID), }
        },
        {
            $lookup: {
                from: "elections",
                localField: "electionID",
                foreignField: "_id",
                as: "elections"
            }
        },
        { $unwind: "$elections" },
        {
            $lookup: {
                from: "bureaus",
                localField: "_id",
                foreignField: "regionID",
                as: "bureaus"
            }
        },
        {
            $match: { "bureaus": { $ne: [] } }
        }

    ])

    if (!results || results.length === 0) {
        return next(
            new ErrorResponse(
                `Region under this id ${req.body.regionID} or Election under this id ${req.body.electionID} was not found`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        data: results
    })
})


exports.updateBureau = asyncHandler(async (req, res, next) => {
    const updatedBureau = await Bureau.findByIdAndUpdate(
        req.body.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedBureau) {
        return next(
            new ErrorResponse(
                `Bureau under this id ${req.body.id} was not found`,
                404
            )
        )
    }

    return res.status(200).json({
        success: true,
        data: updatedBureau
    })
})

exports.changeBureauState = asyncHandler(async (req, res, next) => {
    const updatedBureauState = await Bureau.findByIdAndUpdate(
        {
            _id: req.body.bureauID,
        },
        {
            $set: { state: req.body.state }
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedBureauState) {

        return next(
            new ErrorResponse(
                `Bureau under this id ${req.body.bureauID} was not found`,
                404
            )
        )

    }
    res.status(200).json({
        success: true,
        data: updatedBureauState
    })

})