const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fetch = require('node-fetch')
const path = require('path');
const fs = require('fs')

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const Candidate = require('../models/Candidate')
const Endorsement = require('../models/Endorsement')


require("dotenv").config()


exports.createEndorsement = asyncHandler(async (req, res, next) => {



    if (req.userData.userType.typeID == 3) {

        if (req.userData.nationalID == req.body.nationalID)
            return next(
                new ErrorResponse(
                    'لا يمكن إضافة الرقم الوطني خاصتك للمزكين',
                    400
                )
            )

        const endorsement = await Endorsement.create(req.body)

        res.status(201).json({
            success: true,
            data: endorsement
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



exports.getEndorsement = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 3) {

        const endorsement = await Endorsement.findOne({ $or: [{ _id: req.body.id }, { nationlID: req.body.nationlID }] })
        //.select({ electionID: 0, createdAt: 0, __v: 0 })

        if (!endorsement) {
            return next(
                new ErrorResponse(
                    `endorsement under this id ${req.body.id ? req.body.id : req.body.nationlID} was not found`,
                    404
                )
            )
        }

        res.status(200).json({
            success: true,
            data: endorsement
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

exports.getEndorsements = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 3 || req.userData.userType.typeID == 2) {

        let results = await Candidate.aggregate([

            {
                $match: {
                    $and: [

                        { $or: [{ "_id": req.body.id ? mongoose.Types.ObjectId(req.body.id) : mongoose.Types.ObjectId(req.userData.id) }, { "nationalID": req.body.nationalID ? req.body.nationalID : req.userData.nationalID }] },
                        { "approved": true }
                    ]
                }
            },

            {
                $lookup: {
                    from: "endorsements",
                    localField: "_id",
                    foreignField: "candidateID",
                    as: "endorsements"
                }
            },
            {
                $match: { "endorsements": { $ne: [] } }
            },
            {
                "$group": {
                    _id: "$_id",
                    nationalID: { "$first": "$nationalID" },
                    name: { "$first": "$name" },
                    state: { "$first": "$state" },
                    endorsements: { "$first": "$endorsements" },
                }
            },
            {
                $project: {
                    _id: 1,
                    nationalID: 1,
                    name: 1,
                    state: 1,
                    endorsements: {
                        $map: {
                            input: "$endorsements",
                            as: "endorsement",
                            in: {
                                _id: "$$endorsement._id",
                                nationalID: "$$endorsement.nationalID"
                            }
                        }
                    }
                }
            }

        ])

        if (!results || results.length === 0) {
            return next(
                new ErrorResponse(
                    `Candidate under this election id ${req.body.id} was not found`,
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


exports.updateEndorsement = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 3) {

        const updatedEndorsement = await Endorsement.findOneAndUpdate(
            {
                $or: [{ _id: req.body.id ? mongoose.Types.ObjectId(req.body.id) : mongoose.Types.ObjectId(req.userData.id) }, { nationlID: req.body.nationalID ? req.body.nationalID : req.userData.nationalID }]
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        if (!updatedEndorsement) {

            return next(
                new ErrorResponse(
                    `${req.userData.id ? req.userData.id : req.body.nationlID} لا توجد تزكية تحت هذا التعريف`,
                    404
                )
            )

        }
        res.status(200).json({
            success: true,
            data: updatedEndorsement
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

exports.toggleEndorsementState = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 3) {

        const changeState = await Endorsement.updateOne({ $or: [{ _id: req.userData.id }, { nationalID: req.userData.nationalID }] }, { state: req.body.state })
        res.status(200).json({ changeState })

    } else {

        return next(
            new ErrorResponse(
                ['غير مخول لإتمام العملية', 'Unauthorized to complete this operation'],
                401
            )
        )
    }

})