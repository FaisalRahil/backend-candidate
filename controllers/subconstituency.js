const mongoose = require('mongoose')

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//models
const Subconstituency = require("../models/Subconstituency");


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


