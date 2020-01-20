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
            $match: {$or: [{ "_id": mongoose.Types.ObjectId(req.body.id)}, {"regionID": req.body.regionID}]}
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
        },
        { "$group": {
            _id: "$_id",
            regionID:{ "$first":"$regionID"},
            arabicName: { "$first":"$arabicName"},
            englishName: { "$first":"$englishName"},
            state: { "$first":"$state"},
            bureaus:{ "$first":"$bureaus"},
        }},
        {
            $project: {
                _id:1,
                regionID:1,
                arabicName:1,
                englishName:1,
                state:1,
                bureaus:{
                    $map:{
                        input: "$bureaus", 
                        as: "bureau", 
                        in: { 

                            arabicName: "$$bureau.arabicName", 
                            englishName: "$$bureau.englishName",
                            bureauID: "$$bureau.bureauID",
                            state: "$$bureau.state"    
                        } 
                    }
                }
            }
        }

    ])

    if (!results || results.length === 0) {
        return next(
            new ErrorResponse(
                `Region under this id ${req.body.id ? req.body.id : req.body.bureauID} was not found`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        data: results[0]
    })

})

exports.getBureausByElectionID = asyncHandler(async (req, res, next) => {
    let results = await Election.aggregate([

        {
            $match: { "_id": mongoose.Types.ObjectId(req.body.id)}
        },
        {
            $lookup: {
                from: "bureaus",
                localField: "_id",
                foreignField: "electionID",
                as: "bureaus"
            }
        },
        {
            $match: { "bureaus": { $ne: [] } }
        },
        
        { "$group": {
            _id: "$_id",
            startDate: { "$first":"$startDate"},
            endDate: { "$first":"$endDate"},
            electionType: { "$first":"$electionType"},
            state: { "$first":"$state"},
            bureaus:{ "$first":"$bureaus"},
        }},
        {
            $project: {
                _id:1,
                startDate:1,
                endDate:1,
                electionType:1,
                state:1,
                bureaus:{
                    $map:{
                        input: "$bureaus", 
                        as: "bureau", 
                        in: { 
                            _id: "$$bureau._id", 
                            arabicName: "$$bureau.arabicName", 
                            englishName: "$$bureau.englishName",
                            bureauID: "$$bureau.bureauID",
                            state: "$$bureau.state"    
                        } 
                    }
                }
            }
        }

    ])

    if (!results || results.length === 0) {
        return next(
            new ErrorResponse(
                `Region under this id ${req.body.id} was not found`,
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
  
    const updatedBureau = await Bureau.findOneAndUpdate(
        {
            $or:[{_id: req.body.id},{bureauID: req.body.bureauID}]
        },
        req.body,
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedBureau) {
        return next(
            new ErrorResponse(
                `Bureau under this id ${req.body.id ? req.body.id : req.body.bureauID} was not found`,
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
    
    const updatedBureauState = await Bureau.findOneAndUpdate(
        {
            $or:[{_id: req.body.id},{bureauID: req.body.bureauID}]
        },
        {
            $set: { state: req.body.state }
        },
        {
            new: true,
            runValidators: true
        }
    ).select({_id:0, state:1})

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