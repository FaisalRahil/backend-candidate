const mongoose = require('mongoose')

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//models
const Constituency = require("../models/Constituency");
const Election = require("../models/Election");
const Bureau = require("../models/Bureau");
const Region = require("../models/Region")


exports.createConstituency = asyncHandler(async (req, res, next) => {

    const newConsistuency = await Constituency.create(req.body)

    res.status(201).json({
        success: true,
        data: newConsistuency
    })
})

exports.getConstituency = asyncHandler(async (req, res, next) => {

    const consistuency = await Constituency.findOne({ $or: [{ _id: req.body.id }, { constituencyID: req.body.constituencyID }] })

    if (!consistuency) {
        return next(
            new ErrorResponse(
                `Constituency under this id ${req.body.constituencyID} was not found`,
                404
            )
        )
    }
    res.status(200).json({
        success: true,
        data: consistuency
    })
})

exports.getConstituencies = asyncHandler(async (req, res, next) => {

    const consistuencies = await Constituency.find()
    res.status(200).json({ consistuencies })
})

exports.getConstituenciesBasedOnElectionID = asyncHandler(async (req, res, next) => {

    let results = await Election.aggregate([

        {
            $match: { "_id": mongoose.Types.ObjectId(req.body.electionID) }
        },
        {
            $lookup: {
                from: "constituencies",
                localField: "_id",
                foreignField: "electionID",
                as: "constituencies"
            }
        },
        {
            $match: { "constituencies": { $ne: [] } }
        },
        { "$group": {
            _id: "$_id",
            startDate: { "$first":"$startDate"},
            endDate: { "$first":"$endDate"},
            electionType: { "$first":"$electionType"},
            constituencies:{ "$first":"$constituencies"},
            state: { "$first":"$state"}
        }},
        {
            $project: {
                _id:0,
                startDate:1,
                endDate:1,
                electionType:1,
                state:1,
                constituencies:{
                    $map:{
                        input: "$constituencies", 
                        as: "constituency", 
                        in: { 
                            arabicName: "$$constituency.arabicName", 
                            englishName: "$$constituency.englishName",
                            constituencyID: "$$constituency.constituencyID"  
                        } 
                    }
                }
            }
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

exports.getConstituenciesBasedOnRegionID = asyncHandler(async (req, res, next) => {

    const results = await Region.aggregate([

        {
            $match: { $or: [{ "_id": mongoose.Types.ObjectId(req.body.id) }, { "regionID": req.body.regionID }] }
        },
        {
            $lookup: {
                from: "constituencies",
                localField: "_id",
                foreignField: "regionID",
                as: "constituencies"
            }
        },
        {
            $match: { "constituencies": { $ne: [] } }
        },
        { "$group": {
            _id: "$_id",
            arabicName: { "$first":"$arabicName"},
            englishName: { "$first":"$englishName"},
            state: { "$first":"$state"},
            constituencies:{ "$first":"$constituencies"},
        }},
        {
            $project: {
                _id:0,
                arabicName:1,
                englishName:1,
                state:1,
                constituencies:{
                    $map:{
                        input: "$constituencies", 
                        as: "constituency", 
                        in: { 
                            arabicName: "$$constituency.arabicName", 
                            englishName: "$$constituency.englishName",
                            constituencyID: "$$constituency.constituencyID"  
                        } 
                    }
                }
            }
        }

    ])

    if (!results || results.length === 0) {
        return next(
            new ErrorResponse(
                `Region under this id ${req.body.id ? req.body.id : req.body.regionID} was not found`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        data: results[0]
    })

})

exports.getConstituenciesBasedOnBureauID = asyncHandler(async (req, res, next) => {

    const results = await Bureau.aggregate([

        {
            $match: { $or: [{ "_id": mongoose.Types.ObjectId(req.body.id) }, { "bureauID": req.body.bureauID }] }
        },
        {
            $lookup: {
                from: "constituencies",
                localField: "_id",
                foreignField: "bureauID",
                as: "constituencies"
            }
        },
        {
            $match: { "constituencies": { $ne: [] } }
        },
        { "$group": {
            _id: "$_id",
            arabicName: { "$first":"$arabicName"},
            englishName: { "$first":"$englishName"},
            state: { "$first":"$state"},
            constituencies:{ "$first":"$constituencies"},
        }},
        {
            $project: {
                _id:0,
                arabicName:1,
                englishName:1,
                state:1,
                constituencies:{
                    $map:{
                        input: "$constituencies", 
                        as: "constituency", 
                        in: { 
                            arabicName: "$$constituency.arabicName", 
                            englishName: "$$constituency.englishName",
                            constituencyID: "$$constituency.constituencyID"  
                        } 
                    }
                }
            }
        }

    ])

    if (!results || results.length === 0) {
        return next(
            new ErrorResponse(
                `Bureau under this id ${req.body.id ? req.body.id : req.body.bureauID} was not found`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        data: results[0]
    })
})


exports.updateConsistuency = asyncHandler(async (req, res, next) => {

    const updatedConstituency = await Constituency.findOneAndUpdate(
        {
            $or: [{ _id: req.body.id }, { constituencyID: req.body.constituencyID }]
        },
        req.body,
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedConstituency) {
        return next(
            new ErrorResponse(
                `Constituency under this id ${req.body.id} was not found`,
                404
            )
        )
    }

    return res.status(200).json({
        success: true,
        data: updatedConstituency
    })
})

exports.toggleConstituencyState = asyncHandler(async (req, res, next) => {

    const updatedConstituencyState = await Constituency.findOneAndUpdate(
        {
            $or: [{ _id: req.body.id }, { constituencyID: req.body.constituencyID }]
        },
        {
            $set: { state: req.body.state }
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedConstituencyState) {

        return next(
            new ErrorResponse(
                `Constituency under this id ${req.body.constituencyID} was not found`,
                404
            )
        )

    }
    res.status(200).json({
        success: true,
        data: updatedConstituencyState
    })
})

