const mongoose = require('mongoose')

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//models
const Subconstituency = require("../models/Subconstituency");
const Election = require("../models/Election");
const Constituency = require("../models/Constituency");
const Bureau = require("../models/Bureau");

exports.createSubconstituency = asyncHandler(async (req, res, next) => {
    const newSubconstituency = await Subconstituency.create(req.body)

    res.status(201).json({
        success: true,
        data: newSubconstituency
    })
})

exports.getSubconstituency = asyncHandler(async (req, res, next) => {
    const subconstituency = await Subconstituency.findOne({$or: [{_id:req.body.id}, {subconstituencyID:req.body.subconstituecnyID}]}).select({_id:1,subconstituencyID:1, arabicName:1, englishName:1})

    if (!subconstituency) {
        return next(
            new ErrorResponse(
                `Subconstituency under this id ${req.body.id ? req.body.id : req.body.subconstituencyID} was not found`,
                404
            )
        )
    }

    return res.status(200).json({
        success: true,
        data: subconstituency
    })

})

exports.getSubconstituencies = asyncHandler(async (req, res, next) => {
    const subconstituencies = await Subconstituency.find().select({_id:1,subconstituencyID:1, arabicName:1, englishName:1})

    return res.status(200).json({subconstituencies})
})

exports.getSubconstituencyByElectionID = asyncHandler(async (req, res, next) => {


    let results = await Election.aggregate([

        {
            $match: { "_id": mongoose.Types.ObjectId(req.body.electionID), }
        },
        
        {
            $lookup: {
                from: "subconstituencies",
                localField: "_id",
                foreignField: "electionID",
                as: "subconstituencies"
            }
        },
        {
            $match: { "subconstituencies": { $ne: [] } }
        },
        { "$group": {
            _id: "$_id",
            startDate: { "$first":"$startDate"},
            endDate: { "$first":"$endDate"},
            electionType: { "$first":"$electionType"},
            subconstituencies:{ "$first":"$subconstituencies"},
            state: { "$first":"$state"}
        }},
        {
            $project: {
                _id:0,
                startDate:1,
                endDate:1,
                electionType:1,
                state:1,
                subconstituencies:{
                    $map:{
                        input: "$subconstituencies", 
                        as: "subconstituency", 
                        in: { 
                            id: "$$subconstituency._id",
                            arabicName: "$$subconstituency.arabicName", 
                            englishName: "$$subconstituency.englishName",
                            subconstituencyID: "$$subconstituency.subconstituencyID"
                        } 
                    }
                }
            }
        }
        
    ])

    if (!results || results.length === 0) {
        return next(
            new ErrorResponse(
                `Subconstituency under this election id ${req.body.electionID} was not found`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        data:results[0]
    })

})
 
exports.getSubconstituencyByConstituencyID = asyncHandler(async (req, res, next) => {


    let results = await Constituency.aggregate([

        {
            $match: { $or: [{ "_id": mongoose.Types.ObjectId(req.body.id) }, { "constituencyID": req.body.constituencyID }] }
        },
        
        {
            $lookup: {
                from: "subconstituencies",
                localField: "_id",
                foreignField: "constituencyID",
                as: "subconstituencies"
            }
        },
        {
            $match: { "subconstituencies": { $ne: [] } }
        },
        { "$group": {
            _id: "$_id",
            arabicName: { "$first":"$arabicName"},
            englishName: { "$first":"$englishName"},
            constituencyID:{"$first":"$constituencyID"},
            state: { "$first":"$state"},
            subconstituencies:{ "$first":"$subconstituencies"},
            
        }},
        {
            $project: {
                _id:0,
                arabicName:1,
                englishName:1,
                constituencyID:1,
                state:1,
                subconstituencies:{
                    $map:{
                        input: "$subconstituencies", 
                        as: "subconstituency", 
                        in: { 
                            id: "$$subconstituency._id",
                            arabicName: "$$subconstituency.arabicName", 
                            englishName: "$$subconstituency.englishName",
                            subconstituencyID: "$$subconstituency.subconstituencyID"
                        } 
                    }
                }
            }
        }
        
    ])

    if (!results || results.length === 0) {
        return next(
            new ErrorResponse(
                `Subconstituency under this Constituency id ${req.body.id ? req.body.id : req.body.constituencyID} was not found`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        data:results[0]
    })

})

exports.getSubconstituencyByBureauID = asyncHandler(async (req, res, next) => {


    let results = await Bureau.aggregate([

        {
            $match: { $or: [{ "_id": mongoose.Types.ObjectId(req.body.id) }, { "bureauID": req.body.bureauID }] }
        },
        
        {
            $lookup: {
                from: "subconstituencies",
                localField: "_id",
                foreignField: "bureauID",
                as: "subconstituencies"
            }
        },
        {
            $match: { "subconstituencies": { $ne: [] } }
        },
        { "$group": {
            _id: "$_id",
            arabicName: { "$first":"$arabicName"},
            englishName: { "$first":"$englishName"},
            state: { "$first":"$state"},
            subconstituencies:{ "$first":"$subconstituencies"},
            
        }},
        {
            $project: {
                _id:0,
                arabicName:1,
                englishName:1,
                state:1,
                subconstituencies:{
                    $map:{
                        input: "$subconstituencies", 
                        as: "subconstituency", 
                        in: { 
                            id: "$$subconstituency._id",
                            arabicName: "$$subconstituency.arabicName", 
                            englishName: "$$subconstituency.englishName",
                            subconstituencyID: "$$subconstituency.subconstituencyID"
                        } 
                    }
                }
            }
        }
        
    ])

    if (!results || results.length === 0) {
        return next(
            new ErrorResponse(
                `Subconstituency under this Constituency id ${req.body.id ? req.body.id : req.body.constituencyID} was not found`,
                404
            )
        )
    }

    res.status(200).json({
        success: true,
        data:results[0]
    })

})


exports.updateSubconstituency = asyncHandler(async (req, res, next) => {
    const updatedsubconstituency = await Subconstituency.findOneAndUpdate(
        {
            $or:[{_id: req.body.id},{subconstituencyID:req.body.subconstituecnyID}]
        },
        req.body,
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedsubconstituency) {
        return next(
            new ErrorResponse(
                `Subconstituency under this id ${req.body.id ? req.body.id : req.body.subconstituencyID} was not found`,
                404
            )
        )
    }

    return res.status(200).json({
        success: true,
        data: updatedsubconstituency
    })
})

exports.toggleSubconstituencyState =  asyncHandler(async (req, res, next) => {
    const updatedSubconstituencyState = await Bureau.findOneAndUpdate(
        {
            $or:[{_id: req.body.id},{subconstituencyID:req.body.subconstituecnyID}]
        },
        {
            $set: { state: req.body.state }
        },
        {
            new: true,
            runValidators: true
        }
    ).select({_id:0, state:1})

    if (!updatedSubconstituencyState) {

        return next(
            new ErrorResponse(
                `Subconstituency under this id ${req.body.id ? req.body.id : req.body.subconstituecnyID} was not found`,
                404
            )
        )

    }
    res.status(200).json({
        success: true,
        data: updatedSubconstituencyState
    })

})


