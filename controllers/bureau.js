const mongoose = require('mongoose')

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bureau = require('../models/Bureau')
const Region = require("../models/Region");



exports.createBureau = asyncHandler(async (req, res, next) => {

    const newBureau = await Bureau.create(req.body)

    res.status(201).json({
        success: true,
        data: newBureau
    })

})

exports.getBureau = asyncHandler(async (req, res, next) => {

    const bureau = await Bureau.findOne({$or:[{_id: req.body.id},{bureauID: req.body.bureauID}]}).select({__v:0, createdAt:0, regionID:0, electionID:0})

    if (!bureau) {
        return next(
            new ErrorResponse(
                `Bureau under this id ${req.body.id ? req.body.id : req.body.bureauID} was not found`,
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
    const bureaus = await Bureau.find().select({__v:0, createdAt:0, regionID:0 , electionID:0})

    return res.status(200).json({bureaus})
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
                `Region under this id ${req.body.regionID} was not found`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        data: results[0]
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
                as: "election"
            }
        },
        { $unwind: "$election" },
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
                `Region under this id ${req.body.regionID} was not found`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        data: results[0]
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
            _id: req.body.id,
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
                `Bureau under this id ${req.body.id ? req.body.id : req.body.bureauID} was not found`,
                404
            )
        )

    }
    res.status(200).json({
        success: true,
        data: updatedBureauState
    })

})