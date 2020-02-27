const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");


//models
const User = require("../models/User");
const Bureau = require("../models/Bureau");

require("dotenv").config()




exports.createUser = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 1) {
        req.body.password = bcrypt.hashSync(req.body.password, req.body.salt)

        const user = await User.create(req.body)

        res.status(201).json({
            success: true,
            data: user
        })
    } else {

        return next(
            new ErrorResponse(
                ['غير مخول لإتمام العملية', 'Unauthorized to complete this operation'],
                401
            )
        )
    }
})

exports.getUser = asyncHandler(async (req, res, next) => {


    const user = await User.findOne({ email: req.body.email }).select({ _id: 1, name: 1, password: 1, userType: 1, salt: 1 })

    if (await bcrypt.compare(req.body.password, user.password)) {

        jwt.sign({ id: user._id, name: user.name, userType: user.userType }, process.env.JWT_SECRET_KEY, { expiresIn: '4h' }, (error, token) => {
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

exports.getUsers = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 1) {
        const users = await User.find({})
        res.status(200).json({ users })
    } else {

    }

})

exports.updateUser = asyncHandler(async (req, res, next) => {

    if (req.userData.userType.typeID == 1 || req.userData.userType.typeID == 2) {

        const updatingUser = await User.updateOne({ _id: req.userData.id }, req.body)
        res.status(200).json({ updatingUser })

    } else {

        return next(
            new ErrorResponse(
                ['غير مخول لإتمام العملية', 'Unauthorized to complete this operation'],
                401
            )
        )
    }

})

exports.toggleUserState = asyncHandler(async (req, res, next) => {


    if (req.userData.userType.typeID == 1) {

        const changeState = await User.updateOne({ _id: req.userData.id }, { state: req.body.state })
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

exports.logout = asyncHandler(async (req, res, next) => {

    res.status(200).json({
        token: null
    })
})



