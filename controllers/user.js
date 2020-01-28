const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");


//models
const User = require("../models/User");
const Bureau = require("../models/Bureau");

//middleware
const authenticat = require('../middleware/authentication')


exports.creatUser = asyncHandler(async (req, res, next) => {

    jwt.verify(req.token, 'superunknownsecrectkey', async (error, authdata) => {

        if (authData.level == 1) {
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
})

exports.getUser = asyncHandler(async (req, res, next) => {



    const user = await User.findOne({ email: req.body.email }).select({ _id: 1, name: 1, password: 1, level: 1, salt: 1 })

    if (await bcrypt.compare(req.body.password, user.password)) {

        jwt.sign({ id: user._id, name: user.name, level: user.level }, 'superunknownsecrectkey', { expiresIn: '4h' }, (error, token) => {
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

    jwt.verify(req.token, 'superunknownsecrectkey', async (error, data) => {

        if (error) {

            return next(
                new ErrorResponse(
                    'Unauthorized access, Login first',
                    403
                )
            )

        } else {
            const users = await User.find({})
            res.status(200).json({ users })
        }

    })


})

exports.updateUser = asyncHandler(async (req, res, next) => {

    jwt.verify(req.token, 'superunknownsecrectkey', async (error, authData) => {

        const updatingUser = await User.updateOne({ _id: authData.id }, req.body)
        res.status(200).json({ updatingUser })

    })

})

exports.changeUserState = asyncHandler(async (req, res, next) => {

    jwt.verify(req.token, 'superunknownsecrectkey', async (error, authData) => {

        if (authData.level == 1) {

            const changeState = await User.updateOne({ _id: authData.id }, { state: req.body.state })
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

exports.logout = asyncHandler(async (req, res, next) => {

    res.status(200).json({
        token: null
    })
})



