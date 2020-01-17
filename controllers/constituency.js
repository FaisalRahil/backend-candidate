const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Constituency = require("../models/Constituency");


exports.createConstituency = asyncHandler( async (req, res, next) => {

    const newConsistuency = await Constituency.create(req.body)

    res.status(201).json({
        success:true,
        data:newConsistuency
    })
})

exports.getConstituency = asyncHandler( async (req, res, next) => {

     const consistuency = await Constituency.findOne({ $or: [{_id:req.body.id},{constituencyID:req.body.constituencyID}]})

     if (!consistuency) {
        return next(
            new ErrorResponse(
                `Constituency under this id ${req.body.constituencyID} was not found`,
                404
            )
        )
    }
     res.status(200).json({
         success:true,
         data:consistuency
     })
})

exports.getConstituencies = asyncHandler( async (req, res, next) => {

     const consistuencies = await Constituency.find()
     res.status(200).json({consistuencies})
})


exports.updateConsistuency = asyncHandler( async (req, res, next) => {
    Constituency.fin
    const updatedConstituency= await Constituency.findOneAndUpdate(
        {
            $or: [{_id:req.body.id},{constituencyID:req.body.constituencyID}]
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

exports.toggleConstituencyState = asyncHandler( async (req, res, next) => {

    const updatedConstituencyState = await Constituency.findOneAndUpdate(
        {
            $or: [{_id:req.body.id},{constituencyID:req.body.constituencyID}]
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

