const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Region = require("../models/Region");
const Election = require("../models/Election");

require("dotenv").config()

exports.createRegion = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 1) {

        const newRegion = await Region.create(req.body)

        res.status(201).json({
            success: true,
            data: newRegion
        })

    } else {

        return next(
            new ErrorResponse(
                `Unauthorized access`,
                401
            )
        )
    }
})

exports.getRegions = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 1) {

        const regions = await Region.find().select({ electionID: 0, createdAt: 0, __v: 0 }).sort({ createdAt: -1 })
        res.status(200).json({ regions })

    } else {

        return next(
            new ErrorResponse(
                `Unauthorized access`,
                401
            )
        )
    }
})


exports.getRegion = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 1) {

        const region = await Region.findOne({ $or: [{ _id: req.body.id }, { regionID: req.body.regionID }] }).select({ electionID: 0, createdAt: 0, __v: 0 })

        if (!region) {
            return next(
                new ErrorResponse(
                    `Region under this id ${req.body.id ? req.body.id : req.body.regionID} was not found`,
                    404
                )
            )
        }

        res.status(200).json({
            success: true,
            data: region
        })

    } else {

        return next(
            new ErrorResponse(
                `Unauthorized access`,
                401
            )
        )
    }
})

// Joining two collection
exports.getRegionsByElectionID = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 1) {

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
            {
                "$group": {
                    _id: "$_id",
                    startDate: { "$first": "$startDate" },
                    endDate: { "$first": "$endDate" },
                    electionType: { "$first": "$electionType" },
                    regions: { "$first": "$regions" },
                    state: { "$first": "$state" }
                }
            },
            {
                $project: {
                    _id: 0,
                    startDate: 1,
                    endDate: 1,
                    electionType: 1,
                    state: 1,
                    regions: {
                        $map: {
                            input: "$regions",
                            as: "region",
                            in: {
                                arabicName: "$$region.arabicName",
                                englishName: "$$region.englishName",
                                regionID: "$$region.regionID",
                                "state": "$$region.state"
                            }
                        }
                    }
                }
            }

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
            data: results[0]
        })

    } else {

        return next(
            new ErrorResponse(
                `Unauthorized access`,
                401
            )
        )
        }

})


exports.updateRegion = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 1) {

        const updatedRegion = await Region.findOneAndUpdate(
            {
                $or: [{ _id: req.body.id }, { regionID: req.body.regionID }]
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        if (!updatedRegion) {

            return next(
                new ErrorResponse(
                    `Region under this id ${req.body.id ? req.body.id : req.body.regionID} was not found`,
                    404
                )
            )

        }
        res.status(200).json({
            success: true,
            data: updatedRegion
        })

    } else {

        return next(
            new ErrorResponse(
                `Unauthorized access`,
                401
            )
        )
    }
})

exports.toggleRegionState = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 1) {

        const updatedRegion = await Region.findOneAndUpdate(
            {
                $or: [{ _id: req.body.id }, { regionID: req.body.regionID }],
            },
            {
                $set: { state: req.body.state }
            },
            {
                new: true,
                runValidators: true
            }
        ).select({ _id: 0, arabicName: 0, englishName: 0, regionID: 0, electionID: 0, createdAt: 0, __v: 0 })

        if (!updatedRegion) {

            return next(
                new ErrorResponse(
                    `Region under this id ${req.body.id ? req.body.id : req.body.regionID} was not found`,
                    404
                )
            )

        }
        res.status(200).json({
            success: true,
            data: updatedRegion
        })

    } else {

        return next(
            new ErrorResponse(
                `Unauthorized access`,
                401
            )
        )
    }

})

