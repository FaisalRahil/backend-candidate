const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Election = require("../models/Election");

const jwt = require('jsonwebtoken')

require("dotenv").config()

exports.getEelections = asyncHandler(async (req, res, next) => {

    jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (error, authdata) => {

        if(error) return new next(
            new ErrorResponse(
                `Bad toekn format`,
                400
            )
        ) 

        if (typeof authdata !== 'undefined' && authdata.userType.typeID == 1) {
            const elections = await Election.find()
            res.status(200).json({ elections })
        } else {

            return next(
                new ErrorResponse(
                    `Unauthorized access`,
                    401
                )
            )
        }


    })

})

exports.getElection = asyncHandler(async (req, res, next) => {


    jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (error, authdata) => {

        if(error) return new next(
            new ErrorResponse(
                `Bad toekn format`,
                400
            )
        ) 

        if (typeof authdata !== 'undefined' && authdata.userType.typeID == 1) {
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

        } else {

            return next(
                new ErrorResponse(
                    `Unauthorized access`,
                    401
                )
            )
        }


    })

})


exports.createElection = asyncHandler(async (req, res, next) => {

    jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (error, authdata) => {

        if(error) return new next(
            new ErrorResponse(
                `Bad toekn format`,
                400
            )
        ) 

        if (typeof authdata !== 'undefined' && authdata.userType.typeID == 1) {

            const createdElection = await Election.create(req.body)
            res.status(201).json({
                success: true,
                data: createdElection
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

})

exports.updateElection = asyncHandler(async (req, res, next) => {


    jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (error, authdata) => {

        if(error) return new next(
            new ErrorResponse(
                `Bad toekn format`,
                400
            )
        ) 

        if (typeof authdata !== 'undefined' && authdata.userType.typeID == 1) {

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
        } else {

            return next(
                new ErrorResponse(
                    `Unauthorized access`,
                    401
                )
            )
        }
    })
})

exports.toggleElectionState = asyncHandler(async (req, res, next) => {

    jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (error, authdata) => {

        if(error) return new next(
            new ErrorResponse(
                `Bad toekn format`,
                400
            )
        ) 

        if (typeof authdata !== 'undefined' && authdata.userType.typeID == 1) {

            const updatedElection = await Election.findByIdAndUpdate(
                {
                    _id: req.body.electionID,
                },
                {
                    $set: { state: req.body.state }
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
        } else {
            return next(
                new ErrorResponse(
                    `Unauthorized access`,
                    401
                )
            )

        }

    })
})