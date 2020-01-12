const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Election = require("../models/Election");



exports.getEelections = asyncHandler(async (req, res, next) => {
    const elections = await Election.find()
    res.status(200).json({ elections })
})

exports.getElection = asyncHandler(async (req, res, next) => {

    const selectedElection = await Election.findById(req.body.electionID)

    if (!selectedElection) {

        next(
            new ErrorResponse(
                `Election under this id ${req.body.electionID} was not found`,
                404
            )
        )

    }
    return res.status(200).json({
        success: true,
        data: selectedElection
    })
})


exports.createElection = asyncHandler(async (req, res, next) => {

    const createdElection = await Election.create(req.body)
    res.status(201).json({
        success: true,
        data: createdElection
    })
})

exports.updateElection = asyncHandler(async (req, res, next) => {

    const updatedElection = await Election.findByIdAndUpdate(
        req.body.electionID,
        req.body,
        {
            new: true,
            runValidators: true
        }
    )
    if (!updatedElection) {

        return next(
            new ErrorResponse(
                `Election under this id ${req.body.electionID} was not found`,
                404
            )
        )

    }
    res.status(200).json({
        success: true,
        data: updatedElection
    })
})

exports.changeElectionStatus = asyncHandler(async (req, res, next) => {


    const updatedElection = await Election.findOneAndUpdate(
        {
            _id: req.body.electionID,
        },
        {
            $set: { status: req.body.status }
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedElection) {

        return next(
            new ErrorResponse(
                `Election under this id ${req.body.electionID} was not found`,
                404
            )
        )

    }
    res.status(200).json({
        success: true,
        data: updatedElection
    })



})




