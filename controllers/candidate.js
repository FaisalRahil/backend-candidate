const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Candidate = require('../models/Candidate')


require("dotenv").config()

exports.candidateLogin = asyncHandler(async (req, res, next) => {

    const user = await Candidate.findOne({ email: req.body.email }).select({ _id: 1, firstName: 1,fatherName:1 ,sureName:1, password: 1, userType: 1})

    if (await bcrypt.compare(req.body.password, user.password)) {

        jwt.sign({ id: user._id, firstName:user.firstName,fatherName: user.fatherName,sureName:user.sureName, userType:user.userType}, process.env.JWT_SECRET_KEY , { expiresIn: '4h' }, (error, token) => {
            res.status(201).json({
                success: true,
                token
            })
        })
    } else if (!user) {
        return next(
            new ErrorResponse(
                'User not found',
                404
            )
        )
    } else {
        return next(
            new ErrorResponse(
                'User not found',
                404
            )
        )
    }

})

exports.createCandidate = asyncHandler(async (req, res, next) => {

})

exports.toggleCandidateState = asyncHandler(async (req, res, next) => {

    jwt.verify(req.token, process.env.JWT_SECRET_KEY , async (error, authData) => {

        if (req.userData.userType.typeID == 2) {

            const changeState = await User.updateOne({ $or: [{_id:req.userData.candidateID},{nationalID:req.userData.candidateNationalID}] }, { state: req.body.state })
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

})